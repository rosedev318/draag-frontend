import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  metrics: {},
  events: {},
  top_area_candidate: {},
  top_area_client: {},
  complete_client: {},
  subarea_client: {},
  subarea_candidate: {},
  top_profession_client: {},
  gender_candidate: {},
  count_candidate: {},
  count_jobs: {}
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };
    case actionTypes.CREATE_EVENT:
      console.log("log in store", state, action.payload);
      return {
        ...state,
        events: action.payload,
      };
    case actionTypes.METRICS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.METRICS_SUCCESS:
      return {
        ...state,
        metrics: action.payload,
        loading: false
      };
    case actionTypes.METRICS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TOP_AREA_CANDIDATE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.TOP_AREA_CANDIDATE_SUCCESS:
      return {
        ...state,
        top_area_candidate: action.payload,
        loading: false
      };
    case actionTypes.TOP_AREA_CANDIDATE_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TOP_AREA_CLIENT_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.TOP_AREA_CLIENT_SUCCESS:
      return {
        ...state,
        top_area_client: action.payload,
        loading: false
      };
    case actionTypes.TOP_AREA_CLIENT_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TOP_AREA_COMPLETED_CLIENT_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.TOP_AREA_COMPLETED_CLIENT_SUCCESS:
      return {
        ...state,
        complete_client: action.payload,
        loading: false
      };
    case actionTypes.TOP_AREA_COMPLETED_CLIENT_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TOP_SUBAREA_CANDIDATE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.TOP_SUBAREA_CANDIDATE_SUCCESS:
      return {
        ...state,
        subarea_candidate: action.payload,
        loading: false
      };
    case actionTypes.TOP_SUBAREA_CANDIDATE_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TOP_SUBAREA_CLIENT_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.TOP_SUBAREA_CLIENT_SUCCESS:
      return {
        ...state,
        subarea_client: action.payload,
        loading: false
      };
    case actionTypes.TOP_SUBAREA_CLIENT_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TOP_PROFESSIONS_CLIENT_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.TOP_PROFESSIONS_CLIENT_SUCCESS:
      return {
        ...state,
        top_profession_client: action.payload,
        loading: false
      };
    case actionTypes.TOP_PROFESSIONS_CLIENT_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GENDER_CANDIDATE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GENDER_CANDIDATE_SUCCESS:
      return {
        ...state,
        gender_candidate: action.payload,
        loading: false
      };
    case actionTypes.GENDER_CANDIDATE_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.COUNT_CANDIDATE_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.COUNT_CANDIDATE_SUCCESS:
      return {
        ...state,
        count_candidate: action.payload,
        loading: false
      };
    case actionTypes.COUNT_CANDIDATE_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.COUNT_JOBS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.COUNT_JOBS_SUCCESS:
      return {
        ...state,
        count_jobs: action.payload,
        loading: false
      };
    case actionTypes.COUNT_JOBS_FAIL:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default store;
