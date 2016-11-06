import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {
  SET_ADDRESS_OPTIONS,
  DISPLAY_PICKER,
  CLEAR_ADDRESS_LINES
} from '../action_types.js';
const {
  mapAddressStrToObj,
  renderRawAddress
} = require('../utils/addresses.js');

module.exports = ({ reactModules: { alert } }) => ({
  getAddresses: () => (dispatch, getState) => {
    const postcode = getState().getIn(['form', 'postcode']);
    if (!postcode) {
      throw new Error('postcode cannot be undefined');
    }
    dismissKeyboard();
    dispatch({ type: CLEAR_ADDRESS_LINES });
    const apiKey = 'svmmX8qdGkms9--Jwlzl5w3660';
    const url = [
      'https://api.getaddress.io/v2/uk/', postcode, '?api-key=', apiKey
    ].join('');

    fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.Message) {
        let alertTitleMessage;
        if (json.Message === 'Too Many Requests') {
          alertTitleMessage = [
            'Sorry!',
            [
              'The free API key does not support this many requests.',
              'Please try again later'
            ].join('')
          ]
        } else {
          alertTitleMessage = [
            'Address Not Found',
            'Please check your postcode and try again!'
          ];
        }
        console.log('alert', alert);
        dispatch(alert(...alertTitleMessage));
        return;
      }
      const results = json.Addresses;
      console.log('results', results);
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
      console.log('error', err);
    });
  }

});
