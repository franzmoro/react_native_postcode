/* @flow */
'use strict';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const {
  loggerOptions: { active: isLogActive, ...loggerOptions }
} = require('./dev_options.js');

module.exports = ({ actions, reducers }) => {
  const finalCreateStore = applyMiddleware(
    thunk,
    isLogActive ? createLogger(loggerOptions) : () => () => {}
  )(createStore);

  const store = finalCreateStore(reducers);
  // TODO dispatch a clear state action (TBC)
  
  return store;
};
