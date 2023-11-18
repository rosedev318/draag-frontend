import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import '../Profile/Bio.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import DateField from '../../components/input/DateField';
import { FormHelperText, InputAdornment } from '@mui/material';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {
  getPositions,
  getSkills,
  getsingleNanny,
  nanniesUpdateExtraForm
} from '../../Redux/Actions/NanniesAction';
import { useDispatch, useSelector } from 'react-redux';
import Check from '../../Images/circle_check_dark.svg';
import CheckSuccess from '../../Images/circle_check_green.svg';
import moment from 'moment/moment';
import dayjs from 'dayjs';
import Dropzone from 'react-dropzone';
import { BsDownload } from 'react-icons/bs';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function Bio(props) {
  const { screenOpen } = props;
  const { state } = useLocation();
  const [enable, setEnable] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    bio: '',
    skills: []
  };

  const data = useSelector((state) => state.Nannies.singleNanny);
  const positions = useSelector((state) => state.Nannies.positions);
  const skills = useSelector((state) => state.Nannies.skills);

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [inputEmp, setInputEmp] = useState([
    {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      position: [],
      reffile: [],
      id: ''
    }
  ]);

  const [inputEdu, setInputEdu] = useState([
    {
      name: '',
      qualification: '',
      graduatedAt: '',
      startDate: '',
      endDate: '',
      description: '',
      id: ''
    }
  ]);

  const handleInputEmp = (e, index, type = 'text', fieldName = null) => {
    setEnable(true);
    let list = [...inputEmp];

    if (type == 'file') {
      list[index].reffile = e;
    } else if (type == 'date') {
      let value = moment(new Date(e)).format('YYYY-MM-DD');
      list[index][fieldName] = value;
    } else {
      const { name, value, checked, type } = e.target;

      list[index][name] = value;

      if (type)
        if (checked) {
          list[index].position.push(value);
        } else {
          list[index].position = list[index].position.filter(
            (val) => val !== value
          );
        }
    }

    setInputEmp(list);
    if (isSubmit) {
      const { value } = e.target;
      setFormErrors(validate({ [fieldName]: value }));
    }
  };

  const handleInputEdu = (e, index, type = 'text', fieldName = null) => {
    setEnable(true);
    const list = [...inputEdu];
    if (type == 'date') {
      let value = moment(new Date(e)).format('YYYY-MM-DD');
      list[index][fieldName] = value;
    } else {
      const { name, value } = e.target;

      list[index][name] = value;
    }
    setInputEdu(list);
  };

  const handleAddClickEmp = () => {
    setInputEmp([
      ...inputEmp,
      {
        id: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        position: [],
        reffile: [],
        refContact: ''
      }
    ]);
  };

  const handleAddClickEdu = () => {
    setInputEdu([
      ...inputEdu,
      {
        id: '',
        name: '',
        qualification: '',
        graduatedAt: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleChange = (e) => {
    setEnable(true);

    const { name, checked, value, type } = e.target;
    if (type == 'checkbox') {
      let skillArr = [...formValues.skills];

      if (name == 'skills') {
        if (checked) {
          skillArr.push(value);
        } else {
          skillArr = skillArr.filter((val) => val !== value);
        }
      }
      setFormValues({
        ...formValues,
        skills: skillArr
      });
    } else {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputEmp));
    setIsSubmit(true);
    const errors = validate(inputEmp);
    const form = new FormData();

    if (formValues?.bio?.length > 0) {
      form.append('bio', formValues.bio);
    }

    if (formValues?.skills?.length > 0) {
      formValues.skills.forEach((e) => {
        form.append('skills', e);
      });
    }

    if (inputEmp.length > 0) {
      // let newEmpData = inputEmp.filter(
      //   (o1) => !data?.employmentHistories?.some((o2) => o1.id === o2.id)
      // );

      inputEmp.forEach((e, i) => {
        if (
          e.position?.length > 0 ||
          e.name?.length > 0 ||
          e.startDate?.length > 0 ||
          e.endDate?.length > 0 ||
          e.description?.length > 0 ||
          e.reffile?.length > 0 ||
          e.refContact?.length > 0
        ) {
          form.append(`employmentHistories[${i}].id`, e.id);
          form.append(`employmentHistories[${i}].employerName`, e.name);
          form.append(`employmentHistories[${i}].positions`, e.position);
          form.append(`employmentHistories[${i}].startDate`, e.startDate);
          form.append(`employmentHistories[${i}].endDate`, e.endDate);
          form.append(`employmentHistories[${i}].description`, e.description);
          form.append(
            `employmentHistories[${i}].referenceContactInfo`,
            e.refContact
          );

          if (e.reffile[0]?.path) {
            form.append(
              `employmentHistories[${i}].referenceFile`,
              e.reffile[0]
            );
          } else {
            form.append(
              `employmentHistories[${i}].referenceUrl`,
              e.reffile[0]?.name
            );
          }
        }
      });
    }

    if (inputEdu.length > 0) {
      if (
        e.name?.length > 0 ||
        e.qualification?.length > 0 ||
        e.graduatedAt?.length > 0 ||
        e.startDate?.length > 0 ||
        e.endDate?.length > 0 ||
        e.description?.length > 0
      ) {
        inputEdu.forEach((e, i) => {
          form.append(`educations[${i}].id`, e.id);
          form.append(`educations[${i}].major`, e.name);
          form.append(`educations[${i}].qualificationType`, e.qualification);
          form.append(`educations[${i}].graduatedAt`, e.graduatedAt);
          form.append(`educations[${i}].startDate`, e.startDate);
          form.append(`educations[${i}].endDate`, e.endDate);
          form.append(`educations[${i}].description`, e.description);
        });
      }
      // let newEduData = inputEdu.filter(
      //   (o1) => !data?.educations?.some((o2) => o1.id == o2.id)
      // );

      // console.log('---education data', newEduData);
    }

    if (Object.keys(errors).length === 0) {
      if (state?.edit) {
        dispatch(nanniesUpdateExtraForm(state?.id, form));
        navigate('/docs', { state: { id: state?.id, edit: true } });
      } else {
        dispatch(nanniesUpdateExtraForm(state?.id, form));
        navigate('/docs', { state: { id: state?.id } });
      }
    }
  };

  const validate = () => {
    const errors = {};
    inputEmp.forEach((e, i) => {
      if (e.name.length > 0 && !e.startDate) {
        errors[i + 'date'] = 'startDate is required!';
      }
      if (e.name.length > 0 && e.position.length == 0) {
        errors[i + 'position'] = 'Position is required!';
      }
    });

    return errors;
  };

  useEffect(() => {
    dispatch(getPositions());
    dispatch(getSkills());
  }, []);

  useEffect(() => {
    if (state?.id) {
      dispatch(getsingleNanny(state?.id));
    }
  }, [state?.id]);

  useEffect(() => {
    const skillsArr = data.skills && data.skills.map((e) => e.code);
    if (state?.id && state?.edit) {
      setFormValues({
        bio: data?.bio,
        skills: skillsArr
      });
      if (data?.employmentHistories?.length > 0) {
        setInputEmp(
          data?.employmentHistories.map((e) => ({
            position:
              e.positions &&
              e.positions.map((item) => {
                return item.code;
              }),
            name: e.employerName,
            startDate: e.startDate,
            endDate: e.endDate,
            description: e.description,
            id: e.id,
            reffile: [{ name: e.referenceUrl }],
            refContact: e.referenceContactInfo
          }))
        );
      }

      setInputEdu(
        data?.educations &&
          data?.educations?.map((e) => ({
            name: e.major,
            qualification: e.qualificationType,
            graduatedAt: e.graduatedAt,
            startDate: e.startDate,
            endDate: e.endDate,
            description: e.description,
            id: e.id
          }))
      );
    }
  }, [state?.id, state?.edit, data]);

  useEffect(() => {
    console.log('inputEmp', inputEmp, data?.employmentHistories);
  }, [inputEmp, data]);

  return (
    <>
      <Box
        component="main"
        style={{ backgroundColor: 'white' }}
        sx={{ flexGrow: 1, p: 3 }}
      >
        <div>
          <div className={!screenOpen ? 'sticky-head-sopen' : 'sticky-head'}>
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ paddingTop: 70 }} className="">
                <div className="d-flex align-items-center">
                  <KeyboardDoubleArrowLeftIcon
                    onClick={() =>
                      navigate('/profile', { state: { id: state?.id } })
                    }
                  />
                  <ChevronLeftIcon
                    onClick={() =>
                      navigate('/userdetail', {
                        state: { id: state?.id, edit: true }
                      })
                    }
                  />
                  &nbsp;
                  <span className="back">Back to&nbsp;</span>{' '}
                  <span className="back-profile">Edit Profile</span>
                </div>
              </div>

              <div
                className="d-flex justify-content-center align-items-center"
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
                    navigate('/docs', {
                      state: { id: state?.id, edit: state?.edit && true }
                    })
                  }
                />
                <KeyboardDoubleArrowRightIcon
                  onClick={() =>
                    navigate('/docs', { state: { id: state?.id } })
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
          <div style={{ paddingTop: '110px' }} className="container">
            <div className="bio_main m-auto">
              {/* bio card1 */}

              <div>
                <Accordion
                  className=""
                  defaultExpanded={true}
                  style={{ backgroundColor: 'white' }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: 'white', paddingLeft: '0px' }}
                  >
                    <h4 className="text-bold1">Bio</h4>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ backgroundColor: 'white', paddingLeft: '0px' }}
                  >
                    <div className="mb-3" style={{ backgroundColor: 'white' }}>
                      <Input
                        className="w-100"
                        onChange={handleChange}
                        name="bio"
                        value={formValues.bio}
                        label={formErrors.bio ? 'Enter Bio' : 'Enter Bio'}
                        id="exampleFormControlTextarea1"
                        rows="3"
                        multiline
                        error={formErrors.bio}
                        helperText={formErrors.bio}
                      />

                      <div className="invalid-feedback">{formErrors.bio}</div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>

              {inputEmp &&
                inputEmp.map((data, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="mt-3 txt">
                        <h4 className="text-bold1">Employment History</h4>
                        <div className="row mt-3">
                          <div className="col">
                            <Input
                              type="text"
                              name="name"
                              className="w-100"
                              error={formErrors.name}
                              helperText={formErrors.name}
                              value={data.name}
                              onChange={(e) => handleInputEmp(e, i)}
                              size="small"
                              label={formErrors.name ? 'Name' : 'Name'}
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6 col-lg-6 col-md-6 col-xl-6 col-sm-6">
                            <DateField
                              edit={state?.id}
                              type="date"
                              className="w-100"
                              name="startDate"
                              value={dayjs(data.startDate)}
                              onChange={(e) =>
                                handleInputEmp(e, i, 'date', 'startDate')
                              }
                              label="start date"
                              error={formErrors.startDate}
                              defaultValue={dayjs(new Date(data.startDate))}
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  error: formErrors[i] ? true : false,
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
                            />

                            <FormHelperText>
                              {formErrors[i + 'date']}
                            </FormHelperText>
                          </div>
                          <div className="col-6 col-lg-6 col-md-6 col-xl-6 col-sm-6">
                            <DateField
                              edit={state?.id}
                              type="date"
                              className="w-100"
                              name="endDate"
                              value={dayjs(data.endDate)}
                              onChange={(e) =>
                                handleInputEmp(e, i, 'date', 'endDate')
                              }
                              label="end date"
                              defaultValue={formValues.endDate}
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
                            />
                            <FormHelperText>
                              {formErrors.endDate}
                            </FormHelperText>
                          </div>
                        </div>
                      </div>

                      <div className="w-100 userform-check mt-5">
                        <div className="">
                          <div className="form-text">Position</div>

                          <div className="container">
                            <div className="row">
                              {positions?.length > 0 &&
                                positions?.map((positionVal, index) => {
                                  return (
                                    <label
                                      key={index}
                                      className="container col-12 col-lg-4 col-xl-4"
                                    >
                                      <div>
                                        <input
                                          name="positions"
                                          value={positionVal.code}
                                          checked={data?.position?.includes(
                                            positionVal.code
                                          )}
                                          type="checkbox"
                                          onChange={(e) => handleInputEmp(e, i)}
                                        />
                                        <span className="checkmark"></span>
                                      </div>
                                      <div className="mx-2">
                                        {positionVal.name}
                                      </div>
                                    </label>
                                  );
                                })}
                              <div className="text-danger">
                                {formErrors[i + 'position']}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="discription mt-4 txt">
                        <Accordion
                          className="bg-color"
                          defaultExpanded={true}
                          style={{ backgroundColor: 'white' }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                              backgroundColor: 'white',
                              paddingLeft: '0px'
                            }}
                          >
                            <h4 className="text-bold1">Description</h4>
                          </AccordionSummary>
                          <AccordionDetails
                            style={{
                              backgroundColor: 'white',
                              paddingLeft: '0px'
                            }}
                          >
                            <div className="mb-3">
                              <Input
                                className="w-100"
                                value={data.description}
                                onChange={(e) => handleInputEmp(e, i)}
                                name="description"
                                label={
                                  formErrors.description
                                    ? 'Enter Description'
                                    : 'Enter Description'
                                }
                                rows="3"
                                multiline
                                error={formErrors.description}
                                helperText={formErrors.description}
                              />
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>

                      <div className="mt-4">
                        <div className="row mt-3">
                          <div className="col-12 col-lg-6 col-md-6 col-xl-6 col-sm-6">
                            <div className="form-text pb-1">References</div>
                            <div
                              className="drop2 w-100"
                              style={{ marginLeft: 0 }}
                            >
                              {data?.reffile &&
                                data?.reffile?.map((file, index) => (
                                  <div key={index}>
                                    <div className="d-flex justify-content-between mt-4">
                                      <div className="d-flex">
                                        <InsertDriveFileIcon className="text-primary me-2" />
                                        <div className="bold">
                                          {Array.isArray(file)
                                            ? file[0].name
                                            : file?.name?.split('/')[
                                                file?.name?.split('/').length -
                                                  1
                                              ]}
                                        </div>
                                      </div>
                                      <div className="fs-4 text-second">
                                        <BsDownload />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-md-6 col-xl-6 col-sm-6">
                            <div className="form-text pb-2">References</div>
                            <div className="drop1 w-100 text-center d-flex justify-content-center align-items-center">
                              <Dropzone
                                onDrop={(e) => {
                                  handleInputEmp(e, i, 'file');
                                }}
                                multiple={false}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="dropzone">
                                      <div className="drop-icon m-auto">
                                        <img
                                          src={require('../../Images/Download.jpg')}
                                        />
                                      </div>
                                      <div className="upload-head-text py-2">
                                        Upload
                                      </div>
                                      <p className="upload-head-sub">
                                        or drops file to upload
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col">
                          <Input
                            type="text"
                            name="refContact"
                            className="w-100"
                            error={formErrors.refContact}
                            helperText={formErrors.refContact}
                            value={data.refContact}
                            onChange={(e) => handleInputEmp(e, i)}
                            size="small"
                            label={
                              formErrors.refContact
                                ? 'Contact Info'
                                : 'Contact Info'
                            }
                          />
                        </div>
                        <div className="col"></div>
                      </div>
                    </React.Fragment>
                  );
                })}

              <div className="mt-4 ">
                <div className="addrow-text" onClick={handleAddClickEmp}>
                  + Add one more employment
                </div>
              </div>

              <div className="mt-5 userform-check ">
                <h4 className="text-bold1">Skills</h4>
                <div className="container">
                  <div className="row">
                    {skills[0] &&
                      skills.map((skillVal, index) => {
                        return (
                          <label
                            key={index}
                            className="container col-12 col-lg-4 col-xl-4"
                          >
                            <div>
                              <input
                                name="skills"
                                value={skillVal.code}
                                type="checkbox"
                                checked={formValues?.skills?.includes(
                                  skillVal.code
                                )}
                                onChange={(e) => handleChange(e, skillVal.code)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mx-2">{skillVal.name}</div>
                          </label>
                        );
                      })}
                    <div className="text-danger">{formErrors.skills}</div>
                  </div>
                </div>
              </div>

              {inputEdu &&
                inputEdu?.map((data, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="mt-5">
                        <h4 className="text-bold1">Education</h4>
                        <div className="mt-3 txt">
                          <div className="row mt-3">
                            <div className="col">
                              <Input
                                type="text"
                                name="name"
                                className="w-100"
                                error={formErrors.name}
                                helperText={formErrors.name}
                                value={data.name}
                                onChange={(e) => handleInputEdu(e, i)}
                                size="small"
                                label={formErrors.name ? 'Name' : 'Name'}
                              />
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                              <Input
                                type="text"
                                name="qualification"
                                className="w-100"
                                error={formErrors.firstName}
                                helperText={formErrors.firstName}
                                value={data.qualification}
                                onChange={(e) => handleInputEdu(e, i)}
                                size="small"
                                label={
                                  formErrors.qualification
                                    ? 'Qualification'
                                    : 'Qualification'
                                }
                              />
                            </div>
                            <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                              <Input
                                type="text"
                                name="graduatedAt"
                                className="w-100"
                                error={formErrors.graduatedAt}
                                helperText={formErrors.graduatedAt}
                                value={data.graduatedAt}
                                onChange={(e) => handleInputEdu(e, i)}
                                size="small"
                                label={
                                  formErrors.graduatedAt
                                    ? 'University'
                                    : 'University'
                                }
                              />
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                              <DateField
                                edit={state?.id}
                                type="date"
                                className="w-100"
                                name="startDate"
                                label={
                                  formErrors.startDate
                                    ? 'Start Date'
                                    : 'Start Date'
                                }
                                value={dayjs(data.startDate)}
                                onChange={(e) =>
                                  handleInputEdu(e, i, 'date', 'startDate')
                                }
                                error={formErrors.startDate}
                                defaultValue={formValues.startDate}
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
                                inputVariant="outlined"
                              />
                            </div>
                            <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                              <DateField
                                edit={state?.id}
                                type="date"
                                className="w-100"
                                name="endDate"
                                value={dayjs(data.endDate)}
                                onChange={(e) =>
                                  handleInputEdu(e, i, 'date', 'endDate')
                                }
                                label="end date"
                                defaultValue={formValues.endDate}
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
                              />
                              <FormHelperText>
                                {formErrors.endDate}
                              </FormHelperText>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="discription mt-4 txt">
                        <Accordion
                          className="bg-color"
                          defaultExpanded={true}
                          style={{ backgroundColor: 'white' }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                              backgroundColor: 'white',
                              paddingLeft: '0px'
                            }}
                          >
                            <h4 className="text-bold1">Description</h4>
                          </AccordionSummary>
                          <AccordionDetails
                            style={{
                              backgroundColor: 'white',
                              paddingLeft: '0px'
                            }}
                          >
                            <div className="mb-3">
                              <Input
                                className="w-100"
                                onChange={(e) => handleInputEdu(e, i)}
                                name="description"
                                value={data.description}
                                label={
                                  formErrors.description
                                    ? 'Enter Description'
                                    : 'Enter Description'
                                }
                                rows="3"
                                multiline
                                error={formErrors.description}
                                helperText={formErrors.description}
                              />
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </React.Fragment>
                  );
                })}

              <div
                className="mt-3 mb-4 addrow-text"
                onClick={handleAddClickEdu}
              >
                + Add Education
              </div>

              {/* <div className="mt-1 mb-5">
                <h4 className="text-bold1">References</h4>
              </div> */}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Bio;
