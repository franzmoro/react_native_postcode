# InMotion Postcode App
A mobile app for Android and iOS devices that aids completion of input forms for physical addresses.

## User flow
- User inputs a post code
- App fetches the list of possible addresses for that postcode
- App displays them as a dropdown
- App populates a form with the selected address data

## Technical Choices

### Front End
- The app is built with **[React Native](https://facebook.github.io/react-native/)**
- The app state is managed with **[Redux](https://redux.js.org)**, and uses the following middleware:
  - **[redux-thunk](https://github.com/gaearon/redux-thunk)**
  - **[redux-logger](https://github.com/evgenyrodionov/redux-logger)**, configured to be silent in *dev_options*
- The state uses **[immutable.js](https://facebook.github.io/immutable-js/)**
- React Routing is not needed for this particular problem
- The list of addresses matching the postcode is provided by the **[getAddress](https://getaddress.io/)** api. For the sake of this exercise,  the (free) api key has not been concealed. This could have been achieved either with a ```.env``` file on the back-end, or using the native modules.
- internal modules exported with ```module.exports``` and imported via ```require```, whereas external modules are imported via ```import```.

### Back End
- No backend is needed / foreseen

### Tests
Composed of:
- Redux actions unit tests with **[tape](https://github.com/substack/tape)**
- Integration tests with **[Appium](appium.io)**

### How to run the app
- ```npm start```, which runs react-native packager

#### iOS
- ```react-native run-ios```

#### Android
- Make sure you have an emulator / android virtual device configured
- Run the emulator with ```emulator -avd <emulator-name>```
- ```react-native run-android```
