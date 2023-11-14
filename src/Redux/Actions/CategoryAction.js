import axios from 'axios';
import * as actionTypes from './ActionTypes';
import { toast } from 'react-toastify';

export const getMonthstats = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.MONTHLY_STATS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/monthly-stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.MONTHLY_STATS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.MONTHLY_STATS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const createCategory = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_CATEGORY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/categories`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_SUCCESS,
            payload: res.data
          });
          dispatch(getCategory());
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.CREATE_CATEGORY_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getCategory = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_CATEGORY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_CATEGORY_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_CATEGORY_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const deleteCategory = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_CATEGORY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/categories/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            payload: res.data
          });
          dispatch(getCategory());
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.DELETE_CATEGORY_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const updateCategory = (payload) => {
  console.log('payload', payload);
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CATEGORY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(
        `/api/categories/${payload.id}`,
        { name: payload.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            payload: res.data
          });
          dispatch(getCategory());
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_CATEGORY_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const addJobs = (categoryId, jobsId, order, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_JOBS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(
        `/api/categories/${categoryId}/jobs/${jobsId}?order=${order}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.ADD_JOBS_SUCCESS,
            payload: res.data
          });
        }
        // dispatch(getCategory());
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.ADD_JOBS_FAIL,
          payload: err?.response?.statusText
        });
        // toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getJob = (jobId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.JOB_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOB_SUCCESS,
            payload: res?.data
          });
          resolve(res);
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('jobs errr +++', err);
        dispatch({
          type: actionTypes.JOB_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};

export const nanniesHightlight = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.HIGHLIGHTED_NANNIES_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/nannies/highlighted-nannies?name=${payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res?.status == '200') {
          dispatch({
            type: actionTypes.HIGHLIGHTED_NANNIES_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.HIGHLIGHTED_NANNIES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const createAssignment = (jobId, assignId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.CREATE_ASSIGNMENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .post(`/api/jobs/${jobId}/assignments/${assignId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        // console.log('res+', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CREATE_ASSIGNMENT_SUCCESS,
            payload: res?.data
          });
          resolve(res);
          toast.success('Assignment created successfully.', {
            autoClose: 1500
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        // if (err?.response?.status == '401') {
        //   localStorage.clear();
        //   window.location.replace(window.location.origin);
        // }
        // console.log('jobs errr +++', err);
        dispatch({
          type: actionTypes.CREATE_ASSIGNMENT_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error('This nannie is already assigned with this job', {
          autoClose: 1500
        });
      });
  });
};

export const jobsActivities = (jobId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_ACTIVITIES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/${jobId}/activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_ACTIVITIES_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.JOBS_ACTIVITIES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getComments = (jobId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_COMMENTS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/${jobId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_COMMENTS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_COMMENTS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const createComments = (jobId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_COMMENTS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/jobs/${jobId}/comments`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CREATE_COMMENTS_SUCCESS,
            payload: res.data
          });
          dispatch(getComments(jobId));
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.CREATE_COMMENTS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const updateComments = (jobId, commentId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_COMMENTS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/jobs/${jobId}/comments/${commentId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_COMMENTS_SUCCESS,
            payload: res.data
          });
          dispatch(getComments(jobId));
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_COMMENTS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const deleteComments = (jobId, commentId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_COMMENTS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/jobs/${jobId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_COMMENTS_SUCCESS,
            payload: res.data
          });
          dispatch(getComments(jobId));
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.DELETE_COMMENTS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const deleteJobs = (jobId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.DELETE_JOBS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .delete(
        `/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_JOBS_SUCCESS,
            payload: res.data
          });
          resolve(res);
          toast.success('Job Deleted successfully', { autoClose: 1500 });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.DELETE_JOBS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const getMatches = (jobId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.MATCHES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/${jobId}/matches`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.MATCHES_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.MATCHES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const updateStatus = (jobId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_STATUS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(
        `/api/jobs/${jobId}/status/${payload}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_STATUS_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_STATUS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const updateCover = (jobId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_COVER_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/jobs/${jobId}/photo`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_COVER_SUCCESS,
            payload: res.data
          });
          dispatch(getJob(jobId));
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_COVER_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const updateJob = (jobId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_JOB_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/jobs/${jobId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_JOB_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_JOB_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const deleteAssignment = (jobId, assignId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ASSIGNMENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/jobs/${jobId}/assignments/${assignId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_ASSIGNMENT_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.DELETE_ASSIGNMENT_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getJobRating = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_JOBS_RATINGS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/ratings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_JOBS_RATINGS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_JOBS_RATINGS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const updateJobRating = (jobId, rating) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_JOB_RATING_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(
        `/api/jobs/${jobId}/ratings/${rating}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_JOB_RATING_SUCCESS,
            payload: res.data
          });
          dispatch(getJob(jobId));
          // dispatch(getCategory());
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_JOB_RATING_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getAssigneeUsers = (jobId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ASSIGNEE_USER_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/${jobId}/all_assignees`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_ASSIGNEE_USER_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_ASSIGNEE_USER_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const addAssignee = (jobId, assigneeId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_ASSIGNEE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/jobs/${jobId}/assignees/${assigneeId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.ADD_ASSIGNEE_SUCCESS,
            payload: res.data
          });
          dispatch(getAssigneeUsers(jobId));
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.ADD_ASSIGNEE_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const deleteAssignee = (jobId, assigneeId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ASSIGNEE_USER_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/jobs/${jobId}/assignees/${assigneeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_ASSIGNEE_USER_SUCCESS,
            payload: res.data
          });
          dispatch(getAssigneeUsers(jobId));
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.DELETE_ASSIGNEE_USER_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const filterHighlightJob = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FILTER_HJOBS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/categories/jobs-filter?${payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.FILTER_HJOBS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.FILTER_HJOBS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const removeJob = (categoryId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_JOB_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/categories/${categoryId}/jobs?${payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.REMOVE_JOB_SUCCESS,
            payload: res.data
          });
          dispatch(getCategory());
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.REMOVE_JOB_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const toggleMessage = (jobId, assignId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.TOGGLE_MESSAGE_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/jobs/${jobId}/assignments/${assignId}/message_sent`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.TOGGLE_MESSAGE_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.TOGGLE_MESSAGE_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const updateCategoryPosition = (categoryId, position) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.CATEGORY_POSITION_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(
        `/api/categories/${categoryId}/position/${position}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CATEGORY_POSITION_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.CATEGORY_POSITION_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const createAttachment = (jobId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.CREATE_ATTACHMENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .post(`/api/jobs/${jobId}/attachments`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CREATE_ATTACHMENT_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.CREATE_ATTACHMENT_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};

export const updateAttachment =
  (jobId, attachmentId, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: actionTypes.UPDATE_ATTACHMENT_INIT
      });
      const token = localStorage.getItem('authtoken');
      axios
        .put(`/api/jobs/${jobId}/attachments/${attachmentId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          if (res.data && res.status == '200') {
            dispatch({
              type: actionTypes.UPDATE_ATTACHMENT_SUCCESS,
              payload: res.data
            });
            resolve(res);
            toast.success(res?.data?.message, { autoClose: 1500 });
          }
        })
        .catch((err) => {
          console.log('err', err);
          if (err?.response?.status == '401') {
            localStorage.clear();
            window.location.replace(window.location.origin);
          }
          dispatch({
            type: actionTypes.UPDATE_ATTACHMENT_FAIL,
            payload: err?.response?.data?.message
          });
          toast.error(err?.response?.data?.message, { autoClose: 1500 });
        });
    });
  };

export const getAttachment = (jobId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_ATTACHMENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/jobs/${jobId}/attachments`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_ATTACHMENT_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_ATTACHMENT_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};

export const deleteAttachment = (jobId, attachId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ATTACHMENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/jobs/${jobId}/attachments/${attachId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_ATTACHMENT_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.DELETE_ATTACHMENT_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getSingleAttachment = (jobId, attachId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.SINGLE_ATTACHMENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/jobs/${jobId}/attachments/${attachId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.SINGLE_ATTACHMENT_SUCCESS,
            payload: res.data
          });
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.SINGLE_ATTACHMENT_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};
