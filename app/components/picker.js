import React, { Component } from 'react';
import { Picker } from 'react-native';
const { Item } = Picker;

class PickerComponent extends Component {
  constructor () {
    super();
    this.state = {
      selected: {
        idx: undefined,
        string: ''
      }
    };
  }
  render() {
    const {
      selectAddress,
      selectedAddress,
      rawOptions
    } = this.props;
    return (
      <Picker
        selectedValue = { selectedAddress }
        onValueChange = { selectAddress }>
        {
          rawOptions.map((address, idx) =>
            <Item {...{
              key: `picker-item-${idx}`,
              label: address,
              value: idx} }
              />
          )
        }
      </Picker>
    );
  }
}

module.exports = PickerComponent;
