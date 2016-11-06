import { fromJS } from 'immutable';
import {
  SET_ADDRESS_OPTIONS,
  CLEAR_ADDRESS_OPTIONS
} from '../action_types.js';

const initialState = fromJS({
  options: []
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS_OPTIONS:
      return state.set('options', action.results);
    case CLEAR_ADDRESS_OPTIONS:
      return initialState;
    default:
      return state;
  }
};
