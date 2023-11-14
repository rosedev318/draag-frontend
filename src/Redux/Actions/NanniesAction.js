import axios from 'axios';
import { toast } from 'react-toastify';
import * as actionTypes from './ActionTypes';
// import { BASE_URL } from '../../config';

export const nanniesForm = (payload, navigate) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.NANNIES_FORM_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/nannies`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.NANNIES_FORM_SUCCESS,
            payload: res.data
          });
          // toast.success('Candidate added successfully.', { autoClose: 1500 });
          navigate('/bio', { state: { id: res?.data?.id } });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.NANNIES_FORM_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.status + error.response.data.message, {
        //   autoClose: 1500
        // });
      });
  };
};

export const getsingleNanny = (id, payload = {}) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_SINGLENANNY_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/${id}`,
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
            type: actionTypes.GET_SINGLENANNY_SUCCESS,
            payload: res.data
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
          type: actionTypes.GET_SINGLENANNY_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const nanniesUpdateForm = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.NANNIESEDIT_FORM_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/nannies/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.NANNIESEDIT_FORM_SUCCESS,
            payload: res.data
          });

          dispatch(getsingleNanny(id));

          // toast.success('Form Updated successfully.', { autoClose: 1500 });
          // navigate('/docs', { state: res.data.id });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.NANNIESEDIT_FORM_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const Blacklist = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.BLACKLIST_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/nannies/${id}/blacklist`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.BLACKLIST_SUCCESS,
            payload: res.data
          });

          dispatch(getsingleNanny(id));

          // toast.success('Form Updated successfully.', { autoClose: 1500 });
          // navigate('/docs', { state: res.data.id });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.BLACKLIST_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const Ratings = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_RATINGS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/ratings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_RATINGS_SUCCESS,
            payload: res.data
          });

          // toast.success('Form Updated successfully.', { autoClose: 1500 });
          // navigate('/docs', { state: res.data.id });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_RATINGS_FAIL,
          payload: error?.response?.data?.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const updateRatings = (id, rating, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_RATINGS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/nannies/${id}/ratings/${rating}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.SELECT_RATINGS_SUCCESS,
            payload: res.data
          });
          dispatch(getsingleNanny(id));
          // toast.success('Form Updated successfully.', { autoClose: 1500 });
          // navigate('/docs', { state: res.data.id });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.SELECT_RATINGS_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const nanniesUpdateExtraForm = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.NANNIESEDIT_FORM_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/nannies/${id}/extra-info`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.NANNIESEDIT_FORM_SUCCESS,
            payload: res.data
          });
          // toast.success('Form Updated successfully.', { autoClose: 1500 });
          // navigate('/docs', { state: res.data.id });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.NANNIESEDIT_FORM_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const nanniesPatchForm = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.NANNIESPATCH_FORM_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .patch(`/api/nannies/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.NANNIESPATCH_FORM_SUCCESS,
            payload: res.data
          });
          // toast.success('Form Updated successfully.', { autoClose: 1500 });
          // navigate('/docs', { state: res.data.id });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.NANNIESPATCH_FORM_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const nanniesFiles = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FILES_UPLOAD_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/nannies/${id}/files`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res && res.data && res.status == '200') {
          dispatch({
            type: actionTypes.FILES_UPLOAD_SUCCESS,
            payload: res.data
          });
        }
      })
      .catch((error) => {
        console.log('Nanny Form Error - ', error);
        if (error.response.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.FILES_UPLOAD_FAIL,
          payload: error.response.data.message
        });
        // toast.error(error.response.data.message, { autoClose: 1500 });
      });
  };
};

export const getCandidate = (size, page, payload = {}) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CANDIDATE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies?size=${size}&page=${page}`,
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
            type: actionTypes.CANDIDATE_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((error) => {
        if (error?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.CANDIDATE_FAIL,
          payload: error?.response?.data?.message
        });
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
      });
  };
};

export const getAllCandidate = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CANDIDATE_ALL_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload,
        {}
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.CANDIDATE_ALL_SUCCESS,
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
        // console.log('jobs errr +++', err);
        dispatch({
          type: actionTypes.CANDIDATE_ALL_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getAvailabilities = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_AVAILABILITIES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/availabilities`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_AVAILABILITIES_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_AVAILABILITIES_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getLanguages = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_LANGUAGES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/languages`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_LANGUAGES_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_LANGUAGES_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getWorks = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_WORKS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/works`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_WORKS_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_WORKS_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getPositions = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_POSITIONS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/positions`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_POSITIONS_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_POSITIONS_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getLivings = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_LIVINGS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/livings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_LIVINGS_SUCCESS,
            payload: res.data
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
          type: actionTypes.GET_LIVINGS_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getStatuses = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_STATUSES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/statuses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_STATUSES_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_STATUSES_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getQuaSkills = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_QSKILLS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/qualified-skills`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_QSKILLS_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_QSKILLS_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getSkills = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_SKILLS_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/skills`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_SKILLS_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.GET_SKILLS_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const getTemplates = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_MESSAGE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .get(
        `/api/nannies/mass-messages/templates`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.GET_MESSAGE_SUCCESS,
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
          type: actionTypes.GET_MESSAGE_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const sendMessages = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SEND_MESSAGE_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/nannies/mass-messages`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.SEND_MESSAGE_SUCCESS,
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
          type: actionTypes.SEND_MESSAGE_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const Filters = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SET_FILTER_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/nannies/search`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.SET_FILTER_SUCCESS,
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
          type: actionTypes.SET_FILTER_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const deleteNanny = (id, size, page, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_NANNIES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .delete(
        `/api/nannies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        payload
      )
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_NANNIES_SUCCESS,
            payload: res.data
          });
          dispatch(getCandidate(size, page));
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
          type: actionTypes.DELETE_NANNIES_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const deleteAllNanny = (payload, size, page, setSelectAll) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ALLNANNIES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .post(`/api/nannies/delete`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status == '200') {
          dispatch({
            type: actionTypes.DELETE_ALLNANNIES_SUCCESS,
            payload: res.data
          });
          dispatch(getCandidate(size, page));
          setSelectAll(false);
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
          type: actionTypes.DELETE_ALLNANNIES_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};

export const hightlightNannies = (nannyId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.HIGHLIGHT_NANNIES_INIT
    });
    const token = localStorage.getItem('authtoken');
    await axios
      .put(`/api/nannies/${nannyId}/highlight`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        // console.log('res Candidate', res);
        if (res.data && res.status == '200') {
          dispatch({
            type: actionTypes.HIGHLIGHT_NANNIES_SUCCESS,
            payload: res.data
          });
          // window.location.replace(`${window.location.origin}`);
        }
      })
      .catch((err) => {
        console.log('jobs errr +++', err);
        if (err?.response?.status == '401') {
          localStorage.clear();
          window.location.replace(window.location.origin);
        }
        dispatch({
          type: actionTypes.HIGHLIGHT_NANNIES_FAIL,
          payload: 'Something went wrong!'
        });
        // toast.error('Something went wrong!', { autoClose: 1500 });
      });
  };
};
