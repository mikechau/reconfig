import 'babel-polyfill';
import 'assets/stylesheets/application.less';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const RootComponent = require('./containers/Root').default;

    render(
      <AppContainer>
        <RootComponent />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
