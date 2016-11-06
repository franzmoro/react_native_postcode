import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

module.exports = ({
  changePostcodeInput,
  postcode,
  selectedAddress
}) =>
  <View style={styles.container}>
    <TextInput {...{
      autoCapitalize: 'characters',
      autoCorrect: false,
      autoFocus: true,
      maxLength: 8,
      onChangeText: changePostcodeInput,
      placeholder: 'Enter a valid UK Postcode here',
      value: postcode,
      style: styles.textInput
    }} />
    {
      Object.keys(selectedAddress).map(field =>
        // Boolean(selectedAddress[field]) &&
        <TextInput {...{
          key: `text-input-${field}`,
          editable: false,
          value: selectedAddress[field],
          style: styles.textInput,
          placeholder: field.replace(/(\d)/, ` $1`).toUpperCase()
        }}/>
      )
    }
  </View>
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    width: 0.9 * width,
    height: 0.1 * height,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    borderWidth: 1,
    marginTop: 0.005 * height
  }
});
