import { fromJS } from 'immutable';
import {
  SET_ADDRESS_OPTIONS,
  CLEAR_ADDRESS_OPTIONS,
  DISPLAY_PICKER
} from '../action_types.js';

const initialState = fromJS({
  options: {
    raw: [],
    parsed: []
  },
  showPicker: false
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS_OPTIONS:
      return state
        .setIn(['options', 'raw'], fromJS(action.results.raw))
        .setIn(['options', 'parsed'], fromJS(action.results.parsed));
    case CLEAR_ADDRESS_OPTIONS:
      return initialState;
    case DISPLAY_PICKER:
      return state.set('showPicker', action.boolean);
    default:
      return state;
  }
};
