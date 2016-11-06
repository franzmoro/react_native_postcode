import { combineReducers } from 'redux-immutable';

module.exports = combineReducers({
  addresses: require('./addresses.js'),
  form: require('./form.js')
});
