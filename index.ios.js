/* @flow */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

const { store, App } = require('./app/index.js')({ target: 'ios' });

export default class inmotion_postcode extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('inmotion_postcode', () => inmotion_postcode);
