import React, { useEffect, useState } from 'react';
import './Userform.css';
import { Box } from '@mui/system';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Dropzone from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import SelectField from '../../components/input/SelectField';
import { FormHelperText, InputAdornment, MenuItem } from '@mui/material';
import gender from '../../constants/gender';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAvailabilities,
  getLanguages,
  getLivings,
  getPositions,
  getQuaSkills,
  getStatuses,
  getWorks,
  getsingleNanny,
  nanniesForm,
  nanniesUpdateForm
  // nanniesForm
} from '../../Redux/Actions/NanniesAction';
import DateField from '../../components/input/DateField';
import languageRating from '../../constants/languageRating';
// const FormData1 = require('form-data');
// const fs = require('fs');
import Check from '../../Images/circle_check_dark.svg';
import CheckSuccess from '../../Images/circle_check_green.svg';
import dayjs from 'dayjs';
import moment from 'moment';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';

function Userform(props) {
  const { screenOpen } = props;
  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    area: '',
    city: '',
    postcode: '',
    mobilenumber: '',
    email: '',
    age: '',
    dob: '',
    nationality: '',
    gender: '',
    passport: '',
    availabilty: '',
    interviewAvailability: '',
    currentjob: '',
    notes: '',
    works: [],
    livings: [],
    statuses: '',
    skills: [],
    positions: []
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const [enable, setEnable] = useState(false);

  const [files, setFiles] = useState([]);
  const [dataFile, setDataFile] = useState([]);

  const [inputselect, setInputselect] = useState([
    { language: '', languageRate: '' }
  ]);

  const data = useSelector((state) => state.Nannies.singleNanny);
  const availabilities = useSelector((state) => state.Nannies.availabilities);
  const languages = useSelector((state) => state.Nannies.languages);
  const works = useSelector((state) => state.Nannies.works);
  const livings = useSelector((state) => state.Nannies.livings);
  const statuses = useSelector((state) => state.Nannies.statuses);
  const skills = useSelector((state) => state.Nannies.qskills);
  const positions = useSelector((state) => state.Nannies.positions);

  let edit = state?.edit;

  useEffect(() => {
    dispatch(getAvailabilities());
    dispatch(getLanguages());
    dispatch(getWorks());
    dispatch(getLivings());
    dispatch(getStatuses());
    dispatch(getQuaSkills());
    dispatch(getPositions());
  }, []);

  const handleInput = (e, index) => {
    setEnable(true);
    const { name, value } = e.target;
    const list = [...inputselect];
    list[index][name] = value;
    setInputselect(list);
  };

  const handleAddClick = () => {
    setInputselect([...inputselect, { language: '', languageRate: '' }]);
  };

  useEffect(() => {
    if (state?.id) {
      dispatch(getsingleNanny(state?.id));
    }
  }, [state?.id]);

  useEffect(() => {
    const positionsArr = data.positions && data.positions.map((e) => e.code);
    const skillsArr =
      data.qualifiedSkills && data.qualifiedSkills.map((e) => e.code);
    if (state?.id && state?.edit) {
      setFormValues({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        address2: data.address2,
        area: data.area,
        city: data.city,
        postcode: data.postcode,
        mobilenumber: data.phoneNumber,
        email: data.email,
        age: data.age,
        dob: data.dateOfBirth,
        nationality: data.nationality,
        gender: data.sex?.name,
        currentjob: data.currentJob,
        statuses: data.status?.code,
        availabilty: data.availability,
        passport: data.visaStatus,
        notes: data.notes,
        works:
          data.works &&
          data.works.map((e) => {
            return e.code;
          }),
        livings:
          data.livings &&
          data.livings.map((e) => {
            return e.code;
          }),
        interviewAvailability:
          data.interviewAvailability &&
          data.interviewAvailability.map((e) => {
            return e.code;
          }),
        positions: positionsArr,
        skills: skillsArr
      });
      if (data.photo) {
        setDataFile([data.photo]);
      } else {
        setFiles(files);
      }
      setInputselect(
        data.languages &&
          data.languages.map((language) => ({
            language: language.language.code,
            languageRate: language.rating
          }))
      );
    }
  }, [state?.id, state?.edit, data]);

  const handleChange = (e, type = null, fieldName = null) => {
    setEnable(true);
    if (type == 'date') {
      let value = moment(new Date(e)).format('YYYY-MM-DD');

      setFormValues({ ...formValues, [fieldName]: value });
    } else {
      const { type } = e.target;

      if (type == 'checkbox') {
        const { name, checked, value } = e.target;

        let positionArr = [...formValues.positions];
        let skillArr = [...formValues.skills];
        let workArr = [...formValues.works];
        let livingArr = [...formValues.livings];

        if (name == 'skills') {
          if (checked) {
            skillArr.push(value);
          } else {
            skillArr = skillArr.filter((val) => val !== value);
          }
        } else if (name == 'positions') {
          if (checked) {
            positionArr.push(value);
          } else {
            positionArr = positionArr.filter((val) => val !== value);
          }
        }

        if (name == 'works') {
          if (checked) {
            workArr.push(value);
          } else {
            workArr = workArr.filter((val) => val !== value);
          }
        } else if (name == 'livings') {
          if (checked) {
            livingArr.push(value);
          } else {
            livingArr = livingArr.filter((val) => val !== value);
          }
        }

        setFormValues({
          ...formValues,
          skills: skillArr,
          positions: positionArr,
          works: workArr,
          livings: livingArr
        });
      } else {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        if (isSubmit) {
          setFormErrors(validate({ ...formValues, [name]: value }));
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const errors = validate(formValues);

    // if (Object.keys(errors).length === 0) {
    //   navigate('/bio', {
    //     state: { formValues, inputselect, files, id: state?.id, edit }
    //   });
    // }

    const positions = formValues?.positions.toString();
    const works = formValues?.works.toString();
    const livings = formValues?.livings.toString();
    const skills = formValues?.skills.toString();
    const form = new FormData();

    if (formValues?.firstName?.length > 0) {
      form.append('firstName', formValues.firstName);
    }
    if (formValues?.lastName?.length > 0) {
      form.append('lastName', formValues.lastName);
    }
    if (formValues?.gender?.length > 0) {
      form.append('sex', formValues.gender);
    }
    if (formValues?.email?.length > 0) {
      form.append('email', formValues.email);
    }
    if (formValues?.mobilenumber?.length > 0) {
      form.append('phoneNumber', formValues.mobilenumber);
    }
    if (formValues?.age?.length > 0) {
      form.append('age', formValues.age);
    }
    if (formValues?.address?.length > 0) {
      form.append('address', formValues.address);
    }
    if (formValues?.address2?.length > 0) {
      form.append('address2', formValues.address2);
    }
    if (formValues?.area?.length > 0) {
      form.append('area', formValues.area);
    }
    if (formValues?.city?.length > 0) {
      form.append('city', formValues.city);
    }
    if (formValues?.postcode?.length > 0) {
      form.append('postcode', formValues.postcode);
    }
    if (formValues?.availabilty?.length > 0) {
      form.append('availability', formValues.availabilty);
    }
    if (formValues?.interviewAvailability?.length > 0) {
      form.append('interviewAvailability', formValues?.interviewAvailability);
    }
    if (formValues?.passport?.length > 0) {
      form.append('visaStatus', formValues.passport);
    }
    if (formValues?.nationality?.length > 0) {
      form.append('nationality', formValues.nationality);
    }

    form.append('qualifiedSkills', skills);
    form.append('positions', positions);
    form.append('works', works);
    form.append('livings', livings);

    if (formValues?.statuses?.length > 0) {
      form.append('status', formValues.statuses);
    }
    if (formValues?.dob?.toString()?.length > 0) {
      form.append('dateOfBirth', formValues?.dob?.toString());
    }
    if (formValues?.currentjob?.length > 0) {
      form.append('currentJob', formValues.currentjob);
    }
    if (formValues?.notes?.length > 0) {
      form.append('notes', formValues.notes);
    }

    if (
      typeof files[0] != 'string' &&
      files[0] != undefined &&
      files?.length > 0
    ) {
      form.append('photoFile', files[0]);
    }
    if (inputselect?.length > 0) {
      let lang = '';
      let lanRating = '';
      inputselect?.forEach((e, i) => {
        if (i == 0) {
          lang = e.language;
          lanRating = e.languageRate;
        } else {
          lang = lang + ',' + e.language;
          lanRating = lanRating + ',' + e.languageRate;
        }
      });
      form.append('languages', lang);
      form.append('languageRatings', lanRating);
    }

    if (Object.keys(errors).length === 0) {
      if (edit) {
        dispatch(nanniesUpdateForm(state?.id, form));
        navigate('/bio', { state: { id: state?.id, edit: true } });
      } else {
        dispatch(nanniesForm(form, navigate));
      }
    }
  };

  const validate = (value) => {
    const errors = {};
    if (!value.firstName) {
      errors.firstName = 'First Name is required!';
    }

    if (!value.dob) {
      errors.dob = 'Date of birth is required!';
    }

    if (!value.age) {
      errors.age = 'Age is required!';
    } else if (value.age < 18) {
      errors.age = 'Age is greater or equal to 18';
    }

    return errors;
  };

  return (
    <>
      <Box
        component="main"
        style={{ backgroundColor: 'white' }}
        sx={{ flexGrow: 1, p: 3 }}
      >
        <div className={!screenOpen ? 'sticky-head-sopen' : 'sticky-head'}>
          <div className="d-flex justify-content-between align-items-center">
            {edit ? (
              <>
                <div style={{ paddingTop: 70 }} className="">
                  <div className="d-flex align-items-center">
                    <KeyboardDoubleArrowLeftIcon
                      onClick={() =>
                        navigate('/profile', { state: { id: state?.id } })
                      }
                    />
                    <ChevronLeftIcon
                      onClick={() =>
                        navigate('/profile', { state: { id: state?.id } })
                      }
                    />
                    &nbsp; <span className="back">Back to&nbsp;</span>{' '}
                    <span className="back-profile">Profile</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ paddingTop: 70 }}>
                  <div
                    onClick={() => navigate('/candidate')}
                    style={{ textDecoration: 'none' }}
                    className="d-flex align-items-center"
                  >
                    <KeyboardDoubleArrowLeftIcon />
                    <ChevronLeftIcon style={{ color: '#060505' }} />
                    &nbsp; <span className="back">Back to&nbsp;</span>{' '}
                    <span className="back-profile">Candidates</span>
                  </div>
                </div>
              </>
            )}

            <div
              className="d-flex justify-content-center align-items-center "
              style={{ marginTop: 70, backgroundColor: 'white' }}
            >
              <button
                onClick={handleSubmit}
                className="save-btn"
                disabled={!enable}
              >
                <img src={enable ? CheckSuccess : Check} />
                Save
              </button>
              &nbsp; &nbsp;
              <ChevronRightIcon
                onClick={() =>
                  navigate('/bio', {
                    state: { id: state?.id, edit: true }
                  })
                }
              />
              <KeyboardDoubleArrowRightIcon
                onClick={() =>
                  navigate('/docs', {
                    state: { id: state?.id, edit: true }
                  })
                }
              />
            </div>
          </div>
          <hr
            style={{
              marginLeft: '-25px',
              marginRight: '-25px',
              color: '#A1A1A1'
            }}
          />
        </div>
        <div style={{ paddingTop: '50px' }} className="container">
          <div className="userform m-auto text-black">
            {/* name */}

            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  name="firstName"
                  className="w-100"
                  error={formErrors.firstName}
                  helperText={formErrors.firstName}
                  value={formValues.firstName}
                  onChange={handleChange}
                  size="small"
                  label={formErrors.firstName ? 'First Name' : 'First Name'}
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  name="lastName"
                  className="w-100"
                  error={formErrors.lastName}
                  helperText={formErrors.lastName}
                  value={formValues.lastName}
                  onChange={handleChange}
                  size="small"
                  label={formErrors.lastName ? 'Last Name' : 'Last Name'}
                />
              </div>
            </div>

            {/* address */}
            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  name="address"
                  error={formErrors.address}
                  helperText={formErrors.address}
                  value={formValues.address}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.address ? 'Address' : 'Address'}
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  name="address2"
                  error={formErrors.address2}
                  helperText={formErrors.address2}
                  value={formValues.address2}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.address2 ? 'Address 2' : 'Address 2'}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <Input
                  name="postcode"
                  className="w-100"
                  error={formErrors.postcode}
                  helperText={formErrors.postcode}
                  value={formValues.postcode}
                  size="small"
                  type="text"
                  onChange={handleChange}
                  label={formErrors.postcode ? 'Postcode' : 'Postcode'}
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  error={formErrors.area}
                  helperText={formErrors.area}
                  value={formValues.area}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.area ? 'Area' : 'Area'}
                  name="area"
                />
              </div>
            </div>

            {/* city postcode */}

            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  error={formErrors.city}
                  helperText={formErrors.city}
                  value={formValues.city}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.city ? 'City' : 'City'}
                  name="city"
                />

                <div className="invalid-feedback"></div>
              </div>
              <div className="col">
                {/* <div className="form-text">Mobile Number(optional)</div> */}
                <Input
                  type="text"
                  error={formErrors.mobilenumber}
                  helperText={formErrors.mobilenumber}
                  value={formValues.mobilenumber}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={
                    formErrors.address2 ? 'Mobile number' : 'Mobile number'
                  }
                  name="mobilenumber"
                />
              </div>
            </div>

            {/* Mobile number Email */}

            <div className="row mt-3 ">
              <div className="col">
                <Input
                  type="email"
                  name="email"
                  error={formErrors.email}
                  helperText={formErrors.email}
                  value={formValues.email}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.email ? 'Email' : 'Email'}
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  error={formErrors.age}
                  helperText={formErrors.age}
                  value={formValues.age}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.age ? 'Age' : 'Age'}
                  name="age"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <DateField
                  edit={edit}
                  type="date"
                  className="w-100"
                  name="dob"
                  value={dayjs(formValues.dob)}
                  onChange={(e) => handleChange(e, 'date', 'dob')}
                  label="Date of Birth"
                  defaultValue={formValues.dob}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: formErrors.dob ? true : false,
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <InsertInvitationIcon
                              className="fs-5"
                              style={{ color: '#E7E7E7' }}
                            />
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                  inputVariant="outlined"
                  helperText={formErrors.dob}
                />
                <FormHelperText>{formErrors.dob}</FormHelperText>
              </div>
              <div className="col">
                <Input
                  type="nationality"
                  error={formErrors.nationality}
                  helperText={formErrors.nationality}
                  value={formValues.nationality}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.nationality ? 'Nationality' : 'Nationality'}
                  name="nationality"
                />
              </div>
            </div>

            {/* gender */}
            <div className="row mt-3">
              <div className="col">
                <SelectField
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                  className="w-100"
                  error={formErrors.gender}
                  label={formErrors.gender ? 'Gender' : 'Gender'}
                  size="small"
                >
                  {gender?.map((key, index) => {
                    return (
                      <MenuItem key={index} value={key?.value}>
                        {key?.label}
                      </MenuItem>
                    );
                  })}
                </SelectField>
                <FormHelperText>{formErrors.gender}</FormHelperText>
              </div>
              <div className="col">
                <Input
                  type="text"
                  error={formErrors.availabilty}
                  helperText={formErrors.availabilty}
                  value={formValues.availabilty}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.availabilty ? 'Availabilty' : 'Availabilty'}
                  name="availabilty"
                />
              </div>
            </div>

            {/* status */}
            <div className="row mt-3 ">
              <div className="col">
                <Input
                  type="text"
                  error={formErrors.currentjob}
                  helperText={formErrors.currentjob}
                  value={formValues.currentjob}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={formErrors.currentjob ? 'Current Job' : 'Current Job'}
                  name="currentjob"
                />
              </div>
              <div className="col">
                <SelectField
                  name="statuses"
                  value={formValues.statuses}
                  onChange={handleChange}
                  className="w-100"
                  size="small"
                  label={formErrors.statuses ? 'Statuses' : 'Statuses'}
                  error={formErrors.statuses}
                >
                  {statuses[0] &&
                    statuses.map((key, index) => {
                      return (
                        <MenuItem key={index} value={key?.code}>
                          {key?.name}
                        </MenuItem>
                      );
                    })}
                </SelectField>
                <FormHelperText>{formErrors.statuses}</FormHelperText>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <SelectField
                  name="interviewAvailability"
                  value={formValues.interviewAvailability}
                  onChange={handleChange}
                  className="w-100"
                  size="small"
                  label={
                    formErrors.interviewAvailability
                      ? 'Interview Availability'
                      : 'Interview Availability'
                  }
                  error={formErrors.interviewAvailability}
                >
                  {availabilities[0] &&
                    availabilities.map((key, index) => {
                      return (
                        <MenuItem key={index} value={key?.code}>
                          {key?.name}
                        </MenuItem>
                      );
                    })}
                </SelectField>
                <FormHelperText>
                  {formErrors.interviewAvailability}
                </FormHelperText>
              </div>
              <div className="col">
                <Input
                  type="passport"
                  error={formErrors.passport}
                  helperText={formErrors.passport}
                  value={formValues.passport}
                  className="w-100"
                  size="small"
                  onChange={handleChange}
                  label={
                    formErrors.passport
                      ? 'Visa Status(Passport)'
                      : 'Visa Status(Passport)'
                  }
                  name="passport"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 ">
                <Input
                  type="text"
                  error={formErrors.notes}
                  helperText={formErrors.notes}
                  value={formValues.notes}
                  className="w-100"
                  size="small"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  label={formErrors.notes ? 'Notes' : 'Notes'}
                  name="notes"
                />
              </div>
            </div>

            <div className="w-100 userform-check mt-5">
              <div className="">
                <div className="form-text">Works</div>
                <div className="container">
                  <div className="row">
                    {works[0] &&
                      works.map((data, index) => {
                        return (
                          <label
                            key={index}
                            className="container col-12 col-lg-4 col-xl-4"
                          >
                            <div>
                              <input
                                name="works"
                                value={data.code}
                                checked={formValues?.works?.includes(
                                  data?.code
                                )}
                                type="checkbox"
                                onChange={(e) => handleChange(e, data.code)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mx-2">{data.name}</div>
                          </label>
                        );
                      })}
                    <div className="text-danger">{formErrors.works}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 userform-check mt-5">
              <div className="">
                <div className="form-text">Livings</div>
                <div className="container">
                  <div className="row">
                    {livings[0] &&
                      livings.map((data, index) => {
                        return (
                          <label key={index} className="container col-12 ">
                            <div>
                              <input
                                name="livings"
                                value={data.code}
                                checked={formValues?.livings?.includes(
                                  data?.code
                                )}
                                type="checkbox"
                                onChange={(e) => handleChange(e, data.code)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mx-2">{data.name}</div>
                          </label>
                        );
                      })}
                    <div className="text-danger">{formErrors.livings}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 userform-check mt-5">
              <div className="">
                <div className="form-text">Positions</div>
                <div className="container">
                  <div className="row">
                    {positions[0] &&
                      positions.map((data, index) => {
                        return (
                          <label
                            key={index}
                            className="container col-12 col-lg-4 col-xl-4"
                          >
                            <div>
                              <input
                                name="positions"
                                value={data.code}
                                checked={formValues?.positions?.includes(
                                  data.code
                                )}
                                type="checkbox"
                                onChange={(e) => handleChange(e, data.code)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mx-2">{data.name}</div>
                          </label>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 userform-check mt-5">
              <div className="">
                <div className="form-text">Skills</div>
                <div className="container">
                  <div className="row">
                    {skills[0] &&
                      skills.map((data, index) => {
                        return (
                          <label
                            key={index}
                            className="container col-12 col-lg-4 col-xl-4"
                          >
                            <div>
                              <input
                                name="skills"
                                value={data?.code}
                                type="checkbox"
                                checked={formValues?.skills?.includes(
                                  data?.code
                                )}
                                onChange={(e) => handleChange(e, data?.code)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mx-2">{data.name}</div>
                          </label>
                        );
                      })}
                    <div className="text-danger">{formErrors.skills}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="form-text">Photo</div>
              <div className="image-drop">
                <div className="drop1 text-center d-flex justify-content-center align-items-center">
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setFiles(acceptedFiles);
                      setDataFile([]);
                      setEnable(true);
                    }}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropzone">
                          <div className="drop-icon m-auto">
                            <img src={require('../../Images/Download.jpg')} />
                          </div>
                          <div className="upload-head-text py-2">Upload</div>
                          <p className="upload-head-sub">
                            or drops file to upload
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="drop2">
                  {files &&
                    files?.map((file) => (
                      <div key={file.name}>
                        <img src={URL.createObjectURL(file)} />
                      </div>
                    ))}
                  {data.photo &&
                    dataFile.length > 0 &&
                    dataFile.map((e) => {
                      return (
                        <div key={e.name}>
                          <img src={e} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mt-4">
              {inputselect &&
                inputselect.map((data, i) => {
                  return (
                    <div key={i} className="row">
                      <div className="form-text pb-1">Languages</div>
                      <div className="col arrow-select">
                        <SelectField
                          name="language"
                          value={data?.language}
                          onChange={(e) => handleInput(e, i)}
                          className="w-100"
                          size="small"
                          label={formErrors.language ? 'Language' : 'Language'}
                          error={formErrors.language}
                        >
                          {languages[0] &&
                            languages.map((key, index) => {
                              return (
                                <MenuItem key={index} value={key?.code}>
                                  {key?.name}
                                </MenuItem>
                              );
                            })}
                        </SelectField>
                        <FormHelperText>{formErrors.language}</FormHelperText>
                      </div>
                      <div className="col">
                        <SelectField
                          name="languageRate"
                          value={data.languageRate}
                          onChange={(e) => handleInput(e, i)}
                          className="w-100"
                          size="small"
                          label={formErrors.languageRate ? 'Level' : 'Level'}
                          error={formErrors.languageRate}
                        >
                          {languageRating &&
                            languageRating.map((key, index) => {
                              return (
                                <MenuItem key={index} value={key?.value}>
                                  {key.label}
                                </MenuItem>
                              );
                            })}
                        </SelectField>
                        <FormHelperText>
                          {formErrors.languageRate}
                        </FormHelperText>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div onClick={handleAddClick} className="addrow-text mt-3">
              + Add one more language
            </div>
            <div style={{ paddingTop: '250px', cursor: 'default' }}></div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Userform;
