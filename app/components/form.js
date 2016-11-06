import React from 'react';
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const Picker = require('./picker.js');
const { width, height } = Dimensions.get('window');
const { search: searchIcon } = require('../assets/_icons.js');

module.exports = ({
  changePostcodeInput,
  getAddresses,
  selectAddress,
  postcode,
  rawOptions,
  selectedAddress,
  showPicker
}) =>
  <View style={ styles.form }>
    <View style={ styles.inputContainer }>
      <TextInput {...{
        autoCapitalize: 'characters',
        autoCorrect: false,
        autoFocus: true,
        maxLength: 8,
        onChangeText: changePostcodeInput,
        placeholder: 'UK POSTCODE',
        value: postcode,
        style: [ styles.textInput, styles.postcode ]
      }} />
      { Boolean(postcode) &&
        <TouchableOpacity {...{
          style: styles.iconContainer,
          onPress: getAddresses
        }}>
          <Image {...{ source: searchIcon, style: styles.icon }} />
        </TouchableOpacity>
      }
    </View>
    { showPicker && <Picker {...{ rawOptions, selectAddress }} />
    }
    {
      Object.keys(selectedAddress).map(field =>
        Boolean(selectedAddress[field]) &&
        <TextInput {...{
          key: `text-input-${field}`,
          editable: false,
          value: selectedAddress[field],
          style: [ styles.inputContainer, styles.textInput ],
          placeholder: field.replace(/(\d)/, ` $1`).toUpperCase()
        }}/>
      )
    }
  </View>
;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputContainer: {
    width: 0.9 * width,
    height: 0.075 * height,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 0.01 * height
  },
  postcode: {
    width: 0.78 * width
  },
  iconContainer: {
    width: 0.12 * width,
    justifyContent: 'center'
  },
  icon: {
    width: 0.08 * width,
    height: 0.08 * width,
  },
  textInput: {
    textAlign: 'left',
    padding: 0.025 * width,
    fontSize: 20,
  }
});
