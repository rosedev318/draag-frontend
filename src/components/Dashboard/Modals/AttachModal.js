import { Box, Divider, Fade, Popover, Popper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './AttachModal.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import {
  createAttachment,
  getAttachment,
  getSingleAttachment,
  updateAttachment
} from '../../../Redux/Actions/CategoryAction';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';

const AttachModal = (props) => {
  const {
    jobId,
    handleCloseAttach,
    editAttachment,
    attachmentId,
    openAttach,
    elementRef,
    anchorElAttach,
    placementAttach,
    setOpenAttach
  } = props;
  const initialValues = { url: '', title: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [file, setFile] = useState([]);
  const [filedata, setFiledata] = useState([]);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const attach = useSelector((state) => state.Category.attachment);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 20 * 1000 * 1024) {
        toast.error('File with maximum size of 20MB is allowed');
        setError(true);
        setFile([]);
        setFiledata([]);
      } else {
        setError(false);
        setFile(URL.createObjectURL(event.target.files[0]));
        setFiledata(event.target.files);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const addAttach = () => {
    const form = new FormData();
    if (filedata?.length > 0) {
      form.append('file', filedata[0]);
    } else {
      form.append('url', formValues.url);
    }
    form.append('title', formValues.title);

    if (!error) {
      if (editAttachment) {
        dispatch(updateAttachment(jobId, attachmentId, form)).then(() => {
          setFiledata([]);
          setFile([]);
          setFormValues(initialValues);
          handleCloseAttach();
          dispatch(getAttachment(jobId));
        });
      } else {
        dispatch(createAttachment(jobId, form)).then(() => {
          setFiledata([]);
          setFile([]);
          setFormValues(initialValues);
          handleCloseAttach();
          dispatch(getAttachment(jobId));
        });
      }
    } else {
      toast.error('File with maximum size of 20MB is allowed');
    }
  };

  useEffect(() => {
    if (editAttachment) {
      dispatch(getSingleAttachment(jobId, attachmentId));
    }
  }, []);

  useEffect(() => {
    if (attach && editAttachment) {
      setFormValues({
        url: attach?.url,
        title: attach?.title
      });
      setFile([attach?.url]);
    }
  }, [editAttachment, attach]);

  return (
    <div className='d-flex h-100'>
      <div className='flex-1 modal-opacity' onClick={handleCloseAttach}></div>
      <div className="main-attach-modal">
        <div className="d-flex justify-content-center align-items-center position-relative">
          <span style={{ fontSize: '14px' }}>Attach</span>
          <CloseIcon
            className="cursor-pointer"
            sx={{ width: 16, height: 16, position: 'absolute', right: '15px' }}
            onClick={() => handleCloseAttach()}
          />
        </div>
        <div className="attach-main pt-3">
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
          <input id="file-upload" type="file" onChange={onImageChange} />
          <Divider className="mt-3 mb-3" />
          <div className="text-input-attach">Search or paste a link</div>
          <input
            type="text"
            className="attach-input mt-1"
            placeholder="Find recent links or paste a new link"
            onChange={handleChange}
            value={formValues.url}
            name="url"
          />
          <div className="text-input-attach pt-3">Display text (optional)</div>
          <input
            type="text"
            className="attach-input mt-1"
            placeholder="Text to Display"
            onChange={handleChange}
            value={formValues.title}
            name="title"
          />
          <div className="pt-3">
            {file?.length > 0 && (
              <div>
                <img
                  src={file}
                  style={{
                    height: '150px',
                    width: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2 pt-4">
            <button
              className="cancelattach-btn"
              onClick={() => {
                handleCloseAttach();
              }}
            >
              Cancel
            </button>
            <button className="insertbtn-attach" onClick={() => addAttach()}>
              {editAttachment ? 'Save' : 'Insert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachModal;
