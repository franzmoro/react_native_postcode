import React, { PropTypes } from 'react';
import { Picker } from 'react-native';

const { Item } = Picker;

const PickerComponent = ({
  selectAddress,
  rawOptions
}) =>
  <Picker mode = 'dropdown' onValueChange = { selectAddress } >
    {
      rawOptions.map((address, idx) =>
      <Item {...{
        key: `picker-item-${idx}`,
        label: address,
        value: idx} }
        />
      )
    }
  </Picker>;

PickerComponent.propTypes = {
  selectAddress: PropTypes.func.isRequired,
  rawOptions: PropTypes.array
};

module.exports = PickerComponent;
