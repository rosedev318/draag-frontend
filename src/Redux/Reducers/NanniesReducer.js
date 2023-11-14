import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  nannies: {},
  allnannies: {},
  availabilities: {},
  languages: {},
  works: {},
  positions: {},
  livings: {},
  statuses: {},
  qskills: {},
  skills: {},
  error: '',
  singleNanny: {},
  blacklist: {},
  ratings: {},
  templates: {},
  loading: false
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NANNIES_FORM_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.NANNIES_FORM_SUCCESS:
      return {
        ...state,
        nannies: action.payload,
        loading: false
      };
    case actionTypes.NANNIES_FORM_FAIL:
    case actionTypes.NANNIESEDIT_FORM_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.NANNIESEDIT_FORM_SUCCESS:
      return {
        ...state,
        nannies: action.payload
      };
    case actionTypes.NANNIESEDIT_FORM_FAIL:
      return {
        ...state
      };
    case actionTypes.NANNIESPATCH_FORM_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.NANNIESPATCH_FORM_SUCCESS:
      return {
        ...state,
        nannies: action.payload,
        loading: false
      };
    case actionTypes.NANNIESPATCH_FORM_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FILES_UPLOAD_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        nannies: action.payload,
        loading: false
      };
    case actionTypes.FILES_UPLOAD_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.CANDIDATE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.CANDIDATE_SUCCESS:
      return {
        ...state,
        nannies: action.payload,
        loading: false
      };
    case actionTypes.CANDIDATE_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.CANDIDATE_ALL_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.CANDIDATE_ALL_SUCCESS:
      return {
        ...state,
        allnannies: action.payload,
        loading: false
      };
    case actionTypes.CANDIDATE_ALL_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_AVAILABILITIES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_AVAILABILITIES_SUCCESS:
      return {
        ...state,
        availabilities: action.payload,
        loading: false
      };
    case actionTypes.GET_AVAILABILITIES_FAIL:
    case actionTypes.GET_LANGUAGES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        loading: false
      };
    case actionTypes.GET_LANGUAGES_FAIL:
    case actionTypes.GET_WORKS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_WORKS_SUCCESS:
      return {
        ...state,
        works: action.payload,
        loading: false
      };
    case actionTypes.GET_WORKS_FAIL:
    case actionTypes.GET_POSITIONS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_POSITIONS_SUCCESS:
      return {
        ...state,
        positions: action.payload,
        loading: false
      };
    case actionTypes.GET_POSITIONS_FAIL:
    case actionTypes.GET_LIVINGS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_LIVINGS_SUCCESS:
      return {
        ...state,
        livings: action.payload,
        loading: false
      };
    case actionTypes.GET_LIVINGS_FAIL:
    case actionTypes.GET_STATUSES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.payload,
        loading: false
      };
    case actionTypes.GET_STATUSES_FAIL:
    case actionTypes.GET_QSKILLS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_QSKILLS_SUCCESS:
      return {
        ...state,
        qskills: action.payload,
        loading: false
      };
    case actionTypes.GET_QSKILLS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_SKILLS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.payload,
        loading: false
      };
    case actionTypes.GET_SKILLS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_SINGLENANNY_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_SINGLENANNY_SUCCESS:
      return {
        ...state,
        singleNanny: action.payload,
        loading: false
      };
    case actionTypes.GET_SINGLENANNY_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.BLACKLIST_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.BLACKLIST_SUCCESS:
      return {
        ...state,
        blacklist: action.payload,
        loading: false
      };
    case actionTypes.BLACKLIST_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_RATINGS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_RATINGS_SUCCESS:
      return {
        ...state,
        ratings: action.payload,
        loading: false
      };
    case actionTypes.GET_RATINGS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SELECT_RATINGS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.SELECT_RATINGS_SUCCESS:
      return {
        ...state,
        nannies: action.payload,
        loading: false
      };
    case actionTypes.SELECT_RATINGS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_MESSAGE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        loading: false
      };
    case actionTypes.GET_MESSAGE_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SEND_MESSAGE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        loading: false
      };
    case actionTypes.SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SET_FILTER_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.SET_FILTER_SUCCESS:
      return {
        ...state,
        nannies: action.payload,
        loading: false
      };
    case actionTypes.SET_FILTER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_NANNIES_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_NANNIES_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_NANNIES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.DELETE_ALLNANNIES_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_ALLNANNIES_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_ALLNANNIES_FAIL:
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
