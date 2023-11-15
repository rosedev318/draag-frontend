import { CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
// import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import * as actionTypes from '../../Redux/Actions/ActionTypes';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import Status from '../../components/status/Status';
import { useDispatch, useSelector } from 'react-redux';
import {
  Blacklist,
  Ratings,
  getsingleNanny,
  updateRatings
} from '../../Redux/Actions/NanniesAction';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import CheckGray from '../../Images/circle_check-gray.svg';
import CheckGreen from '../../Images/circle_check-green.svg';
import UserProfile from '../../components/Profile/UserProfile';
import ContactDetail from '../../components/Profile/ContactDetail';
import languageRating from '../../constants/languageRating';
import { useEffectOnce } from 'react-use';
import { clockNumberClasses } from '@mui/x-date-pickers';
import { copyToClipboard } from '../../constants/copydata';
import AttachImageModal from '../../components/Dashboard/Modals/AttachImageModal';
import Call from '../../Images/phone.svg';

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
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const [fullBio, setFullBio] = useState(false);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const [copy, setCopy] = useState(false);
  const [copyCall, setCopyCall] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const datas = useSelector((state) => state.Nannies.singleNanny);
  const ratings = useSelector((state) => state.Nannies.ratings);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (datas) {
      setData(datas);
    }
  }, [datas]);

  useEffect(() => {
    dispatch(getsingleNanny(state?.id));
  }, [state?.id]);

  useEffect(() => {
    dispatch(Ratings());
  }, []);

  const handleSubmit = (value) => {
    const form = new FormData();
    form.append('blacklist', value);
    dispatch(Blacklist(state?.id, form));
  };

  const handleRating = (value) => {
    dispatch(updateRatings(state?.id, value));
  };

  const showFullBio = () => {
    setFullBio(!fullBio);
  };
  const bio = fullBio ? data.bio : data.bio?.slice(0, 200);

  let name = '';
  for (let i = 0; i < data?.languages?.length; i++) {
    let findData = languageRating.filter(
      (d) => d.value === data?.languages[i].rating
    );

    name +=
      data?.languages[i]?.language.name +
      ' ' +
      '(' +
      `${findData[0].label}` +
      ')' +
      ',';
  }

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

  const empDetail = `
    Contact Info: ${data?.employmentHistories?.map((e) => {
      return e?.referenceContactInfo;
    })}
   
  `;

  const copyUrl = `
  ${data?.employmentHistories?.map((e) => {
    return e?.referenceUrl;
  })}
  `;

  // const copyText = async () => {
  //   try {
  //     await navigator.clipboard.writeText(copyItem);
  //     toast.success('Copied', { autoClose: 1500 });
  //   } catch (err) {
  //     console.log('err to copy', err);
  //   }
  // };

  const copyText = () => {
    copyToClipboard(copyItem).then(() => {
      setCopy(true);
      const copyData = setTimeout(() => {
        setCopy(false);
      }, 1000);
      return () => clearTimeout(copyData);
    });
  };

  const star = Object.values(ratings).filter((e) => e?.code === data?.rating);

  var names = data?.positions?.map(function (item) {
    return item['name'];
  });

  const position = names?.toString();

  const positions = position?.replaceAll(',', ', ');

  var years = moment().diff(data?.dateOfBirth, 'years');

  const languages = data?.languages?.sort((a, b) =>
    a.language.name > b.language.name ? 1 : b.language.name ? -1 : 0
  );

  const handleNavigate = () => {
    setData({});
    dispatch({
      type: actionTypes.GET_SINGLENANNY_SUCCESS,
      payload: {}
    });
    if (state?.type === 'member') {
      navigate(-1);
    }
    if (state?.assign) {
      navigate('/');
    } else {
      navigate('/candidate');
    }
  };

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      return setLoading(true);
    } else {
      return setLoading(false);
    }
  }, [data]);

  const copyEmpDetail = () => {
    copyToClipboard(empDetail).then(() => {
      setCopyCall(true);
      const copyData = setTimeout(() => {
        setCopyCall(false);
      }, 1000);
      return () => clearTimeout(copyData);
    });
  };

  const copyReference = () => {
    copyToClipboard(copyUrl).then(() => {
      setCopyLink(true);
      const copyData = setTimeout(() => {
        setCopyLink(false);
      }, 1000);
      return () => clearTimeout(copyData);
    });
  };

  return (
    <Box
      component="main"
      style={{ backgroundColor: 'rgb(241, 241, 241)' }}
      sx={{ flexGrow: 1, p: 3 }}
    >
      <div
        onClick={() => handleNavigate()}
        style={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        <div
          style={{ paddingTop: 60, paddingBottom: 9 }}
          className="backtext cursor-pointer"
        >
          <ChevronLeftIcon /> Back to{' '}
          <span>{state?.assign ? 'dashboard' : 'candidates'}</span>
        </div>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center pt-5"
          style={{ height: '100vh' }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="main-card pt-3">
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
                    {/* <Tab label="Notes" {...a11yProps(3)} />
                    <Tab label="Documents" {...a11yProps(4)} /> */}
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div className="header2 pt-0">
                    <div className="d-flex">
                      <button className="btn pb1">Profile Details</button>
                    </div>
                  </div>
                  <div className="border-bottom p-4">
                    <p className="personal-detail-title">Personal Details</p>
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
                    <div className="d-flex justify-content-between align-items-center">
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
                              className="d-flex justify-content-evenly align-items-center"
                              style={{ height: '100px' }}
                            >
                              <div
                                className={`gap-5 d-flex justify-content-evenly cursor-pointer ${
                                  e?.referenceUrl
                                    ? 'highlight-icon'
                                    : 'default-icon'
                                }`}
                              >
                                {copyCall ? (
                                  'Copied'
                                ) : (
                                  <svg
                                    onClick={() => copyEmpDetail()}
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  >
                                    <title>basic / phone</title>
                                    <defs>
                                      <rect
                                        id="path-1"
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                      ></rect>
                                    </defs>
                                    <g
                                      id="Symbols"
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <g id="basic-/-phone">
                                        <mask id="mask-2" fill="white">
                                          <use xlinkHref="#path-1"></use>
                                        </mask>
                                        <g id="basic-/-phone-(Background/Mask)"></g>
                                        <path
                                          d="M16.2929668,12.2930059 L14.6989679,13.8870058 C13.9599679,13.6670058 12.5809674,13.167006 11.7069674,12.2930059 C10.8329673,11.4190059 10.3329675,10.0400054 10.1129675,9.30100536 L11.7069674,7.7070055 C12.0979674,7.3160055 12.0979674,6.68400595 11.7069674,6.29300594 L7.70696735,2.29300585 C7.31596735,1.90200585 6.6839678,1.90200585 6.2929678,2.29300585 L3.58096772,5.00500607 C3.20096773,5.38500607 2.98696752,5.90700579 2.99496752,6.44000578 C3.01796752,7.8640058 3.39496779,12.8100059 7.2929678,16.7080059 C11.1909678,20.6060059 16.1369679,20.9820062 17.5619678,21.0060062 C17.5669678,21.0060062 17.5849677,21.0060062 17.5899677,21.0060062 C18.1179677,21.0060062 18.6169684,20.7980058 18.9949684,20.4200058 L21.7069683,17.7080059 C22.0979683,17.3170059 22.0979683,16.6850064 21.7069683,16.2940063 L17.7069683,12.2930059 C17.3159683,11.9020059 16.6839668,11.9020059 16.2929668,12.2930059 Z M8.70696735,15.2930059 C5.34096742,11.927006 5.01496746,7.64200592 4.99496746,6.41900587 L6.99996758,4.41400599 L9.58596802,7.00000572 L8.2929678,8.29300594 C8.0539678,8.53100595 7.95196749,8.87500563 8.02096748,9.20500565 C8.04496748,9.32000565 8.63196743,12.0470055 10.2919674,13.7070055 C11.9519674,15.3670055 14.6789672,15.9540054 14.7939672,15.9780054 C15.1269673,16.0490054 15.4679679,15.9460055 15.7059679,15.7070055 L16.9999676,14.4140053 L19.585968,17.0000057 L17.5799675,19.0050049 C16.3319675,18.9840049 12.0619674,18.6490059 8.70696735,15.2930059 Z"
                                          fill="#C0CBD2"
                                          mask="url(#mask-2)"
                                        ></path>
                                      </g>
                                    </g>
                                  </svg>
                                )}
                                {copyLink ? (
                                  'Copied'
                                ) : (
                                  <svg
                                    onClick={() => copyReference()}
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  >
                                    <title>edit / copy</title>
                                    <defs>
                                      <rect
                                        id="path-1"
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                      ></rect>
                                    </defs>
                                    <g
                                      id="Symbols"
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <g id="edit-/-copy">
                                        <mask id="mask-2" fill="white">
                                          <use xlinkHref="#path-1"></use>
                                        </mask>
                                        <g id="edit-/-copy-(Background/Mask)"></g>
                                        <path
                                          d="M10,2 L20,2 C21.1522846,2 22,2.84771526 22,4 L22,14 C22,15.1522846 21.1522846,16 20,16 L16,16 L16,20 C16,21.1522846 15.1522846,22 14,22 L4,22 C2.84771526,22 2,21.1522846 2,20 L2,10 C2,8.84771538 2.84771526,8 4,8 L8,8 L8,4 C8,2.84771526 8.84771538,2 10,2 L10,2 Z M8,10 L4,10 L4,20 L14,20 L14,16 L10,16 C8.84771538,16 8,15.1522846 8,14 L8,10 L8,10 Z M10,4 L10,14 L20,14 L20,4 L10,4 L10,4 Z"
                                          fill="#2E3A59"
                                          mask="url(#mask-2)"
                                        ></path>
                                      </g>
                                    </g>
                                  </svg>
                                )}
                              </div>

                              {/* <Link
                                to={e.referenceUrl != null && e.referenceUrl}
                                target={e.referenceUrl != null && '_blank'}
                              >
                                <img
                                  src={
                                    e.referenceUrl === null
                                      ? CheckGray
                                      : CheckGreen
                                  }
                                />
                              </Link> */}
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
                            <div className="user-lang">{e.language?.name}</div>
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
        </div>
      )}
    </Box>
  );
};

export default Profile;
