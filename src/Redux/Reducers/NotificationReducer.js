import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  notifications: [],
  seenNotification: [],
  singleNotification: {},
  loading: false
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        loading: false
      };
    case actionTypes.NOTIFICATIONS_FAIL:
      return {
        ...state,
        error: ''
      };
    case actionTypes.SINGLE_NOTIFICATION_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.SINGLE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        singleNotification: action.payload,
        loading: false
      };
    case actionTypes.SINGLE_NOTIFICATION_FAIL:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};

export default store;
