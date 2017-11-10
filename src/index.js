import React from 'react';
import ReactDOM from 'react-dom';
import App from './web/components/App';
// import registerServiceWorker from './web/utils/registerServiceWorker';
import autotrack from './web/utils/autotrack';

import './web/utils/style';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
autotrack(process.env.REACT_APP_GA_ID);
