import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PreviewCard from '../PreviewCard';

it('should render <PreviewCard> correctly without url', () => {
  const wrapper = mount(<PreviewCard />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render <PreviewCard> correctly without data', () => {
  const wrapper = mount(<PreviewCard url={'url'} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render <PreviewCard> correctly with data', () => {
  const wrapper = mount(<PreviewCard url={'url'} data={'data'} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
