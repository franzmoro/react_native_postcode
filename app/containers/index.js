import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const RootContainer = () =>
  <View style={styles.container}>
    <Text style={styles.text}>
      This app works for both iOS and Android!
    </Text>
  </View>
;

module.exports = RootContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    width: 0.9 * width,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20
  }
});
