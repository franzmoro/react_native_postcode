const emptyAddressFields = {
  'line1': '',
  'line2': '',
  'line3': '',
  'line4': '',
  'locality': '',
  'city': '',
  'county': ''
};

const addressFields = Object.keys(emptyAddressFields);

const mapAddressStrToObj = addressString => addressString
  .split(', ')
  .reduce(
    (accum, field, idx) => {
      accum[addressFields[idx]] = field;
      return accum;
    },
    {}
);

const renderRawAddress = str => str.split(', ').filter(elm => elm).join(' ');

module.exports = {
  addressFields, emptyAddressFields, mapAddressStrToObj, renderRawAddress
};
