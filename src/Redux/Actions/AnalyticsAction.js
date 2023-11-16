import axios from 'axios';
import * as actionTypes from './ActionTypes';
import { toast } from 'react-toastify';

export const createEvent = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    axios
      .post(
        `/api/chart-event-notes/bulk`, 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          resolve(res.data);
          toast.success('Events Created Successfully', { autoClose: 1500 });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        
        toast.error(err.response.data.message, { autoClose: 1500 });
      });
  });
};

export const getEvents = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/chart-event-notes`,
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
            type: actionTypes.EVENTS_SUCCESS,
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
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const getMetrics = (startdate, enddate, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.METRICS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/analytics?dateFrom=${startdate}&dateTo=${enddate}`,
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
            type: actionTypes.METRICS_SUCCESS,
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
          type: actionTypes.METRICS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const getAreaCandidate = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOP_AREA_CANDIDATE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/top-areas-has-most-candidates?size=10`,
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
            type: actionTypes.TOP_AREA_CANDIDATE_SUCCESS,
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
          type: actionTypes.TOP_AREA_CANDIDATE_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getAreaClient = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOP_AREA_CLIENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/top-areas-has-most-clients?size=10`,
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
            type: actionTypes.TOP_AREA_CLIENT_SUCCESS,
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
          type: actionTypes.TOP_AREA_CLIENT_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getTopCompleteClient = (data, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOP_AREA_COMPLETED_CLIENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/top-areas-has-most-completed-clients?size=` + data,
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
            type: actionTypes.TOP_AREA_COMPLETED_CLIENT_SUCCESS,
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
          type: actionTypes.TOP_AREA_COMPLETED_CLIENT_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getTopSubCandidate = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOP_SUBAREA_CANDIDATE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/top-sub-areas-has-most-candidates?size=10`,
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
            type: actionTypes.TOP_SUBAREA_CANDIDATE_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.TOP_SUBAREA_CANDIDATE_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getTopSubClient = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOP_SUBAREA_CLIENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/top-sub-areas-has-most-clients?size=10`,
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
            type: actionTypes.TOP_SUBAREA_CLIENT_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.TOP_SUBAREA_CLIENT_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getTopProfessionClient = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOP_PROFESSIONS_CLIENT_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/top-professions-of-clients?size=10`,
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
            type: actionTypes.TOP_PROFESSIONS_CLIENT_SUCCESS,
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
          type: actionTypes.TOP_PROFESSIONS_CLIENT_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getGenderCandidate = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GENDER_CANDIDATE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/count-candidates-group-by-genders`,
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
            type: actionTypes.GENDER_CANDIDATE_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GENDER_CANDIDATE_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getCountCandidate = (ftime, ttime, group, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.COUNT_CANDIDATE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/analytics/count-created-candidates?from=${ftime}&to=${ttime}&groupBy=${group}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res?.data && res?.status == '200') {
          dispatch({
            type: actionTypes.COUNT_CANDIDATE_SUCCESS,
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
          type: actionTypes.COUNT_CANDIDATE_FAIL,
          payload: err?.response?.statusText
        });
        // toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const getCountJobs =
  (startOfMonth, endOfMonth, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: actionTypes.COUNT_JOBS_INIT
      });
      const token = localStorage.getItem('authtoken');
      axios
        .get(
          `/api/analytics/count-jobs?from=${startOfMonth}&to=${endOfMonth}`,
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
              type: actionTypes.COUNT_JOBS_SUCCESS,
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
            type: actionTypes.COUNT_JOBS_FAIL,
            payload: err?.response?.statusText
          });
          toast.error(err?.response?.statusText, { autoClose: 1500 });
        });
    });
  };
