import { combineReducers } from 'redux-immutable';

module.exports = combineReducers({
  addresses: require('./addresses.js')
});
