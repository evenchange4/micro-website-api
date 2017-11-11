import queryStringhelper from '../queryStringhelper';

jest.mock('uuid/v4', () => () => 'mockUuidv4');

it('should return correct values with queryStringhelper.parse', () => {
  [
    'url=',
    'url=url',
    'url=url&selector=',
    'url=url&selector=selector',

    'cache=',
    'cache=true',
    'cache=false',
    'cache=other',

    'format=',
    'format=raw',
    'format=json',
    'format=other',

    'actions=',
    'actions=click,',
    'actions=,wait',
    'actions=click,wait',
    'actions=click,wait&actions=',
    'actions=click,wait&actions=click,',
    'actions=click,wait&actions=click,wait',
  ].forEach(e => {
    const values = queryStringhelper.parse(e);
    expect(values).toMatchSnapshot(e);
    expect(
      queryStringhelper.parse(queryStringhelper.stringify(values)),
    ).toEqual(values);
  });
});
