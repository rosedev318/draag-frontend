import React, { useEffect, useState } from 'react';
import Input from '../../components/input/Input';
import {
  Avatar,
  Box,
  Checkbox,
  FormHelperText,
  InputAdornment,
  ListItemText,
  MenuItem
} from '@mui/material';
import './Userform.css';
import { useDispatch } from 'react-redux';
import {
  createJobs,
  getJobsLivings,
  getJobsPositions,
  getJobsSkills,
  getJobsStatus,
  getJobsWorks
} from '../../Redux/Actions/JobsAction';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import DateField from '../../components/input/DateField';
import TimeField from '../../components/input/TimeField';
import dayjs from 'dayjs';
import { AccessTime } from '@mui/icons-material';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import SelectField from '../../components/input/SelectField';
import {
  enabledAgencyUsers,
  userProfile
} from '../../Redux/Actions/AgencyAction';
import moment from 'moment';
import days from '../../constants/days';
import { useLocation, useNavigate } from 'react-router-dom';
import { getJob, updateJob } from '../../Redux/Actions/CategoryAction';
import passport from '../../constants/passport';
import MultiSelectField from '../../components/input/MultiSelectField';

const Jobform = () => {
  const dispatch = useDispatch();
  const initialValues = {
    fullName: '',
    email: '',
    mobilenumber: '',
    area: '',
    address: '',
    postcode: '',
    profession: '',
    noc: '',
    aoc: '',
    pet: '',
    positions: [],
    works: [],
    livings: [],
    days: [],
    skills: [],
    stime: '',
    etime: '',
    salary: '',
    fee: '',
    sdate: '',
    snpmonths: '',
    snpsdate: '',
    statuses: '',
    passport: [],
    notes: '',
    users: [],
    trial: ''
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const positions = useSelector((state) => state.Jobs.positions);
  const works = useSelector((state) => state.Jobs.works);
  const livings = useSelector((state) => state.Jobs.livings);
  const skills = useSelector((state) => state.Jobs.skills);
  const statuses = useSelector((state) => state.Jobs.statuses);
  const defaultAgency = useSelector(
    (state) => state?.Agency?.user?.defaultAgency?.id
  );
  const users = useSelector((state) => state?.Agency?.enableUser);
  const job = useSelector((state) => state.Category.job);
  const [files, setFiles] = useState([]);
  const [dataFile, setDataFile] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    dispatch(getJobsPositions());
    dispatch(getJobsWorks());
    dispatch(getJobsLivings());
    dispatch(getJobsSkills());
    dispatch(getJobsStatus());
    dispatch(userProfile());
  }, []);

  useEffect(() => {
    if (defaultAgency) {
      dispatch(enabledAgencyUsers(defaultAgency));
    }
  }, [defaultAgency]);

  useEffect(() => {
    if (state?.id) {
      dispatch(getJob(state?.id));
    }
  }, [state?.id]);

  useEffect(() => {
    const positionsArr =
      job?.necessaryPositions && job?.necessaryPositions.map((e) => e.code);
    const workArr = job?.works && job?.works.map((e) => e.code);
    const livingArr = job?.livings && job?.livings.map((e) => e.code);
    const dayArr = job?.days && job?.days.map((e) => e.code);
    const skillArr =
      job?.requiredSkills && job?.requiredSkills.map((e) => e.code);
    const userArr = job?.assignees && job?.assignees.map((e) => e.id);
    if (state?.id && state?.edit) {
      setFormValues({
        fullName: job?.name,
        email: job?.email,
        mobilenumber: job?.phoneNumber,
        area: job?.area,
        address: job?.address,
        postcode: job?.postcode,
        profession: job?.profession,
        noc: job?.numberOfChildren,
        aoc: job?.ageOfChildren?.map((e) => e),
        pet: job?.pet,
        positions: positionsArr,
        works: workArr,
        livings: livingArr,
        days: dayArr,
        skills: skillArr,
        stime: job?.startTime,
        etime: job?.finishTime,
        salary: job?.salary,
        fee: job?.fee,
        sdate: job?.startDate,
        snpsdate: moment(job?.safetyNetPeriodStartAt).format('YYYY-MM-DD'),
        snpmonths: job?.safetyNetPeriod,
        statuses: job?.status?.code,
        passport:
          job?.visaStatus != undefined || null
            ? job?.visaStatus?.split(',')
            : [],
        notes: job?.notes,
        users: userArr,
        trial: job?.trial?.nanny?.id
      });
      if (job?.photo) {
        setDataFile([job?.photo]);
      } else {
        setFiles(files);
      }
    }
  }, [state?.id, state?.edit, job]);

  const handleChange = (e, type = null, fieldName = null) => {
    if (type == 'time') {
      let value = moment(new Date(e)).format('hh:mm:ss');
      setFormValues({ ...formValues, [fieldName]: value });
    }
    if (type == 'date') {
      let value = moment(new Date(e)).format('YYYY-MM-DD');
      setFormValues({ ...formValues, [fieldName]: value });
    }
    if (type == 'radio') {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      if (e && e.type) {
        const { type } = e.target;
        if (type == 'checkbox') {
          const { name, checked, value } = e.target;
          let positionArr = [...formValues.positions];
          let workArr = [...formValues.works];
          let livingArr = [...formValues.livings];
          let skillArr = [...formValues.skills];
          let userArr = [...formValues.users];
          let dayArr = [...formValues.days];

          if (name == 'positions') {
            if (checked) {
              positionArr.push(value);
            } else {
              positionArr = positionArr.filter((val) => val !== value);
            }
          } else if (name == 'works') {
            if (checked) {
              workArr.push(value);
            } else {
              workArr = workArr.filter((val) => val !== value);
            }
          }
          if (name == 'livings') {
            if (checked) {
              livingArr.push(value);
            } else {
              livingArr = livingArr.filter((val) => val !== value);
            }
          } else if (name == 'skills') {
            if (checked) {
              skillArr.push(value);
            } else {
              skillArr = skillArr.filter((val) => val !== value);
            }
          }
          if (name == 'users') {
            if (checked) {
              userArr.push(value);
            } else {
              userArr = userArr.filter((val) => val !== value);
            }
          } else if (name == 'days') {
            if (checked) {
              dayArr.push(value);
            } else {
              dayArr = dayArr.filter((val) => val !== value);
            }
          }

          setFormValues({
            ...formValues,
            positions: positionArr,
            works: workArr,
            livings: livingArr,
            days: dayArr,
            skills: skillArr,
            users: userArr
          });

          // if (isSubmit) {
          //   setFormErrors(validate({ ...formValues, [name]: value }));
          // }
        } else {
          if (type == 'multiple') {
            const { name, value } = e.target;
            setFormValues({
              ...formValues,
              [name]: typeof value === 'string' ? value.split(',') : value
            });
          } else {
            const { name, value } = e.target;
            setFormValues({ ...formValues, [name]: value });
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isSubmit) {
      setFormErrors(validate(formValues));
    }
  }, [formValues]);

  const validate = (value) => {
    const errors = {};
    if (!value.fullName) {
      errors.fullName = 'Full Name is required!';
    }
    if (!value.area) {
      errors.area = 'Area is required!';
    }
    if (!value.address) {
      errors.address = 'Address is required!';
    }
    if (value.positions.length < 1) {
      errors.positions = 'Position is required!';
    }
    if (value.works.length < 1) {
      errors.works = 'Works is required!';
    }
    if (value.livings.length < 1) {
      errors.livings = 'Livings is required!';
    }
    if (value.days.length < 1) {
      errors.days = 'Days is required!';
    }

    if (value.salary === '') {
      errors.salary = 'Salary is required!';
    }
    if (!value.sdate) {
      errors.sdate = 'Start Date is required!';
    }
    if (!value.notes) {
      errors.notes = 'Notes is required!';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const errors = validate(formValues);

    const positions = formValues?.positions.toString();
    const works = formValues?.works.toString();
    const livings = formValues?.livings.toString();
    const skills = formValues?.skills.toString();
    const users = formValues?.users.toString();
    const days = formValues?.days.toString();
    const passport = formValues?.passport.toString();

    const form = new FormData();
    form.append('name', formValues.fullName);
    if (formValues?.email?.length > 0) {
      form.append('email', formValues.email);
    }
    if (formValues?.mobilenumber?.length > 0) {
      form.append('phoneNumber', formValues.mobilenumber);
    }
    if (formValues?.area?.length > 0) {
      form.append('area', formValues.area);
    }
    form.append('address', formValues.address);
    if (formValues?.postcode?.length > 0) {
      form.append('postcode', formValues.postcode);
    }
    if (formValues?.profession?.length > 0) {
      form.append('profession', formValues.profession);
    }
    if (formValues?.noc?.length > 0) {
      form.append('numberOfChildren', formValues.noc);
    }
    if (formValues?.aoc?.length > 0) {
      form.append('ageOfChildren', formValues.aoc);
    }
    if (
      typeof files[0] != 'string' &&
      files[0] != undefined &&
      files?.length > 0
    ) {
      form.append('photoFile', files[0]);
    }
    if (formValues?.pet?.length > 0) {
      form.append('pet', formValues.pet);
    }
    form.append('requiredSkills', skills);
    form.append('necessaryPositions', positions);
    form.append('works', works);
    form.append('days', days);
    form.append('livings', livings);
    if (formValues?.stime?.length > 0) {
      form.append('startTime', formValues.stime);
    }
    if (formValues?.etime?.length > 0) {
      form.append('finishTime', formValues.etime);
    }
    if (formValues?.snpsdate !== 'Invalid date') {
      form.append('safetyNetPeriodStartAt', formValues.snpsdate);
    }
    form.append('status', formValues.statuses);
    if (passport?.length > 0) {
      form.append('visaStatus', passport);
    }
    if (formValues?.salary?.length >= 0) {
      form.append('salary', formValues.salary);
    }
    if (formValues?.fee?.length > 0) {
      form.append('fee', formValues.fee);
    }
    if (formValues?.snpmonths?.length > 0) {
      form.append('safetyNetPeriod', formValues.snpmonths);
    }
    form.append('startDate', formValues.sdate);
    if (formValues?.notes?.length > 0) {
      form.append('notes', formValues.notes);
    }
    if (users?.length > 0) {
      form.append('userIds', users);
    }
    if (formValues?.trial?.length > 0) {
      form.append('trialNannyId', formValues.trial);
    }

    if (Object.keys(errors).length === 0) {
      if (state?.edit) {
        dispatch(updateJob(state?.id, form)).then((res) => {
          if (res?.status === 200) {
            if (state?.savecard) {
              navigate('/');
            } else {
              navigate('/clients');
            }
          }
        });
      } else {
        dispatch(createJobs(form, navigate));
      }
    }
  };

  return (
    <Box
      component="main"
      style={{ backgroundColor: 'white' }}
      sx={{ flexGrow: 1, p: 3 }}
    >
      <div style={{ paddingTop: '20px' }} className="">
        <form onSubmit={handleSubmit}>
          <div className="userform m-auto text-black">
            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  name="fullName"
                  className="w-100"
                  error={formErrors.fullName}
                  helperText={formErrors.fullName}
                  value={formValues.fullName}
                  onChange={handleChange}
                  size="small"
                  label={formErrors.fullName ? 'Full name' : 'Full name'}
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  name="email"
                  className="w-100"
                  value={formValues.email}
                  onChange={handleChange}
                  size="small"
                  label="Email"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  name="mobilenumber"
                  className="w-100"
                  value={formValues.mobilenumber}
                  onChange={handleChange}
                  size="small"
                  label="Phone Number"
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  name="area"
                  className="w-100"
                  error={formErrors.area}
                  helperText={formErrors.area}
                  value={formValues.area}
                  onChange={handleChange}
                  size="small"
                  label="Area"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  name="address"
                  className="w-100"
                  error={formErrors.address}
                  helperText={formErrors.address}
                  value={formValues.address}
                  onChange={handleChange}
                  size="small"
                  label="Address"
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  name="postcode"
                  className="w-100"
                  value={formValues.postcode}
                  onChange={handleChange}
                  size="small"
                  label="Postcode"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  name="profession"
                  className="w-100"
                  value={formValues.profession}
                  onChange={handleChange}
                  size="small"
                  label="Profession"
                />
              </div>
              <div className="col">
                <Input
                  type="number"
                  name="noc"
                  className="w-100"
                  value={formValues.noc}
                  onChange={handleChange}
                  size="small"
                  label="Number of children"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  name="aoc"
                  className="w-100"
                  value={formValues.aoc}
                  onChange={handleChange}
                  size="small"
                  label="Age of children (separate by comma)"
                />
              </div>
              <div className="col">
                <Input
                  type="text"
                  name="pet"
                  className="w-100"
                  value={formValues.pet}
                  onChange={handleChange}
                  size="small"
                  label="Pet"
                />
              </div>
            </div>
            <div className="w-100 userform-check mt-5">
              <div className="">
                <div className="form-text">Needed position</div>
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
                    <div className="text-danger">{formErrors.positions}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 userform-check mt-3">
              <div>
                <div className="form-text">Work type</div>
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
            <div className="w-100 userform-check mt-3">
              <div className="">
                <div className="form-text">Living</div>
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
            <div className="w-100 userform-check mt-3">
              <div className="">
                <div className="form-text">Number of days</div>
                <div className="container">
                  <div className="row">
                    {days[0] &&
                      days.map((data, index) => {
                        return (
                          <label
                            key={index}
                            className="container col-12 col-lg-4 col-xl-4 "
                          >
                            <div>
                              <input
                                name="days"
                                value={data.code}
                                checked={formValues?.days?.includes(data?.code)}
                                type="checkbox"
                                onChange={(e) => handleChange(e, data.code)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mx-2">{data.name}</div>
                          </label>
                        );
                      })}
                    <div className="text-danger">{formErrors.days}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 userform-check mt-3">
              <div>
                <div className="form-text">Required skills</div>
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
                                value={data.code}
                                checked={formValues?.skills?.includes(
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
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="form-text">Photo</div>
              <div className="image-drop">
                <div className="drop1 text-center d-flex justify-content-center align-items-center">
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setFiles(acceptedFiles);
                      setDataFile([]);
                      // setEnable(true);
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
                  {job?.photo &&
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
            <div className="row mt-3">
              <div className="col">
                <TimeField
                  edit={state?.edit}
                  label="Start Time"
                  className="w-100"
                  name="stime"
                  value={dayjs(formValues.stime, 'HH:mm')}
                  // value={moment(formValues.stime)}
                  onChange={(e) => handleChange(e, 'time', 'stime')}
                  // defaultValue={moment(formValues.stime)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: false,
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTime
                              className="fs-5"
                              style={{ color: '#E7E7E7' }}
                            />
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                />
              </div>
              <div className="col">
                <TimeField
                  edit={state?.edit}
                  label="End Time"
                  className="w-100"
                  name="etime"
                  onChange={(e) => handleChange(e, 'time', 'etime')}
                  value={dayjs(formValues.etime, 'HH:mm')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: false,
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTime
                              className="fs-5"
                              style={{ color: '#E7E7E7' }}
                            />
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Input
                  type="text"
                  name="salary"
                  className="w-100"
                  error={formErrors.salary}
                  helperText={formErrors.salary}
                  value={formValues.salary}
                  onChange={handleChange}
                  size="small"
                  label="Salary"
                />
              </div>
              <div className="col">
                <Input
                  type="number"
                  name="fee"
                  className="w-100"
                  value={formValues.fee}
                  onChange={handleChange}
                  size="small"
                  label="Fee"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <DateField
                  edit={state?.edit}
                  type="date"
                  name="sdate"
                  className="w-100"
                  value={dayjs(formValues.sdate)}
                  onChange={(e) => handleChange(e, 'date', 'sdate')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: formErrors.sdate ? true : false,
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
                  size="small"
                  label="Start Date"
                />
                <FormHelperText>{formErrors.sdate}</FormHelperText>
              </div>
              <div className="col">
                <Input
                  type="number"
                  name="snpmonths"
                  className="w-100"
                  value={formValues.snpmonths}
                  onChange={handleChange}
                  size="small"
                  label="Safety net period (months)"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <DateField
                  edit={state?.edit}
                  type="date"
                  name="snpsdate"
                  className="w-100"
                  value={dayjs(formValues.snpsdate)}
                  onChange={(e) => handleChange(e, 'date', 'snpsdate')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: false,
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
                  size="small"
                  label="Safety net period start date"
                />
              </div>
              <div className="col">
                <SelectField
                  name="statuses"
                  value={formValues.statuses}
                  onChange={handleChange}
                  className="w-100"
                  size="small"
                  label="Status"
                  // error={formErrors.statuses}
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
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <MultiSelectField
                  multiple
                  name="passport"
                  value={formValues.passport}
                  onChange={(e) => handleChange(e, 'multiple')}
                  renderValue={(selected) => selected && selected?.join(', ')}
                  size="small"
                  label="Visa Status(Passport)"
                  className="w-100"
                >
                  {passport.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={
                          formValues?.passport &&
                          formValues?.passport?.indexOf(name) > -1
                        }
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MultiSelectField>
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
                  label="Notes"
                  name="notes"
                />
              </div>
            </div>
            {state?.edit &&
            (formValues.statuses == 'TRIAL' ||
              formValues.statuses == 'CHECKS') ? (
              <div className="w-100  mt-3">
                <div>
                  <div className="form-text">Trial Nanny</div>
                  <div className="pt-2">
                    <div className="row">
                      {job.assignments[0] &&
                        job.assignments.map((data, index) => {
                          return (
                            <div className="col-12 col-lg-4 col-md-4 col-xl-4">
                              <label key={index} className="cursor-pointer">
                                <div className="d-flex gap-2 pb-1">
                                  <input
                                    name="trial"
                                    checked={formValues.trial === data.nanny.id}
                                    value={data.nanny.id}
                                    type="radio"
                                    className="form-check-input"
                                    // id={data.nanny.id}
                                    onChange={(e) => handleChange(e, 'radio')}
                                  />
                                  <div className="d-flex gap-2">
                                    <Avatar
                                      src={data?.nanny?.photo}
                                      sx={{ width: 24, height: 24 }}
                                    />
                                    <div>{data.nanny.name}</div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="w-100 userform-check mt-3">
              <div>
                <div className="form-text">Assigned job to user(s)</div>
                <div className="container pt-2">
                  <div className="row row-cols-12 row-cols-lg-3">
                    {users[0] &&
                      users.map((data, index) => {
                        return (
                          <label key={index} className="container">
                            <div className="d-flex gap-2 pb-1">
                              <input
                                name="users"
                                value={data.id}
                                checked={formValues?.users?.includes(data?.id)}
                                type="checkbox"
                                onChange={(e) => handleChange(e, data.id)}
                              />
                              <span className="checkmark"></span>
                              <div className="d-flex gap-2 mx-2">
                                <Avatar
                                  src={data?.profileImageUrl}
                                  sx={{ width: 24, height: 24 }}
                                />
                                <div>{data.fullName}</div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <button className="search-button w-100">
                {state?.edit ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default Jobform;
