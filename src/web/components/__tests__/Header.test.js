import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../Header';

it('should render <Header> correctly', () => {
  const wrapper = mount(<Header />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
