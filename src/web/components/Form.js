import React from 'react';
import * as R from 'ramda';
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
import * as O from '../utils/rxEsmodule';
import { ButtonFooter, StyledActionWrapper } from './styled-components';
import {
  componentFromStream,
  createEventHandler,
} from '../utils/recomposeHelper';
import actionsKeyValueHelper from '../utils/actionsKeyValueHelper';
import queryStringhelper from '../utils/queryStringhelper';
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

  // reducer :: prevValues => values
  const reducer$ = O.merge(
    onReset$.pipe(O.mapTo(R.always(INITIAL_VALUES))),
    onAddClick$.pipe(
      O.mapTo(values =>
        R.over(
          R.lensPath(['actions']),
          R.append({ key: uuidv4(), click: '', wait: '' }),
          values,
        ),
      ),
    ),
    onDeleteClick$.pipe(
      O.map(index => R.over(R.lensPath(['actions']), R.remove(index, 1))),
    ),
    onChange$.pipe(
      O.map(e => {
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
    O.startWith(queryStringhelper.parse(window.location.search)),
    O.scan((acc, fn) => fn(acc)),
  );

  const url$ = O.merge(
    onReset$.pipe(O.mapTo('')),
    onSubmit$.pipe(
      O.tap(e => e.preventDefault()),
      O.withLatestFrom(values$, (e, values) =>
        queryStringhelper.stringify(values),
      ),
    ),
  ).pipe(
    // Remind: Update url without reload side effect.
    O.tap(queryString => {
      window.history.pushState(null, null, `/?${queryString}`);
    }),
    O.map(
      R.cond([
        [R.isEmpty, R.always('')],
        [R.T, R.concat(`${getBaseURL(window.location)}/api?`)],
      ]),
    ),
    O.startWith(''),
  );

  const preview$ = O.merge(
    onReset$.pipe(O.mapTo('')),
    onSubmit$.pipe(O.mapTo('')),
    url$.pipe(O.filter(R.complement(R.isEmpty)), O.switchMap(fetchPreview)),
  ).pipe(O.startWith(''));

  return props$.pipe(
    O.combineLatest(values$, url$, preview$, (props, values, url, preview) => (
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
            label="Enter a target selector"
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
