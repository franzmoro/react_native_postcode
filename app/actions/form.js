import {
  CHANGE_POSTCODE_INPUT,
  SELECT_ADDRESS,
  CLEAR_ALL_INPUTS,
  CLEAR_ADDRESS_OPTIONS,
  DISPLAY_PICKER
} from '../action_types.js';

module.exports = () => ({
  changePostcodeInput: (postcode) => ({
    type: CHANGE_POSTCODE_INPUT,
    input: postcode
  }),
  clearAllInputs: () => ({ type: CLEAR_ALL_INPUTS }),
  selectAddress: (idx) => (dispatch, getState) => {
    dispatch({
      type: SELECT_ADDRESS,
      selectedAddress: getState().getIn(['addresses', 'options', 'parsed', idx])
    });
    dispatch({ type: DISPLAY_PICKER, boolean: true });
    dispatch({ type: CLEAR_ADDRESS_OPTIONS });
  },
  hidePicker: () => ({ type: DISPLAY_PICKER, boolean: false })
});
