import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  jobs: [],
  error: '',
  positions: [],
  works: [],
  livings: [],
  statuses: [],
  skills: [],
  loading: false
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOBS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case actionTypes.JOBS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.JOBS_POSITIONS_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.JOBS_POSITIONS_SUCCESS:
      return {
        ...state,
        positions: action.payload
      };
    case actionTypes.JOBS_POSITIONS_FAIL:
      return {
        ...state
      };
    case actionTypes.JOBS_WORKS_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.JOBS_WORKS_SUCCESS:
      return {
        ...state,
        works: action.payload
      };
    case actionTypes.JOBS_WORKS_FAIL:
      return {
        ...state
      };
    case actionTypes.JOBS_LIVINGS_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.JOBS_LIVINGS_SUCCESS:
      return {
        ...state,
        livings: action.payload
      };
    case actionTypes.JOBS_LIVINGS_FAIL:
      return {
        ...state
      };
    case actionTypes.JOBS_STATUSES_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.JOBS_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.payload
      };
    case actionTypes.JOBS_STATUSES_FAIL:
      return {
        ...state
      };
    case actionTypes.JOBS_SKILLS_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.JOBS_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.payload
      };
    case actionTypes.JOBS_SKILLS_FAIL:
      return {
        ...state
      };
    case actionTypes.JOBS_FILTER_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.JOBS_FILTER_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case actionTypes.JOBS_FILTER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default store;
