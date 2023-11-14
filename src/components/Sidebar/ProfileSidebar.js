import React, { useEffect, useState } from 'react';
import './ProfileSidebar.css';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import Input from '../input/Input';
import { useDispatch } from 'react-redux';
import { leaveAgency, userProfile } from '../../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import { updateUser } from '../../Redux/Actions/AuthAction';
import * as actionTypes from '../../Redux/Actions/ActionTypes';
import Check from '../../Images/circle_check_outline.svg';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = (props) => {
  const {
    setProfileOpen,
    profileOpen,
    defaultAgency,
    agencyName,
    handleOpenAgency,
    handleOpenProfileModal,
    setFile,
    file
  } = props;
  const initialValues = { firstName: '', lastName: '', email: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [save, setSave] = useState(false);
  const [filedata, setFiledata] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.Agency?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
      setFiledata(event.target.files);
    }
  };

  useEffect(() => {
    if (profileOpen) {
      dispatch(userProfile());
    }
  }, [profileOpen]);

  useEffect(() => {
    setFormValues({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email
    });
    setFile(userData?.profileImageUrl);
  }, []);

  const handleSubmit = () => {
    const form = new FormData();
    form.append('firstName', formValues.firstName);
    form.append('lastName', formValues.lastName);
    form.append('email', formValues.email);
    if (filedata?.length > 0) {
      form.append('photoFile', filedata[0]);
    }

    setSave(true);
    setTimeout(() => {
      setSave(false);
    }, 1000);

    dispatch(updateUser(form)).then((res) => {
      if (res?.status === 200) {
        dispatch(userProfile());
      }
    });
  };

  const handleClose = () => {
    setProfileOpen(false);
  };

  return (
    <>
      <div className="mainprofile-sidebar">
        <div className="closeIcon-profile">
          <CloseIcon onClick={() => handleClose()} />
        </div>
        <div className="d-flex align-items-center" style={{ marginLeft: 44 }}>
          <div className="profile-border">
            <Avatar src={file} sx={{ width: 85, height: 85 }} />
            {!file && userData?.profileImageUrl && (
              <Avatar
                src={userData?.profileImageUrl}
                sx={{ width: 85, height: 85 }}
              />
            )}
          </div>
          <div className="px-3">{userData?.fullName}</div>
        </div>
        <div className="detail-main-profile">
          <button
            className="upload-btn mt-2"
            onClick={() => handleOpenProfileModal()}
          >
            Remove
          </button>
          <div>
            <div className="form-text-profile mt-4 pt-2 pb-2">First name</div>
            <input
              type="text"
              value={formValues.firstName}
              className="profile-input"
              onChange={handleChange}
              name="firstName"
              placeholder="Enter First name"
            />
            <div className="form-text-profile mt-3 pb-2">Last name</div>
            <input
              type="text"
              value={formValues.lastName}
              className="profile-input"
              onChange={handleChange}
              name="lastName"
              placeholder="Enter Last name"
            />
            <div
              className="d-flex justify-content-between align-items-center pb-2 mt-3"
              style={{ width: '295px' }}
            >
              <div className="form-text-profile">Email</div>
              <div className="form-text-email">
                For notifications and logging into
              </div>
            </div>
            <input
              type="text"
              value={formValues.email}
              className="profile-input"
              onChange={handleChange}
              name="email"
              disabled
              style={{ color: '#CFC7C7' }}
              placeholder="Enter Email"
            />
            <div className="form-text-profile mt-3 pb-2">Photo</div>
            <input
              className="profile-input pt-2"
              type="file"
              name="file"
              onChange={onImageChange}
            />
            <div className="d-flex justify-content-end px-5 mt-1"></div>

            {userData?.googleId && (
              <div className="mt-5 pt-3">
                <span className="delete-title">Linked accounts</span>
                <div className="d-flex align-items-center gap-1 pt-3">
                  <img
                    src={require('../../Images/google.png')}
                    height="60px"
                    style={{ marginLeft: '-12px' }}
                    draggable="false"
                  />
                  <span className="delete-title">Connected with Google</span>
                </div>
              </div>
            )}
            <div className="mt-5">
              <span className="delete-title">Leave team</span>
              <p className="delete-message pt-1">
                This cannot be undone, are you sure?
              </p>
            </div>
            <div className="d-flex justify-content-end px-5 pt-1">
              <button className="leave-btn" onClick={() => handleOpenAgency()}>
                Leave
              </button>
            </div>
            <div className="d-flex justify-content-end px-5 mt-4 mb-5">
              <button
                className="userprofile-btn"
                onClick={() => handleSubmit()}
              >
                <img src={Check} />
                {save ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
