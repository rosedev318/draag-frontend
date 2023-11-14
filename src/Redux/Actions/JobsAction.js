import axios from 'axios';
import { toast } from 'react-toastify';
import * as actionTypes from './ActionTypes';

export const getJobs = (itemsPerPage, page, payload = {}) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs?size=${itemsPerPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload,
        {}
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_SUCCESS,
            payload: res?.data
          });
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
          type: actionTypes.JOBS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const createJobs = (payload, navigate) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_JOB_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/jobs`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CREATE_JOB_SUCCESS,
            payload: res?.data
          });
          toast.success('Job created successfully', { autoClose: 1500 });
          navigate('/clients');
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
          type: actionTypes.CREATE_JOB_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const highlightJobs = (jobsid, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.HIGHLIGHT_JOBS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/jobs/${jobsid}/highlight`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.HIGHLIGHT_JOBS_SUCCESS,
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
          type: actionTypes.HIGHLIGHT_JOBS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};

export const getJobsPositions = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_POSITIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/positions`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        {}
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_POSITIONS_SUCCESS,
            payload: res?.data
          });
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
          type: actionTypes.JOBS_POSITIONS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getJobsWorks = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_WORKS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/works`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        {}
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_WORKS_SUCCESS,
            payload: res?.data
          });
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
          type: actionTypes.JOBS_WORKS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getJobsLivings = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_LIVINGS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/livings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        {}
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_LIVINGS_SUCCESS,
            payload: res?.data
          });
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
          type: actionTypes.JOBS_LIVINGS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getJobsStatus = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_STATUSES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/statuses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        {}
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_STATUSES_SUCCESS,
            payload: res?.data
          });
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
          type: actionTypes.JOBS_STATUSES_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getJobsSkills = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_SKILLS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/jobs/skills`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        {}
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_SKILLS_SUCCESS,
            payload: res?.data
          });
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
          type: actionTypes.JOBS_SKILLS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const FiltersJobs = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOBS_FILTER_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/jobs/search`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOBS_FILTER_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log(' errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.JOBS_FILTER_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};
