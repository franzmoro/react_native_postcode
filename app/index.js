module.exports = ({ target }) => {
  const reactModules = require('./react_modules.js')[target];

  const actions = require('./actions/index.js')({ reactModules });
  const reducers = require('./reducers/index.js');

  const App = require('./containers/index.js');

  const configureStore = require('./configure_store.js');
  const store = configureStore({ actions, reducers });

  return ({ actions, reducers, App, store });
};
