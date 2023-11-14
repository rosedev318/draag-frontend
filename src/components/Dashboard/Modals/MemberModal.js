import React, { useEffect, useState } from 'react';
import UserProfile from '../../Profile/UserProfile';
import Status from '../../status/Status';
import ContactDetail from '../../Profile/ContactDetail';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import {
  Blacklist,
  Ratings,
  getsingleNanny,
  updateRatings
} from '../../../Redux/Actions/NanniesAction';
import { useSelector } from 'react-redux';
import './MemberModal.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import moment from 'moment';
import * as actionTypes from '../../../Redux/Actions/ActionTypes';
import { useNavigate } from 'react-router-dom';
import { copyToClipboard } from '../../../constants/copydata';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const MemberModal = (props) => {
  const { memberId, open, setOpen } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [fullBio, setFullBio] = useState(false);
  const [value, setValue] = useState(0);
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const datas = useSelector((state) => state.Nannies.singleNanny);
  const ratings = useSelector((state) => state.Nannies.ratings);
  const navigate = useNavigate();

  const star = Object.values(ratings).filter((e) => e?.code === data?.rating);

  var years = moment().diff(data?.dateOfBirth, 'years');
  const bio = fullBio ? data?.bio : data.bio?.slice(0, 200);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showFullBio = () => {
    setFullBio(!fullBio);
  };

  const copyItem = `
  Name: ${data.firstName}
  Age: ${data.age}
  Location: ${data.area}
  Status in the UK: ${data.visaStatus}
  Experience: ${data.experience}
  Reference: ${data?.references?.length > 0 ? 'Yes' : 'No'}
  Cooking: ${
    data?.qualifiedSkills?.filter((e) => e.code == 'CAN_COOK') ? 'Yes' : 'No'
  }
  Travel: ${
    data?.qualifiedSkills?.filter((e) => e.code == 'WILLING_TO_TRAVEL')
      ? 'Yes'
      : 'No'
  }
  Availability: ${data?.availability}
  Skills: ${
    data.skills &&
    data.skills.map((e) => {
      return e.name;
    })
  }
  Languages: ${name}
  Photo: ${data.photo}
  CV: ${data?.cv}
`;

  const copyText = () => {
    copyToClipboard(copyItem).then(() => {
      setCopy(true);
      const copyData = setTimeout(() => {
        setCopy(false);
      }, 1000);
      return () => clearTimeout(copyData);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setData({});
    dispatch({
      type: actionTypes.GET_SINGLENANNY_SUCCESS,
      payload: {}
    });
  };

  const languages = data?.languages?.sort((a, b) =>
    a.language.name > b.language.name ? 1 : b.language.name ? -1 : 0
  );
  var names = data?.positions?.map(function (item) {
    return item['name'];
  });

  const position = names?.toString();

  const positions = position?.replaceAll(',', ', ');

  const handleSubmit = (value) => {
    const form = new FormData();
    form.append('blacklist', value);
    dispatch(Blacklist(memberId, form));
  };

  const handleRating = (value) => {
    dispatch(updateRatings(memberId, value));
  };

  useEffect(() => {
    if (datas) {
      setData(datas);
    }
  }, [datas]);

  useEffect(() => {
    if (open) {
      dispatch(getsingleNanny(memberId));
      dispatch(Ratings());
    }
  }, [open]);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      return setLoading(true);
    } else {
      return setLoading(false);
    }
  }, [data]);

  return (
    <div className="opacity-member">
      <div className="main-member">
        <ChevronLeftIcon
          className="cursor-pointer fs-2"
          onClick={() => handleClose()}
          style={{ position: 'absolute', left: '10px', top: '10px' }}
        />
        <div className="main-card pt-5">
          {loading ? (
            <div
              className="d-flex justify-content-center h-100"
              style={{ paddingBottom: '50%', paddingLeft: '50%' }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="profile-card bg-white">
                <div className="text-end pt-2 px-2">
                  <div
                    onClick={() =>
                      navigate('/userdetail', {
                        state: {
                          id: data.id,
                          edit: true
                        }
                      })
                    }
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      cursor: 'pointer'
                    }}
                  >
                    <EditIcon className="fs-5" />
                  </div>
                </div>
                <UserProfile
                  data={data}
                  star={star}
                  positions={positions}
                  handleSubmit={handleSubmit}
                  handleRating={handleRating}
                  ratings={ratings}
                  copyText={copyText}
                  copy={copy}
                  open={open}
                />
                <hr className="mt-3 divider" />
                <div className="container">
                  <div className="container">
                    <Status status={data.status} />
                  </div>

                  <hr className="row mt-4 divider" />
                  <ContactDetail data={data} />
                </div>
              </div>
              <div className="detail-card bg-white">
                <div className="dcard">
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        aria-label="basic tabs example"
                        className="mx-2"
                      >
                        <Tab
                          className="tabs-head"
                          label="Candidate Profile"
                          {...a11yProps(0)}
                        />
                        <Tab label="Assigned" {...a11yProps(1)} />
                        <Tab label="Documents" {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <div className="header2 pt-0">
                        <div className="d-flex">
                          <button className="btn pb1">Profile Details</button>
                        </div>
                      </div>
                      <div className="border-bottom p-4">
                        <p className="personal-detail-title">
                          Personal Details
                        </p>
                        <div className="row mt-4">
                          <div className="col-4">
                            <div className="subdetail">First Name</div>
                            <div className="pd">{data.firstName}</div>
                          </div>
                          <div className="col-4">
                            <div className="subdetail">Last Name</div>
                            <div className=" pd">{data.lastName}</div>
                          </div>
                          <div className="col-4">
                            <div className="subdetail">Nationality</div>
                            <div className="pd">{data.nationality}</div>
                          </div>
                        </div>
                        <div className="row mt-4 mb-2">
                          <div className="col-4">
                            <div className="subdetail">Gender</div>
                            <div className="pd">{data.sex?.name}</div>
                          </div>
                          <div className="col-4">
                            <div className="subdetail">Date of Birth</div>
                            <div className="pd">
                              <>
                                {data.dateOfBirth &&
                                  moment(data.dateOfBirth).format(
                                    'MMM D, YYYY' + ' '
                                  )}
                                {data?.dateOfBirth !== null && (
                                  <span style={{ color: '#757C7C' }}>
                                    {(years !== null || undefined) && (
                                      <>({years + ' ' + 'yrs' + ' ' + 'old'})</>
                                    )}
                                  </span>
                                )}
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="border-bottom p-4"
                        style={{ borderColor: 'lightgray' }}
                      >
                        <p className="personal-detail-title pt-0">Bio</p>
                        <p className="bio-text">{bio}</p>
                        <div onClick={showFullBio} className="pb-2 pt-3 rmore">
                          {data?.bio?.length > 200 && (
                            <>
                              Read {fullBio ? 'Less' : 'More'}
                              {fullBio ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="border-bottom p-4">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="personal-detail-title">Experiences</p>
                            {data.employmentHistories?.map((item, index) => {
                              var a = moment(item.endDate);
                              var b = moment(item.startDate);
                              var years = a.diff(b, 'year');
                              b.add(years, 'years');

                              var months = a.diff(b, 'months');
                              b.add(months, 'months');

                              return (
                                <React.Fragment key={index}>
                                  <h6 className="mt-4 exp-title">
                                    {item.positions.map((e) => {
                                      return (
                                        <p>
                                          {e.name}- {item.employerName}
                                        </p>
                                      );
                                    })}
                                  </h6>
                                  <div className="exp-desc">
                                    {moment(item.startDate).format('MMM  YYYY')}{' '}
                                    &nbsp;-&nbsp;
                                    {moment(item.endDate).format('MMM  YYYY')} (
                                    {years +
                                      ' ' +
                                      'years' +
                                      ' ' +
                                      'and' +
                                      ' ' +
                                      months +
                                      ' ' +
                                      'months'}
                                    )
                                  </div>
                                  <React.Fragment />
                                </React.Fragment>
                              );
                            })}
                          </div>
                          <div style={{ paddingRight: '20px' }}>
                            <p className="personal-detail-title">References</p>
                            {data.employmentHistories?.map((e, index) => {
                              return (
                                <div
                                  key={index}
                                  className="d-flex justify-content-center align-items-center"
                                  style={{ height: '100px' }}
                                >
                                  <Link
                                    to={
                                      e.referenceUrl != null && e.referenceUrl
                                    }
                                    target={e.referenceUrl != null && '_blank'}
                                  >
                                    <img
                                      src={
                                        e.referenceUrl === null
                                          ? CheckGray
                                          : CheckGreen
                                      }
                                    />
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom p-4 mt-2">
                        <p className="personal-detail-title">Education</p>
                        {data.educations?.map((data, index) => {
                          return (
                            <React.Fragment key={index}>
                              <h6 className="mt-3 exp-title">
                                {data.major} at {data.graduatedAt}
                              </h6>
                              <div className="mb-2 exp-desc">
                                {moment(data.startDate).format('YYYY')} -
                                {moment(data.endDate).format('YYYY')}
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div className="mt-1 p-4 border-bottom">
                        <div className="skills-text">Language</div>
                        {languages &&
                          languages.map((e, index) => {
                            const width = e.rating * 20 + '%';
                            return (
                              <div key={index} className="mt-4 w-50">
                                <div className="user-lang">
                                  {e.language?.name}
                                </div>
                                <div
                                  className="progress mt-1"
                                  role="progressbar"
                                  aria-label="Basic example"
                                  aria-valuenow="75"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  <div
                                    style={{
                                      backgroundColor: '#2196F3',
                                      width: width
                                    }}
                                    className="progress-bar"
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="p-4 mt-1">
                        <p className="personal-detail-title">References</p>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      Item Three
                    </TabPanel>
                  </Box>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
