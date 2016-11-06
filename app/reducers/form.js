import { fromJS } from 'immutable';
import {
  CHANGE_POSTCODE_INPUT,
  SELECT_ADDRESS,
  CLEAR_ALL_INPUTS
} from '../action_types.js';

const initialState = fromJS({
  postcode: '',
  address: {
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    locality: '',
    city: '',
    county: ''
  }
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_POSTCODE_INPUT:
      return state.set('postcode', action.input);
    case CLEAR_ALL_INPUTS:
      return initialState;
    case SELECT_ADDRESS:
      return state.set('address', fromJS(action.selectedAddress));
    default:
      return state;
  }
};
