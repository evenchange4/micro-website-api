import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Form from '../Form';

it('should render <Form> correctly', () => {
  const wrapper = mount(<Form />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
