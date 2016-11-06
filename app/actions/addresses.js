import {
  SET_ADDRESS_OPTIONS
} from '../action_types.js';
const { mapAddressStrToObj } = require('../utils/addresses.js');

module.exports = ({ reactModules: { alert } }) => ({
  getAddresses: () => (dispatch, getState) => {
    const postcode = getState().getIn(['form', 'postcode']);
    const apiKey = '0wnu1gfv3kW5P--J02gZoA6253';
    const url = [
      'https://api.getaddress.io/v2/uk/', postcode, '?api-key=', apiKey
    ].join('');

    fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.Message) {
        alert(
          'Address Not Found',
          'Please check your postcode and try again!'
        );
        return;
      }
      dispatch({
        type: SET_ADDRESS_OPTIONS,
        results: json.Addresses.map(mapAddressStrToObj)
      });
    })
    .catch(err => {
      console.log('error', err);
    });
  }

});
