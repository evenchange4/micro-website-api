import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../App';

it('should render <App> correctly', () => {
  const wrapper = mount(<App />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
