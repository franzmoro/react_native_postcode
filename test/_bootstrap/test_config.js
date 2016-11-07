'use strict';
/* @flow */

process.env.IOS_VERSION = process.env.IOS_VERSION || '9.3';
process.env.DEVICE_NAME = process.env.DEVICE_NAME || 'iPhone 6s';
process.env.APP_NAME = process.env.APP_NAME || 'inmotion_postcode.app';

module.exports = {
  IS_TRAVIS: process.env.TRAVIS,
  WEBDRIVER_CAPS: {
    newCommandTimeout: 60,
    browserName: '',
    platformName: 'iOS',
    platformVersion: process.env.IOS_VERSION,
    deviceName: process.env.DEVICE_NAME,
    app:[
      `ios/build/Build/Products`,
      `/${process.env.TRAVIS ? 'Release' : 'Debug'}`,
      `-iphonesimulator/${process.env.APP_NAME}`
    ].join(''),
    locale: 'en_US',
    language: 'en',
    autoAcceptAlerts: true,
    automationName: 'XCUITest'
  },
  APPIUM_PORT: 4723,
};
