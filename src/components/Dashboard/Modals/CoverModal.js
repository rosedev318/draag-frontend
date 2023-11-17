import { Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  getCategory,
  updateCover
} from '../../../Redux/Actions/CategoryAction';
import { getJob } from '../../../Redux/Actions/CategoryAction';
import Dropzone from 'react-dropzone';

const CoverModal = (props) => {
  const { openCover, handleCloseCover, job, file, setFile } = props;
  const [filedata, setFiledata] = useState('');

  const dispatch = useDispatch();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    // boxShadow: 24,
    width: 350,
    // height: 400,
    px: 4,
    // height: '300px',
    outline: 'none'
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
      // setImages(URL.createObjectURL(event.target.files[0]));
      setFiledata(event.target.files[0]);
    }
  };

  const handlePhoto = () => {
    const form = new FormData();
    form.append('photoFile', filedata);
    dispatch(updateCover(job.id, form));
    handleCloseCover();
  };

  return (
    <div
      className="main-attach-modal"
      style={{ height: '561px' }}
    >
      <div className="d-flex justify-content-center align-items-center position-relative">
        Attach
        <CloseIcon
          className="cursor-pointer"
          sx={{ width: 16, height: 16, position: 'absolute', right: '15px' }}
          onClick={() => handleCloseCover()}
        />
      </div>
      <div className="attach-main pt-3 px-2">
        <span className="fw-bold" style={{ fontSize: '15px' }}>
          Attach a file from your computer
        </span>
        <div className="mb-2 mt-3">
          <div className="image-drop">
            <div className="drop-cover text-center d-flex justify-content-center align-items-center">
              <Dropzone
                onDrop={(acceptedFiles) => {
                  setFile(URL.createObjectURL(acceptedFiles[0]));
                  setFiledata(acceptedFiles[0]);
                }}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="fs-6">Drag and drop files here</div>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
        <label for="file-upload" className="custom-file-upload mt-3">
          Choose a file
        </label>
        <div className="fw-bold pt-4">Uploaded Files</div>
        <div className="pt-3">
          {file && <img src={file} className="cover-image" />}
          {!file && job.photo && (
            <img src={job.photo} className="cover-image" />
          )}
        </div>
        <div className="d-flex justify-content-end gap-2 pt-4 pb-3">
          <button
            className="cancelattach-btn"
            onClick={() => handleCloseCover()}
          >
            Cancel
          </button>
          <button className="insertbtn-attach" onClick={() => handlePhoto()}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverModal;
