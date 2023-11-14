import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import Copy from '../../Images/copy.svg';
import Status from '../status/Status';
import {
  getJob,
  getJobRating,
  updateJobRating
} from '../../Redux/Actions/CategoryAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import { copyToClipboard } from '../../constants/copydata';
import JobAvtar from './JobAvtar';
import AttachImageModal from './Modals/AttachImageModal';

const UserModalProfile = (props) => {
  const {
    data,
    allDays,
    livingsData,
    positions,
    user,
    ratings,
    star,
    handleRating,
    rating
  } = props;
  const [copy, setCopy] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [image, setImage] = useState('');

  const copyItem = `
    Name: ${data.name == null ? '' : data.name}
    Position: ${positions.toString() == null ? '' : positions.toString()}
    Living: ${livingsData}
    Location: ${data.address !== null && data.address}
    Children: ${data.numberOfChildren ? data.numberOfChildren : ''}
    Ages: ${data.ageOfChildren !== null && data.ageOfChildren}
    Cooking: ${
      data?.requiredSkills?.filter((e) => e.code == 'CAN_COOK') ? 'Yes' : 'No'
    }
    Travel: ${
      data?.requiredSkills?.filter((e) => e.code == 'WILLING_TO_TRAVEL')
        ? 'Yes'
        : 'No'
    }
    Driver: ${
      data?.requiredSkills?.filter((e) => e.code == 'CAN_DRIVE') ? 'Yes' : 'No'
    }
    Pets: ${data.pets ? data.pets : ''}
    PostCode: ${data.postcode !== null && data.postcode}
    WorkDays: ${allDays}
    Time: ${
      moment(data?.startTime, 'HH:mm:ss').format('hh:mm A') + ' '
    } ${moment(data?.finishTime, 'HH:mm:ss').format('hh:mm A')}
    Salary: ${data.salary !== null && data.salary}
    Photo: ${data.photo ? data.photo : ''}
    Notes: ${data.notes !== null && data.notes}
  `;

  // const copyText = async () => {
  //   try {
  //     await navigator.clipboard.writeText(copyItem);
  //     toast.success('Copied', { autoClose: 1500 });
  //   } catch (err) {
  //     console.log('err to copy', err);
  //   }
  // };

  const copyText = () => {
    copyToClipboard(copyItem).then(() => {
      setCopy(true);
      const copyData = setTimeout(() => {
        setCopy(false);
      }, 1000);
      return () => clearTimeout(copyData);
    });
  };

  const handleOpenImage = (image) => {
    if (image !== undefined) {
      setOpenImage(true);
      setImage(image);
    }
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  return (
    <>
      <div className="profile-card-modal">
        <div>
          <div className="d-flex justify-content-center align-items-center mt-4 pt-4 cursor-pointer">
            <div onClick={() => handleOpenImage(user?.photo)}>
              <JobAvtar user={user} status={user?.status} />
            </div>
          </div>
          <div className="text-center username pt-2">{data.name}</div>
          <div className="text-center pt-1" style={{ fontSize: '15px' }}>
            {data.area}
          </div>
          <div className="text-center user-nationality pt-1">
            {data.nationality}
          </div>
          <div>
            <div
              className="d-flex align-items-center justify-content-center pb-1"
              style={{ color: '#708090' }}
            >
              {rating.length > 0 ? (
                <>
                  {rating?.map((e) => {
                    return (
                      e?.displayText.split(' ')[0] +
                      ' ' +
                      '(' +
                      e?.displayText.split(' ').slice(1).join(' ') +
                      ')'
                    );
                  })}
                </>
              ) : (
                <>
                  {star?.map((e) => {
                    return (
                      e?.displayText.split(' ')[0] +
                      ' ' +
                      '(' +
                      e?.displayText.split(' ').slice(1).join(' ') +
                      ')'
                    );
                  })}
                </>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center mt-2 d-none">
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/emoji/48/angry-face-emoji--v2.png"
                alt="angry-face-emoji--v2"
              />
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/emoji/48/frowning-face.png"
                alt="frowning-face"
              />
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/emoji/48/face-with-diagonal-mouth-emoji.png"
                alt="face-with-diagonal-mouth-emoji"
              />
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/emoji/48/slightly-smiling-face.png"
                alt="slightly-smiling-face"
              />
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/emoji/48/grinning-face-with-big-eyes--v2.png"
                alt="grinning-face-with-big-eyes--v2"
              />
            </div>
          </div>
        </div>
        {/* <div
          className="user-fav text-center mt-3 mb-3 m-auto d-flex align-items-center justify-content-center"
          style={{ width: '65%' }}
        >
          <div>{positions}</div>
        </div> */}
        <hr className="divider" />
        <div className="d-flex bts">
          <div className="thumb-icon mx-2">
            <FaRegThumbsDown
              style={{ fontSize: '20px', cursor: 'pointer' }}
              // onClick={() => handleSubmit(!data?.blacklist)}
            />
          </div>
          {data?.blacklist == true && (
            <div className="thumb-icon mx-2 text-dark">
              <FaThumbsDown
                style={{ fontSize: '20px', cursor: 'pointer' }}
                // onClick={() => handleSubmit(!data?.blacklist)}
              />
            </div>
          )}

          <div className="dropdown mx-2">
            <button
              className="rating-btn btn dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Rating
            </button>
            <ul
              className="dropdown-menu"
              style={{ textAlign: 'start', borderRadius: '10px' }}
              aria-labelledby="dropdownMenuButton1"
            >
              {ratings.length > 0 &&
                ratings.map((e, index) => {
                  return (
                    <li key={index}>
                      <a
                        onClick={() => handleRating(e.code)}
                        className="dropdown-item cursor-pointer"
                      >
                        {e.displayText}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="dropdown mx-1">
            <button onClick={copyText} className="advance-btn">
              {copy ? (
                'Copied!'
              ) : (
                <>
                  <span>Copy</span>
                  <img src={Copy} className="pt-0" />
                </>
              )}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-3 divider" />
        <div className="container">
          <Status status={user?.status} />
        </div>
      </div>
      <AttachImageModal
        openImage={openImage}
        handleCloseImage={handleCloseImage}
        image={image}
      />
    </>
  );
};

export default UserModalProfile;
