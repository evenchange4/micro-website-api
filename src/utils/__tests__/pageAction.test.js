// @flow
const pageAction = require('../pageAction');

describe('pageAction', () => {
  let page;

  beforeEach(() => {
    page = {
      click: jest.fn(),
      waitFor: jest.fn(),
      $eval: jest.fn(),
      goto: jest.fn(),
    };
  });

  it('should perform click', async () => {
    await pageAction(page, ['#id']);
    expect(page.click).toBeCalledWith('#id');
    expect(page.waitFor).not.toBeCalled();
  });

  it('should perform click and waitFor', async () => {
    await pageAction(page, ['#id,#id3']);
    expect(page.click).toBeCalledWith('#id');
    expect(page.waitFor).toBeCalledWith('#id3', { timeout: 30000 });
  });
});
