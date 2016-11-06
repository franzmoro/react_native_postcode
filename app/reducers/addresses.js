import { fromJS } from 'immutable';
import {
  GET_ADDRESSES_FOR_POSTCODE,
  CLEAR_ADDRESS_OPTIONS
} from '../action_types.js';

const initialState = fromJS({
  options: undefined
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES_FOR_POSTCODE:
      return state.set('addressOptions', action.results);
    case CLEAR_ADDRESS_OPTIONS:
      return initialState;
    default:
      return state;
  }
};
