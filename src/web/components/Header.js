import * as React from 'react';
import styled from 'styled-components';
import TweenOne from 'rc-tween-one';

const Wrapper = styled.header`
  font-size: 30px;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
  font-family: 'Open Sans Condensed', sans-serif;
`;

const Header = () => (
  <TweenOne
    animation={{
      opacity: 1,
      duration: 800,
      y: 0,
    }}
    style={{
      opacity: 0,
      transform: 'translateY(-40px)',
    }}
    component={Wrapper}
  >
    Website API
  </TweenOne>
);

export default Header;
