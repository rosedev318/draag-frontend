import axios from 'axios';
import * as actionTypes from './ActionTypes';
import { toast } from 'react-toastify';

export const getSchedules = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_SCHEDULES_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/schedules`,
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
            type: actionTypes.GET_SCHEDULES_SUCCESS,
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
          type: actionTypes.GET_SCHEDULES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const addNotes = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.ADD_NOTES_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .post(`/api/notes`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.ADD_NOTES_SUCCESS,
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
          type: actionTypes.ADD_NOTES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const deleteNotes = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.DELETE_NOTES_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .delete(
        `/api/notes/${payload}`,
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
            type: actionTypes.DELETE_NOTES_SUCCESS,
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
          type: actionTypes.DELETE_NOTES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const toggleNotes = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.TOGGLE_NOTES_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .patch(
        `/api/notes/${payload}`,
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
            type: actionTypes.TOGGLE_NOTES_SUCCESS,
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
          type: actionTypes.TOGGLE_NOTES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const updateNotes = (id, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_NOTES_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/notes/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_NOTES_SUCCESS,
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
          type: actionTypes.UPDATE_NOTES_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const updateEvents = (id, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_EVENTS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/events/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_EVENTS_SUCCESS,
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
          type: actionTypes.UPDATE_EVENTS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const deleteEvents = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.DELETE_EVENTS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .delete(
        `/api/events/${payload}`,
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
            type: actionTypes.DELETE_EVENTS_SUCCESS,
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
          type: actionTypes.DELETE_EVENTS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const seenStatus = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.CHECK_STATUS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/schedules/seen-status`,
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
            type: actionTypes.CHECK_STATUS_SUCCESS,
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
          type: actionTypes.CHECK_STATUS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const updateCalendly = (agencyId, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_CALENDLY_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/agencies/${agencyId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_CALENDLY_SUCCESS,
            payload: res.data
          });
          resolve(res);
          toast.success('Calendly Connected Successfully.', {
            autoClose: 1500
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
          type: actionTypes.UPDATE_CALENDLY_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};
