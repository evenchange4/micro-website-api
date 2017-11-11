import actionsKeyValueHelper from '../actionsKeyValueHelper';

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
