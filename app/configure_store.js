'use strict';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const {
  loggerOptions: { active: isLogActive, ...loggerOptions }
} = require('./dev_options.js');

const emptyMiddleware = () => (next) => (action) => next(action);
const loggerMiddleware = isLogActive
  ? createLogger(loggerOptions)
  : emptyMiddleware
;

module.exports = ({ actions, reducers }) => {
  const finalCreateStore = applyMiddleware(
    thunk,
    loggerMiddleware
  )(createStore);

  const store = finalCreateStore(reducers);
  // TODO dispatch a clear state action (TBC)
  return store;
};
