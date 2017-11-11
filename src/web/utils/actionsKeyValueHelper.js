const actionsKeyValueHelper = {
  getKey: index => [`actions_click_${index}`, `actions_wait_${index}`],
  getValue: key => {
    const [, type, index] = key.split('_');
    return { type, index: Number(index) };
  },
};

export default actionsKeyValueHelper;
