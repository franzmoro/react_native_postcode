module.exports = {
  ios: {
    alert:require('react-native').AlertIOS,
    // although the "Alert" module can be used also for iOS,
    // this is to show how different modules can be handled
  },
  android: {
    alert:require('react-native').Alert
  }
};
