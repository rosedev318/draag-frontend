import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  schedules: [],
  statusSeen: {}
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCHEDULES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedules: action.payload,
        loading: false
      };
    case actionTypes.GET_SCHEDULES_FAIL:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.CHECK_STATUS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.CHECK_STATUS_SUCCESS:
      return {
        ...state,
        statusSeen: action.payload,
        loading: false
      };
    case actionTypes.CHECK_STATUS_FAIL:
      return {
        ...state,
        error: '',
        loading: true
      };
    default:
      return state;
  }
};

export default store;
