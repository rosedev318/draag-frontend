import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import Copy from '../../Images/ copy.svg';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import AttachImageModal from '../Dashboard/Modals/AttachImageModal';

const UserProfile = (props) => {
  const {
    data,
    star,
    positions,
    handleRating,
    handleSubmit,
    ratings,
    copyText,
    copy,
    open
  } = props;

  const [openImage, setOpenImage] = useState(false);
  const [image, setImage] = useState('');

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
      <div>
        <div>
          <div className="d-flex justify-content-center mt-3 cursor-pointer">
            <Avatar
              src={data.photo}
              sx={{ width: 92, height: 92 }}
              onClick={() => handleOpenImage(data?.photo)}
            />
          </div>
          <div className="text-center username">{data.firstName}</div>
          <div className="text-center user-nationality">{data.nationality}</div>
          <div>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ color: '#708090' }}
            >
              {star?.map((e) => {
                return (
                  e?.displayText?.split(' ')[0] +
                  ' ' +
                  '(' +
                  e?.displayText?.split(' ').slice(1).join(' ') +
                  ')'
                );
              })}
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
        <div
          className="user-fav text-center mt-3 mb-3 m-auto d-flex align-items-center justify-content-center"
          style={{ width: '65%' }}
        >
          <div>{positions}</div>
        </div>
        <hr className="divider" />
        <div className="d-flex bts">
          {data?.blacklist == false && (
            <div className="thumb-icon mx-2">
              <FaRegThumbsDown
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => handleSubmit(!data?.blacklist)}
              />
            </div>
          )}
          {data?.blacklist == true && (
            <div className="thumb-icon mx-2 text-dark">
              <FaThumbsDown
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => handleSubmit(!data?.blacklist)}
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
              {ratings?.length > 0 &&
                ratings?.map((e, index) => {
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
              {/* {copy ? 'Copied!' : 'Copy'} */}
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
      </div>
      {!open && (
        <AttachImageModal
          openImage={openImage}
          handleCloseImage={handleCloseImage}
          image={image}
        />
      )}
    </>
  );
};

export default UserProfile;
