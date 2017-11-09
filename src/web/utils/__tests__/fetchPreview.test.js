import fetchPreview from '../fetchPreview';

it('should return data', async () => {
  global.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve({ text: () => 'mockData' }));

  const res = await fetchPreview('mockURL');
  expect(global.fetch).toBeCalledWith('mockURL', { method: 'GET' });
  expect(res).toBe('mockData');
});
