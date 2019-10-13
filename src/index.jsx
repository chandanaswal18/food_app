import React from 'react';
import ReactDOM from 'react-dom';

import 'app_style';

import App from './app';

console.warn(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  window.console.log = () => {};
  window.console.debug = () => {};
  window.console.info = () => {};
} else if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));
