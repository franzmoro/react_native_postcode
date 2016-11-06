import React, { Component } from 'react';
import {
  Picker,
  StyleSheet,
  Dimensions
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const { Item } = Picker;

class PickerComponent extends Component {
  constructor () {
    super();
  }
  render () {
    const {
      selectAddress,
      selectedAddress,
      rawOptions
    } = this.props;

    return (
      <Picker
        style = { styles.pickerContainer}
        selectedValue = { selectedAddress }
        onValueChange = { selectAddress }
        >
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
const styles = StyleSheet.create({
  // pickerContainer: {
  //   border:
  // }
});

module.exports = PickerComponent;
