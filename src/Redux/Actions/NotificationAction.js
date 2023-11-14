import axios from 'axios';
import { toast } from 'react-toastify';
import * as actionTypes from './ActionTypes';

export const getNotification = (size, page, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.NOTIFICATIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/notifications?size=${size}&page=${page}`,
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
            type: actionTypes.NOTIFICATIONS_SUCCESS,
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
          type: actionTypes.NOTIFICATIONS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const deleteNotification = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.DELETE_NOTIFICATIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .delete(`/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_NOTIFICATIONS_SUCCESS,
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
          type: actionTypes.DELETE_NOTIFICATIONS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const markNotification = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.MARK_NOTIFICATION_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(
        `/api/notifications/${id}/seen`,
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
            type: actionTypes.MARK_NOTIFICATION_SUCCESS,
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
          type: actionTypes.MARK_NOTIFICATION_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const markAllNotification = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.MARK_ALL_NOTIFICATION_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(
        `/api/notifications/seen`,
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
            type: actionTypes.MARK_ALL_NOTIFICATION_SUCCESS,
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
          type: actionTypes.MARK_ALL_NOTIFICATION_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const getSingleNotification = (id, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.SINGLE_NOTIFICATION_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/notifications/${id}`,
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
            type: actionTypes.SINGLE_NOTIFICATION_SUCCESS,
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
          type: actionTypes.SINGLE_NOTIFICATION_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const delteAllNotification = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.DELETE_ALL_NOTIFICATIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .post(`/api/notifications/delete`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_ALL_NOTIFICATIONS_SUCCESS,
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
          type: actionTypes.DELETE_ALL_NOTIFICATIONS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};
