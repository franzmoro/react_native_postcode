import {
  SET_ADDRESS_OPTIONS,
  DISPLAY_PICKER,
  CLEAR_ADDRESS_LINES
} from '../action_types.js';
const {
  mapAddressStrToObj,
  renderRawAddress
} = require('../utils/addresses.js');

module.exports = ({ reactModules: { alert, dismissKeyBoard } }) => ({
  getAddresses: () => (dispatch, getState) => {
    const postcode = getState().getIn(['form', 'postcode']);
    if (!postcode) {
      throw new Error('postcode cannot be undefined');
    }
    dismissKeyBoard();
    dispatch({ type: CLEAR_ADDRESS_LINES });
    const apiKey = 'svmmX8qdGkms9--Jwlzl5w3660';
    const url = [
      'https://api.getaddress.io/v2/uk/', postcode, '?api-key=', apiKey
    ].join('');

    fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.Message) {
        alert.alert(
          'Address Not Found',
          'Please check your postcode and try again!'
        );
        return;
      }
      const results = json.Addresses;
      dispatch({
        type: SET_ADDRESS_OPTIONS,
        results: {
          parsed: results.map(mapAddressStrToObj),
          raw: results.map(renderRawAddress)
        }
      });
      dispatch({
        type: DISPLAY_PICKER,
        boolean: true
      });
    })
    .catch(err => {
      // TODO implement global error handling with rollbar (https://rollbar.com/)
      console.log('error', err);
    });
  }

});
