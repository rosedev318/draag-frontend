import './Integration.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import Input from '../components/input/Input';
import { useDispatch } from 'react-redux';
import { userProfile } from '../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import { updateCalendly } from '../Redux/Actions/CalenderAction';
import { Box, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const Integration = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const initialValues = { calendlyToken: '', calendlyUrl: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const defaultAgency = useSelector(
    (state) => state?.Agency?.user?.defaultAgency
  );

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsSubmit(false);
    setFormErrors({});
    setFormValues(initialValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (isSubmit) {
      setFormErrors(validate({ ...formValues, [name]: value }));
    }
  };

  useEffect(() => {
    dispatch(userProfile());
  }, []);

  const createCalendly = () => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      dispatch(
        updateCalendly(defaultAgency?.id, {
          name: defaultAgency?.name,
          calendlyToken: formValues.calendlyToken,
          calendlySchedulingUrl: formValues.calendlyUrl,
          enabled: true,
          visible: true
        })
      ).then(() => {
        setModalVisible(false);
        setFormValues(initialValues);
      });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.calendlyToken) {
      errors.calendlyToken = 'Calendly Token is required!';
    }
    if (!values.calendlyUrl) {
      errors.calendlyUrl = 'Calendly Url is required!';
    }

    return errors;
  };

  return (
    <>
      <div
        className="w-100 m-auto vh-100 position-relative main-integration"
        style={{ paddingTop: '110px' }}
      >
        <div className="">
          <div className="title-main">
            <p className="inte-title">Integrations and connected apps</p>
            <p className="inte-subtitle">
              Supercharge your workflow and connect the tools you use every day
            </p>
          </div>
          <div className="w-100">
            <div className="color-row">
              <div className="inte-main mt-5 d-flex justify-content-between align-items-center ">
                <div className="d-flex align-items-center">
                  <div className="">
                    <img
                      height={30}
                      width={50}
                      src={require('.././Images/chek-img.png')}
                    />
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ paddingLeft: '12px' }}
                  >
                    <span className="title-head">Respond.io</span>
                    <span className="title-sub">
                      With just one click you are all set with respond.io{' '}
                    </span>
                  </div>
                </div>
                <div className="inte-two d-flex align-items-center">
                  <div className="learn-more-text mx-3">Learn more</div>
                  <div>
                    <button className="connected-btn">
                      <CheckCircleOutlineIcon className="mx-2" />
                      Connected
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="inte-main mt-4 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="">
                  <img
                    height={45}
                    width={45}
                    className="object-fit-cover"
                    src={require('.././Images/round-img.png')}
                  />
                </div>
                <div
                  className="d-flex flex-column"
                  style={{ paddingLeft: '14px' }}
                >
                  <span className="title-head">Calendly</span>
                  <span className="title-sub">
                    Integrate Calendly actions with your sign up flow.{' '}
                  </span>
                </div>
              </div>
              <div className="inte-two d-flex align-items-center">
                <div className="learn-more-text mx-3">Learn more</div>
                <div>
                  <button
                    // data-bs-toggle="modal"
                    // data-bs-target="#exampleModal"
                    className="connect-btn"
                    onClick={() => handleOpenModal()}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={modalVisible}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="model-main">
            <div className="modal-new">
              <div className="modal-content-new">
                <div>
                  <div className="">
                    <div className="mt-5 d-flex justify-content-center mb-2 align-items-center">
                      <div className="small-img">
                        <img
                          height={35}
                          width={35}
                          className="object-fit-cover img-link"
                          src={require('../Images/smalllogo.png')}
                        />
                      </div>
                      <div>
                        <InsertLinkOutlinedIcon
                          style={{ color: '#ADAEB1' }}
                          className="mx-2"
                        />
                      </div>
                      <div className="small-img">
                        <img
                          height={35}
                          width={35}
                          className="object-fit-cover img-link"
                          src={require('../Images/round-img.png')}
                        />
                      </div>
                    </div>
                    <p className="d-flex justify-content-center align-items-center modal-title mt-2 mb-4">
                      Connect Draag to Calendly
                    </p>
                    <div className="mx-4">
                      <div className="mb-3">
                        <Input
                          value={formValues.calendlyToken}
                          onChange={handleChange}
                          type="text"
                          name="calendlyToken"
                          className="w-100"
                          size="small"
                          error={formErrors.calendlyToken}
                          helperText={formErrors.calendlyToken}
                          label={
                            formErrors.calendlyToken
                              ? 'Calendly API Token'
                              : 'Calendly API Token'
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <Input
                          value={formValues.calendlyUrl}
                          onChange={handleChange}
                          type="text"
                          name="calendlyUrl"
                          className="w-100"
                          size="small"
                          error={formErrors.calendlyUrl}
                          helperText={formErrors.calendlyUrl}
                          label={
                            formErrors.calendlyUrl
                              ? 'Calendly Scheduling URL'
                              : 'Calendly Scheduling URL'
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <p className="dragg-check-head pb-0 mb-0">
                          Draag would like to
                        </p>
                        <div className="mt-2">
                          <div className="d-flex align-items-center mt-1 pb-2">
                            <div className="modal-check">
                              <input
                                type="checkbox"
                                id="checkbox5"
                                defaultChecked
                                disabled
                              />
                              <label htmlFor="checkbox5"></label>
                            </div>
                            <div className="mt-1 check-text">
                              Access basic company information and details.
                            </div>
                          </div>
                          <div className="d-flex align-items-center mt-1 pb-2">
                            <div className="modal-check">
                              <input
                                type="checkbox"
                                id="checkbox6"
                                defaultChecked
                                disabled
                              />
                              <label htmlFor="checkbox6"></label>
                            </div>
                            <div className="mt-1 check-text">
                              Access calendar
                            </div>
                          </div>
                          <div className="d-flex align-items-center mt-1 pb-2">
                            <div className="modal-check">
                              <input
                                type="checkbox"
                                id="checkbox7"
                                defaultChecked
                                disabled
                              />
                              <label htmlFor="checkbox7"></label>
                            </div>
                            <div className="mt-1 check-text">
                              Open and resolve blah blah blah
                            </div>
                          </div>
                        </div>
                        <div className="policy-text mt-3">
                          We care about your privacy in our{' '}
                          <span className="policy-small">Privacy policy</span>.
                          By clicking Allow access, you authorise Draag to
                          access your information.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="buttons-bottom">
                    <div className="d-flex justify-content-between mt-5 mx-2">
                      <div>
                        <button className="work-btn">
                          <InfoOutlinedIcon className="mx-1" />
                          How it works
                        </button>
                      </div>
                      <div className="d-flex justify-content-evenly">
                        <button
                          className="cancel-btn mx-2"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="modal-connected-btn"
                          onClick={() => createCalendly()}
                        >
                          Allow access
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Integration;
