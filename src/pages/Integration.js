import './Integration.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import {InsertLinkOutlined, SwapHoriz} from '@mui/icons-material';
import Input from '../components/input/Input';
import IOSSwitch from '../components/Switch/IOSSwitch';
import { useDispatch } from 'react-redux';
import { userProfile } from '../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import { updateCalendly } from '../Redux/Actions/CalenderAction';
import { Divider, Box, Modal, Grid, Typography, Button, Drawer } from '@mui/material';

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
  const [connectDrawerVisible, setConnectDrawerVisible] = useState(false);
  const initialValues = { calendlyToken: '', calendlyUrl: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const defaultAgency = useSelector(
    (state) => state?.Agency?.user?.defaultAgency
  );

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
        setConnectDrawerVisible(false);
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
            <div className='inte-main'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <div className='inte-card'>
                  <div className='inte-img'>
                    <img
                      height={45}
                      width={45}
                      className="object-fit-cover"
                      src={require('.././Images/round-img.png')}
                    />
                  </div>
                  <p className="title-head mt-10px">Calendly</p>
                  <p className="title-sub">
                    Integrate Calendly actions with your sign up flow.{' '}
                  </p>
                  <Divider className='mx-m-9px' />
                  <div className='mt-8px d-flex justify-between items-center'>
                    <Button
                      className='text-unset'
                      variant="outlined"
                      onClick={() => {setConnectDrawerVisible(true)}}
                      sx={{color: '#333', borderColor: '#333'}}
                    >
                      <SwapHoriz />
                      Connect
                    </Button>
                    <Drawer
                      anchor={'right'}
                      open={connectDrawerVisible}
                      onClose={() => {setConnectDrawerVisible(false)}}
                    >
                      <div className='drawer-container'>
                        <div className="">
                          <div className="d-flex justify-content-center mb-2 align-items-center">
                            <div className="small-img">
                              <img
                                height={35}
                                width={35}
                                className="object-fit-cover img-link"
                                src={require('../Images/smalllogo.png')}
                              />
                            </div>
                            <div>
                              <InsertLinkOutlined
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
                              {/* <button className="work-btn">
                                <InfoOutlinedIcon className="mx-1" />
                                How it works
                              </button> */}
                            </div>
                            <div className="d-flex justify-content-evenly">
                              <button
                                className="cancel-btn mx-2"
                                onClick={() => {setConnectDrawerVisible(false)}}
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
                    </Drawer>
                    <IOSSwitch />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className='inte-card'>
                  <div className='inte-img'>
                    <img
                      height={45}
                      width={45}
                      className="object-fit-cover"
                      src={require('.././Images/chek-img.png')}
                    />
                  </div>
                  <p className="title-head mt-10px">Respond.io</p>
                  <p className="title-sub">
                    With just one click you are all set with respond.io
                  </p>
                  <Divider className='mx-m-9px' />
                  <div className='mt-8px d-flex justify-between items-center'>
                    <Button className='text-unset' variant="outlined" sx={{color: '#333', borderColor: '#333'}}>
                      <SwapHoriz />
                      Connect
                    </Button>
                    <IOSSwitch />
                  </div>
                </div>
              </Grid>
            </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integration;
