import { Box, Divider } from '@mui/material';
import '../Profile/Document.css';
import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { BsDownload } from 'react-icons/bs';
import Dropzone from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getsingleNanny,
  nanniesFiles
} from '../../Redux/Actions/NanniesAction';
import Check from '../../Images/circle_check_dark.svg';
import CheckSuccess from '../../Images/circle_check_green.svg';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function Document(props) {
  const { screenOpen } = props;
  const [enable, setEnable] = useState(false);
  const [doc, setDoc] = useState([]);
  const [doc2, setdoc2] = useState([]);

  const [cv, setCv] = useState([]);
  const [cv2, setCv2] = useState([]);

  const data = useSelector((state) => state.Nannies.singleNanny);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.id) {
      dispatch(getsingleNanny(state?.id));
    }
  }, [state?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    if (doc2?.length > 0) {
      for (let i = 0; i < doc2.length; i++) {
        if (typeof doc2[i] != 'string') {
          form.append('documentFiles', doc2[i]);
        }
      }
    }

    if (cv2?.length > 0) {
      if (typeof cv2[0] !== 'string' && cv2[0] != undefined) {
        form.append('cvFile', cv2[0]);
      }
    }

    if (state?.edit) {
      dispatch(nanniesFiles(state?.id, form));
      navigate('/candidate');
    } else {
      dispatch(nanniesFiles(state?.id, form));
      navigate('/candidate');
    }
  };

  useEffect(() => {
    if (state?.id) {
      setDoc(
        data?.documents &&
          data?.documents?.map((e) => {
            return { name: e?.url };
          })
      );

      if (data?.cv != null) {
        setCv([{ name: data?.cv }]);
      }
    }
  }, [state?.id, data]);

  return (
    <>
      <Box
        component="main"
        style={{ backgroundColor: 'white' }}
        sx={{ flexGrow: 1, p: 3 }}
      >
        <div>
          <div
            className={!screenOpen ? 'sticky-head-sopen' : 'sticky-head'}
            style={{ marginTop: '-31px' }}
          >
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ paddingTop: 30 }}
            >
              <div className="">
                <KeyboardDoubleArrowLeftIcon
                  className="mb-1"
                  onClick={() =>
                    navigate('/profile', { state: { id: state?.id } })
                  }
                />
                <ChevronLeftIcon
                  className="mb-1"
                  onClick={() =>
                    navigate('/bio', {
                      state: { id: state?.id, edit: true }
                    })
                  }
                />
                &nbsp; <span className="back">Back to&nbsp;</span>{' '}
                <span className="back-profile">History</span>
              </div>

              <button
                className="save-btn"
                disabled={!enable}
                onClick={handleSubmit}
              >
                <img src={enable ? CheckSuccess : Check} />
                Save
              </button>
            </div>

            <hr
              style={{
                marginLeft: '-25px',
                marginRight: '-30px',
                color: '#A1A1A1'
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div
              className="doc_main m-auto pb-3"
              style={{ paddingTop: '80px' }}
            >
              <div className="upload-title py-2">Upload Files</div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-3 ">
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setDoc([...doc, acceptedFiles]);
                      setdoc2(acceptedFiles);
                      setEnable(true);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="img-drop">
                          <div className="drop d-flex flex-column justify-content-center align-items-center">
                            <div className="drop-icon">
                              <img src={require('../../Images/Download.jpg')} />
                            </div>
                            <div className="drop_txt">
                              Drag and drop your files here
                            </div>
                            <span className="text-second">
                              10MB max file size
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <p className="pt-2">Upload Document Files</p>
                </div>

                <div className="col-12 col-md-6 col-xl-3 drop-single drop-md">
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setCv([acceptedFiles]);
                      setCv2(acceptedFiles);
                      setEnable(true);
                    }}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="img-drop">
                          <div className="drop d-flex flex-column justify-content-center align-items-center">
                            <div className="drop-icon">
                              <img src={require('../../Images/Download.jpg')} />
                            </div>
                            <div className="drop_txt">
                              Drag and drop your files here
                            </div>
                            <span className="text-second">
                              10MB max file size
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <p className="pt-2">Upload CV File</p>
                </div>
              </div>

              <div className="documents">
                <h4 className="fw-bold">Documents</h4>
                <div className="d-flex justify-content-between my-3">
                  <div className="bold">Onboarding</div>
                  <div className="text-second">Last Updated 24.12.2022</div>
                </div>
                {doc &&
                  doc?.map((file, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between mt-4">
                        <div className="d-flex">
                          <InsertDriveFileIcon className="text-primary me-2" />
                          <div className="bold">
                            {Array.isArray(file)
                              ? file[0].name
                              : file?.name?.split('/')[
                                  file?.name?.split('/').length - 1
                                ]}
                          </div>
                        </div>
                        <div className="fs-4 text-second">
                          <BsDownload />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Divider />
                      </div>
                    </div>
                  ))}

                {cv &&
                  cv?.map((file, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between mt-4">
                        <div className="d-flex">
                          <InsertDriveFileIcon className="text-primary me-2" />
                          <div className="bold">
                            {Array.isArray(file)
                              ? file[0].name
                              : file?.name?.split('/')[3]}
                          </div>
                        </div>
                        <div className="fs-4 text-second">
                          <BsDownload />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Divider />
                      </div>
                    </div>
                  ))}

                <div className="mt-3 bold text-primary fs-5 mb-4">
                  Download files (.zip)
                  <ArrowDownwardIcon className="fs-4" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </>
  );
}

export default Document;
