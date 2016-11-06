import {
  CHANGE_POSTCODE_INPUT,
  SELECT_ADDRESS,
  CLEAR_ALL_INPUTS,
  CLEAR_ADDRESS_OPTIONS
} from '../action_types.js';

module.exports = ({ reactModules }) => ({
  changePostcodeInput: (postcode) => ({
    type: CHANGE_POSTCODE_INPUT,
    input: postcode
  }),
  clearAllInputs: () => ({ type: CLEAR_ALL_INPUTS }),
  selectAddress: (idx) => (dispatch, getState) => {
    dispatch({
      type: SELECT_ADDRESS,
      selectedAddress: getState().getIn(['addresses', 'options', idx])
    });
    dispatch({ type: CLEAR_ADDRESS_OPTIONS });
  }
});
