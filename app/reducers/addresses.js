import { fromJS } from 'immutable';
import {
  GET_ADDRESSES_FOR_POSTCODE
} from '../action_types.js';

const initialState = fromJS({
  input: {
    postcode: '',
  },
  output: {
    addressOptions: undefined,
    selectedAddress: undefined
  }
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES_FOR_POSTCODE:
      return state.setIn(['output', 'addressOptions'], action.results);
    default:
      return state;
  }
};
