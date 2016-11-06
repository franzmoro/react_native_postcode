import { fromJS } from 'immutable';
import {
  CHANGE_POSTCODE_INPUT,
  SELECT_ADDRESS,
  CLEAR_ALL_INPUTS,
  CLEAR_ADDRESS_LINES
} from '../action_types.js';

const { emptyAddressFields } = require('../utils/addresses.js');

const initialState = fromJS({
  postcode: '',
  address: emptyAddressFields
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_POSTCODE_INPUT:
      return state.set('postcode', action.input);
    case CLEAR_ALL_INPUTS:
      return initialState;
    case CLEAR_ADDRESS_LINES:
      return state.set('address', emptyAddressFields);
    case SELECT_ADDRESS:
      return state.set('address', fromJS(action.selectedAddress));
    default:
      return state;
  }
};
