import axios from 'axios';
import { toast } from 'react-toastify';
// import { BASE_URL } from '../../config';
import * as actionTypes from './ActionTypes';

export const userRegister = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_REGISTER_INIT
    });

    await axios
      .post(`/api/signup`, payload, {})
      .then((res) => {
        console.log('-------------', res);
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.USER_REGISTER_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((error) => {
        console.log('skjcfbsdhgvf - ', error.response.data.message);
        dispatch({
          type: actionTypes.USER_REGISTER_FAIL,
          payload: error.response.data.message
        });
        toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const userLogin = (payload, navigation) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_LOGIN_INIT
    });
    await axios
      .post(`/api/authenticate`, payload, {})
      .then(async (res) => {
        if (res.data && res.status == '200') {
          localStorage.setItem('authtoken', res.data.token);
          localStorage.setItem('userid', res.data.user.id);
          localStorage.setItem('username', res.data.user.fullName);
          localStorage.setItem('email', res.data.user.email);
          localStorage.setItem('isVisible', 'true');
          dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            payload: res.data
          });
          dispatch(updateTimezone());
          const token = localStorage.getItem('authtoken');
          await axios
            .get(
              `/api/users/me/agencies`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              },
              payload
            )
            .then((res) => {
              if (res.data) {
                if (res.data.length > 0) {
                  const redirectToJoinTeam = res.data
                    .map((e) => e.roles)
                    .flat()
                    .find((e) => e.enabled);
                  if (!redirectToJoinTeam) {
                    navigation('/jointeam');
                  } else {
                    navigation('/');
                  }
                } else {
                  navigation('/jointeam');
                }
              }
            });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.USER_LOGIN_FAIL,
          payload: error?.response?.data?.message
        });
        toast.error(error.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const loginGoogle = (payload) => {
  let data = {
    authType: 'google',
    token: payload.id_token
  };

  return async (dispatch) => {
    dispatch({
      type: actionTypes.GOOGLE_LOGIN_INIT
    });

    await axios
      .post(`/api/authenticate`, data, {})
      .then(async (res) => {
        if (res.data) {
          localStorage.setItem('authtoken', res.data.token);
          localStorage.setItem('userid', res.data.user.id);
          localStorage.setItem('username', res.data.user.fullName);
          localStorage.setItem('isVisible', 'true');
          dispatch({
            type: actionTypes.GOOGLE_LOGIN_SUCCESS,
            payload: res.data
          });
          const token = localStorage.getItem('authtoken');
          await axios
            .get(
              `/api/users/me/agencies`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              },
              payload
            )
            .then((res) => {
              if (res.data) {
                if (res.data.length > 0) {
                  const redirectToJoinTeam = res.data
                    .map((e) => e.roles)
                    .flat()
                    .find((e) => e.enabled);
                  if (!redirectToJoinTeam) {
                    window.location.replace(
                      `${window.location.origin}/jointeam`
                    );
                  } else {
                    window.location.replace(`${window.location.origin}`);
                  }
                } else {
                  window.location.replace(`${window.location.origin}/jointeam`);
                }
              }
              // if (res?.data?.length === 0) {
              //   window.location.replace(`${window.location.origin}/jointeam`);
              // } else {
              //   res.data.forEach((e) => {
              //     if (e.enabled === true) {
              //       window.location.replace(`${window.location.origin}`);
              //     }
              //   });
              // }
            });
        }
      })
      .catch((error) => {
        console.log('error', error);
        dispatch({
          type: actionTypes.GOOGLE_LOGIN_FAIL,
          payload: error?.response?.data?.message
        });
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_LOGOUT
    });
    localStorage.clear();
    window.location.replace(`${window.location.origin}`);
  };
};

export const signinSuccess = (token) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_SUCCESS_INIT
    });
    await axios
      .get(`/api/signup/confirm/${token}`)
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.SIGNUP_SUCCESS_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((error) => {
        console.log('signupconfirm ----errro', error);
        dispatch({
          type: actionTypes.SIGNUP_SUCCESS_FAIL,
          payload: 'Something went wrong!'
        });
        toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const forgetPassword = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FORGET_PASSWORD_INIT
    });

    await axios
      .post(`/api/forgot-password`, payload, {})
      .then((res) => {
        if (res.config.data && res.status == '200') {
          dispatch({
            type: actionTypes.FORGET_PASSWORD_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.FORGET_PASSWORD_FAIL,
          payload: error.response.data.message
        });
        toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const resetPassword = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_PASSWORD_INIT
    });

    await axios
      .post(`/api/reset-password`, payload, {})
      .then((res) => {
        console.log('res --- resetPassword', res.config.data);
        if (res.config.data && res.status == '200') {
          dispatch({
            type: actionTypes.RESET_PASSWORD_SUCCESS,
            payload: res.data
          });
          window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((error) => {
        console.log('resetPassword ++++++', error);
        dispatch({
          type: actionTypes.RESET_PASSWORD_FAIL,
          payload: error.response.data.message
        });
        toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const updateTimezone = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_TIMEZONE_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(
        `/api/users/me/timezone`,
        { timezoneOffset: new Date().getTimezoneOffset() },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_TIMEZONE_SUCCESS,
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
          type: actionTypes.UPDATE_TIMEZONE_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const sentNotification = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.NOTIFICATIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(
        `/api/users/me/testNotification`,
        { content: 'Hello world!' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.NOTIFICATIONS_SUCCESS,
            payload: res.data
          });
          resolve(res);
          toast.success(res?.statusText, { autoClose: 1500 });
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

export const updateUser = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.UPDATE_USER_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .put(`/api/users/me`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_USER_SUCCESS,
            payload: res.data
          });
          resolve(res);
          toast.success('Profile updated successfully.', { autoClose: 1500 });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.UPDATE_USER_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};

export const deleteUser = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.DELETE_USER_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .delete(`/api/users/me`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_USER_SUCCESS,
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
          type: actionTypes.DELETE_USER_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};
