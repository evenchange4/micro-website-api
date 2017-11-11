/* eslint no-underscore-dangle: 0 */

import * as R from 'ramda';
import uuidv4 from 'uuid/v4';
import qs from 'query-string';

const queryStringhelper = {
  parse: R.pipe(qs.parse, parsed => ({
    url: R.defaultTo('')(parsed.url),
    selector: R.defaultTo('')(parsed.selector),
    cache: R.cond([
      [R.equals('true'), R.always(true)],
      [R.equals('false'), R.always(false)],
      [R.T, R.always(true)],
    ])(parsed.cache),
    format: R.cond([
      [R.contains(R.__, ['raw', 'json']), R.identity],
      [R.T, R.always('raw')],
    ])(parsed.format),
    actions: R.pipe(
      R.defaultTo([]),
      R.cond([[R.is(String), R.of], [R.T, R.identity]]),
      R.map(R.split(',')),
      R.map(R.zipObj(['click', 'wait'])),
      R.map(e => R.assoc('key', uuidv4(), e)),
    )(parsed.actions),
  })),
  stringify: R.pipe(
    R.evolve({
      url: encodeURIComponent,
      selector: encodeURIComponent,
      cache: encodeURIComponent,
      format: encodeURIComponent,
      actions: R.map(
        R.pipe(
          R.omit(['key']),
          R.values,
          R.map(encodeURIComponent),
          R.join(','),
        ),
      ),
    }),
    v => qs.stringify(v, { encode: false }),
  ),
};

export default queryStringhelper;
