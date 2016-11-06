'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

const { InputForm: InputFormComponent } = require('../components/index.js');

const mapStateToProps = state => {
  const {
    form: { postcode, address },
    addresses: {
      options: { parsed, raw },
      showPicker
    }
  } = state.toJS();

  return {
    postcode,
    selectedAddress: address,
    rawOptions: raw,
    parsedOptions: parsed,
    shouldShowPicker: showPicker
  };
};

module.exports = ({ actions }) => {
  class InputContainer extends Component {
    render () {
      return (
        <InputFormComponent { ...this.props } />
      );
    }
  }
  return connect(mapStateToProps, actions)(InputContainer);
};
