import actionsKeyValueHelper from '../actionsKeyValueHelper';

jest.mock('uuid/v4', () => () => 'mockUuidv4');

it('should handle getKey', () => {
  expect(actionsKeyValueHelper.getKey(0)).toEqual([
    'actions_click_0',
    'actions_wait_0',
  ]);
  expect(actionsKeyValueHelper.getKey(1)).toEqual([
    'actions_click_1',
    'actions_wait_1',
  ]);
});

it('should handle getValue', () => {
  expect(actionsKeyValueHelper.getValue('actions_click_0')).toEqual({
    type: 'click',
    index: 0,
  });
  expect(actionsKeyValueHelper.getValue('actions_wait_1')).toEqual({
    type: 'wait',
    index: 1,
  });
});

it('should handle parseActions', () => {
  expect(actionsKeyValueHelper.parseActions('click,')).toEqual([
    { click: 'click', key: 'mockUuidv4', wait: '' },
  ]);
  expect(actionsKeyValueHelper.parseActions('click1,wait1')).toEqual([
    { click: 'click1', key: 'mockUuidv4', wait: 'wait1' },
  ]);
  expect(actionsKeyValueHelper.parseActions(['click2,wait2'])).toEqual([
    { click: 'click2', key: 'mockUuidv4', wait: 'wait2' },
  ]);
  expect(
    actionsKeyValueHelper.parseActions(['click3,wait4', 'click5,wait6']),
  ).toEqual([
    { click: 'click3', key: 'mockUuidv4', wait: 'wait4' },
    { click: 'click5', key: 'mockUuidv4', wait: 'wait6' },
  ]);
});
