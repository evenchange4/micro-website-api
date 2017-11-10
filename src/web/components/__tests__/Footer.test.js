import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from '../Footer';

it('should render <Footer> correctly', () => {
  const wrapper = mount(<Footer />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
