import * as React from 'react';
import { Container } from './styled-components';
import Form from './Form';
import Footer from './Footer';
import Header from './Header';

const App = () => (
  <Container>
    <Header />
    <Form />
    <Footer />
  </Container>
);

export default App;
