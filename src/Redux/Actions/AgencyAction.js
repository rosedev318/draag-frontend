import axios from 'axios';
import { toast } from 'react-toastify';
// import { BASE_URL } from '../../config';
import * as actionTypes from './ActionTypes';

export const joinTeam = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOIN_TEAM_INIT
    });

    await axios
      .post(`/api/authenticate`, payload, {})
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.JOIN_TEAM_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((error) => {
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.JOIN_TEAM_FAIL,
          payload: error.response.data.message
        });
        toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const allAgency = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.All_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/agencies?all=true`,
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
            type: actionTypes.All_AGENCY_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('agencuy errr +++', err);
        dispatch({
          type: actionTypes.All_AGENCY_FAIL,
          payload: 'Something went wrong!'
        });
        toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const joinAgency = (selected) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.JOIN_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    const userid = localStorage.getItem('userid');
    await axios
      .post(
        `/api/users/${userid}/agencies/${selected}`,
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
            type: actionTypes.JOIN_AGENCY_SUCCESS,
            payload: res.data
          });
          dispatch(userAgency());
          // navigation('/pendingteam');
          // window.location.replace(`${window.location.origin}/pendingteam`, {
          //   state: { selected }
          // });
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.JOIN_AGENCY_FAIL,
          payload: err.response.data.message
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const agencyStatus = (selected, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.AGENCY_STATUS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/agencies/${selected}`,
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
            type: actionTypes.AGENCY_STATUS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.AGENCY_STATUS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const selectAgency = (agencyid, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_AGENCY_INIT
    });
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/users/${userid}/default-agency/${agencyid}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.SELECT_AGENCY_SUCCESS,
            payload: res.data,
            data: agencyid
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.SELECT_AGENCY_FAIL,
          payload: err.response.data.message
        });
        toast.error(err.response.data.message, { autoClose: 1500 });
      });
  };
};

export const searchAgency = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SEARCH_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `api/agencies?name=${payload}`,

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
            type: actionTypes.SEARCH_AGENCY_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.SEARCH_AGENCY_FAIL,
          payload: 'Something went wrong!'
        });
        toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const createAgency = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.CREATE_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .post(`/api/agencies`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CREATE_AGENCY_SUCCESS,
            payload: res.data
          });
          resolve(res);
          toast.success('Agency Created Successfully', { autoClose: 1500 });
          // dispatch(userAgency());
          // navigate('/');
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }

        dispatch({
          type: actionTypes.CREATE_AGENCY_FAIL,
          payload: err.response.data.message
        });
        toast.error(err.response.data.message, { autoClose: 1500 });
      });
  });
};

export const agencyUsers = (agencyid, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.AGENCY_USERS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/agencies/${agencyid}/users`,
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
            type: actionTypes.AGENCY_USERS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.AGENCY_USERS_FAIL,
          payload: err?.response?.statusText
        });
        // toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const enabledAgencyUsers = (agencyid, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ENABLE_AGENCY_USERS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/agencies/${agencyid}/users?type=enabled`,
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
            type: actionTypes.ENABLE_AGENCY_USERS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.ENABLE_AGENCY_USERS_FAIL,
          payload: err?.response?.statusText
        });
        // toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const userAgency = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_USER_AGENCY_INIT
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
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_USER_AGENCY_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err && err?.response?.status == '401') {
          localStorage.clear();
          // window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_USER_AGENCY_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const userProfile = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.USER_PROFILE_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .get(
        `/api/users/me`,
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
            type: actionTypes.USER_PROFILE_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.USER_PROFILE_INIT,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  });
};

export const userInvite = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_INVITAIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    const email = localStorage.getItem('email');

    await axios
      .get(
        `/api/invitations?email=` + email,
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
            type: actionTypes.GET_INVITAIONS_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.GET_INVITAIONS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const sendInvite = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SEND_INVITAIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/invitations`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.SEND_INVITAIONS_SUCCESS,
            payload: res.data
          });
          dispatch(userInvite());
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.SEND_INVITAIONS_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const deleteInvite = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_INVITAIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/invitations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_INVITAIONS_SUCCESS,
            payload: res.data
          });
          toast.success('Invitations Deleted Successfully.', {
            autoClose: 1500
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.DELETE_INVITAIONS_FAIL,
          payload: err?.response?.statusText
        });
        toast.error(err?.response?.statusText, { autoClose: 1500 });
      });
  };
};

export const leaveAgency = (agencyId, name, payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.LEAVE_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    axios
      .delete(
        `/api/users/me/agencies/${agencyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.LEAVE_AGENCY_SUCCESS,
            payload: res.data
          });
          resolve(res);
          dispatch(userAgency());
          toast.success(`You have removed yourself from ${name}`, {
            autoClose: 1500
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.LEAVE_AGENCY_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  });
};

export const leavePendingAgency = (agencyId, name, newuser, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LEAVE_PENDING_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `api/users/me/agencies/${agencyId}/cancel`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.LEAVE_PENDING_AGENCY_SUCCESS,
            payload: res.data
          });
          if (newuser) {
            dispatch(userAgency());
          } else {
            dispatch(allAgency());
          }
          toast.success(`You have removed yourself from ${name}`, {
            autoClose: 1500
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.LEAVE_PENDING_AGENCY_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const enableAgencyRole =
  (agencyId, userId, role, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: actionTypes.ENABLE_AGENCY_ROLE_INIT
      });
      const token = localStorage.getItem('authtoken');
      axios
        .patch(
          `api/agencies/${agencyId}/users/${userId}/roles/${role}/enable`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((res) => {
          if (res.status == '200') {
            dispatch({
              type: actionTypes.ENABLE_AGENCY_ROLE_SUCCESS,
              payload: res.data
            });
            resolve(res);
          }
        })
        .catch((err) => {
          if (err?.response?.status == '401') {
            localStorage.clear();
            window.location.replace(window.location.origin);
          }
          console.log('err', err);
          dispatch({
            type: actionTypes.ENABLE_AGENCY_ROLE_FAIL,
            payload: err?.response?.data?.message
          });
          toast.error(err?.response?.data?.message, { autoClose: 1500 });
        });
    });
  };

export const disableAgencyRole = (agencyId, userId, role, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DISABLE_AGENCY_ROLE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .patch(
        `api/agencies/${agencyId}/users/${userId}/roles/${role}/disable`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.DISABLE_AGENCY_ROLE_SUCCESS,
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
          type: actionTypes.DISABLE_AGENCY_ROLE_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const allAgencies = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_AGENCY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `api/users/me/agencies`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.GET_ALL_AGENCY_SUCCESS,
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
          type: actionTypes.GET_ALL_AGENCY_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const updateAgencyInfo = (agencyid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_AGENCY_INFO_INIT
    });
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('authtoken');
    await axios
      .put(
        `/api/agencies/${agencyid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.UPDATE_AGENCY_INFO_SUCCESS,
            payload: res.data,
            data: agencyid
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        console.log('err', err);
        dispatch({
          type: actionTypes.UPDATE_AGENCY_INFO_FAIL,
          payload: err.response.data.message
        });
        toast.error(err.response.data.message, { autoClose: 1500 });
      });
  };
};

export const getAgencyRoles = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_AGENCY_ROLES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `api/agencies/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.GET_AGENCY_ROLES_SUCCESS,
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
          type: actionTypes.GET_AGENCY_ROLES_FAIL,
          payload: err?.response?.data?.message
        });
        toast.error(err?.response?.data?.message, { autoClose: 1500 });
      });
  };
};
