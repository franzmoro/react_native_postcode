# InMotion Postcode App
A mobile app for Android and iOS devices that aids completion of input forms for physical addresses.

## User flow
- User inputs a post code
- App fetches the list of possible addresses for that postcode
- App displays them as a dropdown
- App populates a form with the selected address data

## Technical Choices
- The app is built with **[React Native](https://facebook.github.io/react-native/)**
- The app state is managed with **[Redux](https://redux.js.org)**
- The list of addresses matching the postcode is provided by the **[getAddress](https://getaddress.io/)** api
- Testing is composed of:
  - Redux actions unit tests with **[tape](https://github.com/substack/tape)**
  - Integration tests with **[Appium](appium.io)**
- No backend is foreseen
