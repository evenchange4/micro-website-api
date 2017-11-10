import React from 'react';
import * as R from 'ramda';
import { mapTo } from 'rxjs/operators/mapTo';
import { map } from 'rxjs/operators/map';
import { scan } from 'rxjs/operators/scan';
import { startWith } from 'rxjs/operators/startWith';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { tap } from 'rxjs/operators/tap';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { merge } from 'rxjs/observable/merge';
import qs from 'query-string';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import QueueAnim from 'rc-queue-anim';
import uuidv4 from 'uuid/v4';
import { FormGroup, FormControl, FormControlLabel } from 'material-ui/Form';
import { ButtonFooter, StyledActionWrapper } from './styled-components';
import {
  componentFromStream,
  createEventHandler,
} from '../utils/recomposeHelper';
import actionsKeyValueHelper from '../utils/actionsKeyValueHelper';
import fetchPreview from '../utils/fetchPreview';
import PreviewCard from './PreviewCard';

const INITIAL_VALUES = {
  url: '',
  selector: '',
  cache: true,
  format: 'raw',
  actions: [],
};
const getBaseURL = location =>
  location.port ? 'http://localhost:3000' : location.origin;

const Form = componentFromStream(props$ => {
  const { handler: onChange, stream: onChange$ } = createEventHandler();
  const { handler: onAddClick, stream: onAddClick$ } = createEventHandler();
  const {
    handler: onDeleteClick,
    stream: onDeleteClick$,
  } = createEventHandler();
  const { handler: onReset, stream: onReset$ } = createEventHandler();
  const { handler: onSubmit, stream: onSubmit$ } = createEventHandler();

  const parsed = qs.parse(window.location.search);
  const parsedValues = {
    url: parsed.url || '',
    selector: parsed.selector || '',
    cache: parsed.cache || true,
    format: parsed.format || 'raw',
    actions:
      (parsed.actions && actionsKeyValueHelper.parseActions(parsed.actions)) ||
      [],
  };

  // reducer$ :: prevValues => values
  const reducer$ = merge(
    onReset$.pipe(mapTo(R.always(INITIAL_VALUES))),
    onAddClick$.pipe(
      mapTo(values =>
        R.over(
          R.lensPath(['actions']),
          R.append({ key: uuidv4(), click: '', wait: '' }),
          values,
        ),
      ),
    ),
    onDeleteClick$.pipe(
      map(index => R.over(R.lensPath(['actions']), R.remove(index, 1))),
    ),
    onChange$.pipe(
      map(e => {
        const target = e.target;
        const value =
          target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id || target.name;

        if (R.startsWith('actions', name)) {
          const { type, index } = actionsKeyValueHelper.getValue(name);
          return R.set(R.lensPath(['actions', index, type]), value);
        }

        return R.set(R.lensProp(name), value);
      }),
    ),
  );

  const values$ = reducer$.pipe(
    scan((acc, fn) => fn(acc), parsedValues),
    startWith(parsedValues),
  );

  const url$ = merge(
    onReset$.pipe(mapTo('')),
    onSubmit$.pipe(
      tap(e => e.preventDefault()),
      withLatestFrom(values$, (e, values) =>
        qs.stringify(
          {
            url: encodeURIComponent(values.url),
            selector: encodeURIComponent(values.selector),
            cache: encodeURIComponent(values.cache),
            format: encodeURIComponent(values.format),
            actions: values.actions.map(
              R.pipe(
                R.omit(['key']),
                R.values,
                R.map(encodeURIComponent),
                R.join(','),
              ),
            ),
          },
          { encode: false },
        ),
      ),
    ),
  ).pipe(
    // Remind: Update url without reload side effect.
    tap(queryString => {
      window.history.pushState(null, null, `/?${queryString}`);
    }),
    map(
      R.cond([
        [R.isEmpty, R.always('')],
        [R.T, R.concat(`${getBaseURL(window.location)}/api?`)],
      ]),
    ),
    startWith(''),
  );

  const preview$ = merge(
    onReset$.pipe(mapTo('')),
    onSubmit$.pipe(mapTo('')),
    url$.pipe(filter(R.complement(R.isEmpty)), switchMap(fetchPreview)),
  ).pipe(startWith(''));

  return props$.pipe(
    combineLatest(values$, url$, preview$, (props, values, url, preview) => (
      <form onSubmit={onSubmit}>
        <FormGroup>
          {/* 1. URL */}
          <TextField
            name="url"
            label="Enter an URL"
            placeholder="https://michaelhsu.tw/"
            type="url"
            value={values.url}
            onChange={onChange}
            required
            fullWidth
            margin="dense"
          />

          {/* 2. Selector */}
          <TextField
            name="selector"
            label="Enter result selector"
            placeholder="body > #id"
            type="text"
            value={values.selector}
            onChange={onChange}
            required
            fullWidth
            margin="dense"
          />

          {/* 3. Format */}
          <FormControl fullWidth margin="normal">
            <Select
              value={values.format}
              onChange={e =>
                onChange({ ...e, target: { ...e.target, name: 'format' } })
              }
              input={<Input id="format" />}
            >
              <MenuItem value={'raw'}>raw</MenuItem>
              <MenuItem value={'json'}>json</MenuItem>
            </Select>
          </FormControl>

          {/* 4. Cache */}
          <FormControlLabel
            label="Cache?"
            margin="dense"
            control={
              <Checkbox
                name="cache"
                checked={values.cache}
                onChange={onChange}
              />
            }
          />

          {/* 5. Actions */}
          <QueueAnim>
            {values.actions.map((action, index) => {
              const [clickKey, waitKey] = actionsKeyValueHelper.getKey(index);

              return (
                <StyledActionWrapper key={`${action.key}`}>
                  <div>
                    <TextField
                      name={clickKey}
                      placeholder="Selector to Click"
                      type="text"
                      value={action.click}
                      onChange={onChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      name={waitKey}
                      placeholder="WaitFor selector or timeout"
                      type="text"
                      value={action.wait}
                      onChange={onChange}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div>
                    <IconButton
                      color="default"
                      onClick={() => onDeleteClick(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </StyledActionWrapper>
              );
            })}
          </QueueAnim>
          <Button
            color="default"
            onClick={onAddClick}
            data-ga-on="click"
            data-ga-event-category="Add action"
            data-ga-event-action="click"
          >
            Add action
          </Button>

          <ButtonFooter>
            <Button
              color="primary"
              onClick={onReset}
              data-ga-on="click"
              data-ga-event-category="Clear"
              data-ga-event-action="click"
            >
              Clear
            </Button>
            <Button
              type="submit"
              raised
              color="primary"
              data-ga-on="click"
              data-ga-event-category="Submit"
              data-ga-event-action="click"
            >
              Submit
            </Button>
          </ButtonFooter>

          {/* Preview */}
          <PreviewCard url={url} data={preview} />
        </FormGroup>
      </form>
    )),
  );
});

Form.displayName = 'Form';

export default Form;
