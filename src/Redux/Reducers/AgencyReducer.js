import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  loading: false,
  isAgency: false,
  agencyChange: {},
  agency: [],
  joinagency: {},
  agencyUsers: [],
  agencyUser: null,
  user: {},
  userInvite: {},
  sendInvite: {},
  enableUser: [],
  error: '',
  allAgency: [],
  agencyRoles: []
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOIN_TEAM_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.JOIN_TEAM_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.JOIN_TEAM_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.All_AGENCY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.All_AGENCY_SUCCESS:
      return {
        ...state,
        agency: action.payload,
        loading: false
      };
    case actionTypes.All_AGENCY_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.JOIN_AGENCY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.JOIN_AGENCY_SUCCESS:
      return {
        ...state,
        joinagency: action.payload,
        loading: false
      };
    case actionTypes.JOIN_AGENCY_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SELECT_AGENCY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SELECT_AGENCY_SUCCESS:
      return {
        ...state,
        agencyChange: action.data,
        loading: false
      };
    case actionTypes.SELECT_AGENCY_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SEARCH_AGENCY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SEARCH_AGENCY_SUCCESS:
      return {
        ...state,
        agency: action.payload,
        loading: false
      };
    case actionTypes.SEARCH_AGENCY_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.AGENCY_STATUS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AGENCY_STATUS_SUCCESS:
      return {
        ...state,
        // agency: action.payload,
        loading: false
      };
    case actionTypes.AGENCY_STATUS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.CREATE_AGENCY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CREATE_AGENCY_SUCCESS:
      return {
        ...state,
        agency: action.payload,
        loading: false
      };
    case actionTypes.CREATE_AGENCY_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.AGENCY_USERS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AGENCY_USERS_SUCCESS:
      return {
        ...state,
        agencyUsers: action.payload,
        userAgencies: action.payload,
        loading: false
      };
    case actionTypes.AGENCY_USERS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_USER_AGENCY_INIT:
      return {
        ...state,
        loading: true,
        isAgency: false
      };
    case actionTypes.GET_USER_AGENCY_SUCCESS:
      return {
        ...state,
        agencyUser: action.payload,
        loading: false,
        isAgency: true
      };
    case actionTypes.GET_USER_AGENCY_FAIL:
      return {
        ...state,
        loading: false,
        isAgency: false
      };
    case actionTypes.USER_PROFILE_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case actionTypes.USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_INVITAIONS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_INVITAIONS_SUCCESS:
      return {
        ...state,
        userInvite: action.payload,
        loading: false
      };
    case actionTypes.GET_INVITAIONS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SEND_INVITAIONS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SEND_INVITAIONS_SUCCESS:
      return {
        ...state,
        sendInvite: action.payload,
        loading: false
      };
    case actionTypes.SEND_INVITAIONS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_INVITAIONS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_INVITAIONS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_INVITAIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.ENABLE_AGENCY_USERS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ENABLE_AGENCY_USERS_SUCCESS:
      return {
        ...state,
        enableUser: action.payload,
        loading: false
      };
    case actionTypes.ENABLE_AGENCY_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.GET_ALL_AGENCY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_ALL_AGENCY_SUCCESS:
      return {
        ...state,
        allAgency: action.payload,
        loading: false
      };
    case actionTypes.GET_ALL_AGENCY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.GET_AGENCY_ROLES_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_AGENCY_ROLES_SUCCESS:
      return {
        ...state,
        agencyRoles: action.payload,
        loading: false
      };
    case actionTypes.GET_AGENCY_ROLES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default store;
