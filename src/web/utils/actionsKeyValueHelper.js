import * as R from 'ramda';
import uuidv4 from 'uuid/v4';

const actionsKeyValueHelper = {
  getKey: index => [`actions_click_${index}`, `actions_wait_${index}`],
  getValue: key => {
    const [, type, index] = key.split('_');
    return { type, index: Number(index) };
  },
  parseActions: R.pipe(
    R.cond([[R.is(String), R.of], [R.T, R.identity]]),
    R.map(R.split(',')),
    R.map(R.zipObj(['click', 'wait'])),
    R.map(e => R.assoc('key', uuidv4(), e)),
  ),
};

export default actionsKeyValueHelper;
