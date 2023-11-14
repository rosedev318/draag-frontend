import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  isLoggedIn: false,
  regiserSuccess: false,
  user: {},
  error: '',
  loading: false
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        regiserSuccess: true,
        loading: false
      };
    case actionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        regiserSuccess: false,
        loading: false
      };
    case actionTypes.USER_LOGIN_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        loading: false
      };
    case actionTypes.GOOGLE_LOGIN_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
    case actionTypes.GOOGLE_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false
      };
    case actionTypes.USER_LOGOUT:
      return {
        isLoggedIn: false,
        loading: false
      };
    case actionTypes.SIGNUP_SUCCESS_INIT:
      return {
        loading: true
      };
    case actionTypes.SIGNUP_SUCCESS_SUCCESS:
      return {
        loading: false
      };
    case actionTypes.SIGNUP_SUCCESS_FAIL:
      return {
        loading: false
      };
    case actionTypes.FORGET_PASSWORD_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FORGET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.RESET_PASSWORD_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default store;
