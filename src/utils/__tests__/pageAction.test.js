// @flow
const pageAction = require('../pageAction');

describe('pageAction', () => {
  let page;

  beforeEach(() => {
    page = {
      click: jest.fn(),
      waitForSelector: jest.fn(),
      $eval: jest.fn(),
      goto: jest.fn(),
    };
  });

  it('should perform click', async () => {
    await pageAction(page, ['#id']);
    expect(page.click).toBeCalledWith('#id');
    expect(page.waitForSelector).not.toBeCalled();
  });

  it('should perform click and waitForSelector', async () => {
    await pageAction(page, ['#id,#id3']);
    expect(page.click).toBeCalledWith('#id');
    expect(page.waitForSelector).toBeCalledWith('#id3', { timeout: 30000 });
  });
});
