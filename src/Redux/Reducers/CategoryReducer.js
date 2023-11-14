import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  monthStats: {},
  category: {},
  success: false,
  jobs: [],
  job: {},
  highlightNanny: [],
  assignNannies: [],
  jobsActivity: [],
  comments: [],
  matches: [],
  jobRatings: [],
  assigneeUsers: [],
  attachments: [],
  attachment: {}
};

const store = (state = initialState, action) => {
  // console.log('action.payload', action);
  switch (action.type) {
    case actionTypes.MONTHLY_STATS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.MONTHLY_STATS_SUCCESS:
      return {
        ...state,
        monthStats: action.payload,
        loading: false
      };
    case actionTypes.MONTHLY_STATS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_CATEGORY_INIT:
      return {
        ...state,
        error: '',
        success: false,
        loading: true
      };
    case actionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        success: true,
        loading: false
      };
    case actionTypes.GET_CATEGORY_FAIL:
      return {
        ...state,
        success: false,
        loading: true
      };
    case actionTypes.DELETE_CATEGORY_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_CATEGORY_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case actionTypes.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_JOBS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.ADD_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case actionTypes.ADD_JOBS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.HIGHLIGHTED_NANNIES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.HIGHLIGHTED_NANNIES_SUCCESS:
      return {
        ...state,
        highlightNanny: action.payload,
        loading: false
      };
    case actionTypes.HIGHLIGHTED_NANNIES_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CREATE_ASSIGNMENT_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignNannies: action.payload,
        loading: false
      };
    case actionTypes.CREATE_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.JOBS_ACTIVITIES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.JOBS_ACTIVITIES_SUCCESS:
      return {
        ...state,
        jobsActivity: action.payload,
        loading: false
      };
    case actionTypes.JOBS_ACTIVITIES_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_COMMENTS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case actionTypes.GET_COMMENTS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CREATE_COMMENTS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.CREATE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case actionTypes.CREATE_COMMENTS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_COMMENTS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.UPDATE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case actionTypes.UPDATE_COMMENTS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_COMMENTS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.DELETE_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_COMMENTS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_JOBS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.DELETE_JOBS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_JOBS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.MATCHES_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.MATCHES_SUCCESS:
      return {
        ...state,
        matches: action.payload,
        loading: false
      };
    case actionTypes.MATCHES_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_STATUS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case actionTypes.UPDATE_STATUS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_COVER_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.UPDATE_COVER_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case actionTypes.UPDATE_COVER_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.JOB_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.JOB_SUCCESS:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case actionTypes.JOB_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_JOBS_RATINGS_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.GET_JOBS_RATINGS_SUCCESS:
      return {
        ...state,
        jobRatings: action.payload,
        loading: false
      };
    case actionTypes.GET_JOBS_RATINGS_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_JOB_RATING_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.UPDATE_JOB_RATING_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case actionTypes.UPDATE_JOB_RATING_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_ASSIGNEE_USER_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.GET_ASSIGNEE_USER_SUCCESS:
      return {
        ...state,
        assigneeUsers: action.payload
      };
    case actionTypes.GET_ASSIGNEE_USER_FAIL:
      return {
        ...state
      };
    // case actionTypes.ADD_ASSIGNEE_INIT:
    //   return {
    //     ...state,
    //     error: '',
    //     loading: true
    //   };
    // case actionTypes.ADD_ASSIGNEE_SUCCESS:
    //   return {
    //     ...state,
    //     assigneeUsers: action.payload,
    //     loading: false
    //   };
    // case actionTypes.ADD_ASSIGNEE_FAIL:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case actionTypes.DELETE_ASSIGNEE_USER_INIT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case actionTypes.DELETE_ASSIGNEE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_ASSIGNEE_USER_FAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FILTER_HJOBS_INIT:
      return {
        ...state,
        error: '',
        success: false,
        loading: true
      };
    case actionTypes.FILTER_HJOBS_SUCCESS:
      return {
        ...state,
        category: action.payload,
        success: true,
        loading: false
      };
    case actionTypes.FILTER_HJOBS_FAIL:
      return {
        ...state,
        success: false,
        loading: true
      };
    case actionTypes.GET_ATTACHMENT_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.GET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        attachments: action.payload
      };
    case actionTypes.GET_ATTACHMENT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.SINGLE_ATTACHMENT_INIT:
      return {
        ...state,
        error: ''
      };
    case actionTypes.SINGLE_ATTACHMENT_SUCCESS:
      return {
        ...state,
        attachment: action.payload
      };
    case actionTypes.SINGLE_ATTACHMENT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default store;
