import React from 'react';
import ReactDOM from 'react-dom';
import App from './web/components/App';
// import registerServiceWorker from './web/utils/registerServiceWorker';
import autotrack from './web/utils/autotrack';
import './web/utils/style';

// TODO: make ga configurable?
const GA_ID =
  window.location.host === 'micro-website-api.now.sh' && 'UA-33845990-13';

ReactDOM.render(<App />, document.getElementById('root'));
autotrack(GA_ID);
