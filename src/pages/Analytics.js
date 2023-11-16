// import { Box } from '@mui/system';
import '../pages/Analytics.css';
// import Carousel from 'react-material-ui-carousel';
import { useState } from 'react';
import // areas,
// placement,
// profession
// subarea
'../constants/topareas.js';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAreaCandidate,
  getAreaClient,
  getCountCandidate,
  getCountJobs,
  getGenderCandidate,
  getMetrics,
  getTopProfessionClient,
  getTopSubCandidate,
  getTopSubClient,
  getEvents
} from '../Redux/Actions/AnalyticsAction';
import AnalyticChart from '../components/Charts/AnalyticChart';
import GenderChart from '../components/Charts/GenderChart';
import Card from '../components/Analytics/Card';
import AreaCard from '../components/Analytics/AreaCard';
import CheckIcon from '@mui/icons-material/Check';
import DateField from '../components/input/DateField';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { InputAdornment } from '@mui/material';
import AddEventDrawer from '../components/Analytics/AddEventDrawer';
import dayjs from 'dayjs';
import JobCard from '../components/Analytics/JobCard';
// import dayjs from 'dayjs';

const Analytics = () => {
  const initialValues = {
    sdate: '',
    edate: ''
  };
  
  const [formValues, setFormValues] = useState(initialValues);
  const [monthData, setMonthData] = useState([]);

  const dispatch = useDispatch();
  const [gender, setGender] = useState([]);
  const [datamonth, setDatamonth] = useState({});
  const [metricsData, setMetricsData] = useState({});

  const [area, setArea] = useState('candidate');
  const [category, setCategory] = useState('Area');
  const [categoryClient, setCategoryClient] = useState('Area');
  const [times, setTimes] = useState('28d');

  const [success, setSuccess] = useState(false);

  const changes = useSelector((state) => state.Agency.agencyChange);
  const monthDatas = useSelector((state) => state.Analytics.count_candidate);
  // candidate analytics
  const AreaCandidate = useSelector(
    (state) => state.Analytics.top_area_candidate
  );
  const topSubArea = useSelector((state) => state.Analytics.subarea_candidate);

  // client analytics
  const AreaClient = useSelector((state) => state.Analytics.top_area_client);
  const topSubAreaClient = useSelector(
    (state) => state.Analytics.subarea_client
  );
  const topProfession = useSelector(
    (state) => state.Analytics.top_profession_client
  );

  // get gender candidate
  const genderData = useSelector((state) => state.Analytics.gender_candidate);

  // get count jobs
  const jobsData = useSelector((state) => state?.Analytics?.count_jobs);

  useEffect(() => {
    setGender(genderData);
  }, [genderData]);

  const toTimestamp = (strDate) => {
    const dt = moment(strDate).unix();
    return dt;
  };

  // First Api this Month
  const startOfMonth = toTimestamp(
    moment().startOf('month').format('YYYY-MM-DD')
  );
  const endOfMonth = toTimestamp(moment().endOf('month').format('YYYY-MM-DD'));

  // Second Api previous Month
  const startOfPrevMonth = toTimestamp(
    moment().subtract(30, 'days').startOf('month').format('YYYY-MM-DD')
  );
  const endOfPrevMonth = toTimestamp(
    moment().subtract(30, 'days').endOf('month').format('YYYY-MM-DD')
  );

  // First Api
  useEffect(() => {
    dispatch(getMetrics(startOfMonth, endOfMonth)).then((res) => {
      setMetricsData(res.data);
    });
  }, [changes]);

  // Second Api
  useEffect(() => {
    dispatch(getMetrics(startOfPrevMonth, endOfPrevMonth)).then((res) => {
      setDatamonth(res.data);
    });
  }, [changes]);

  // handle date
  const handleChange = (e, type = null, fieldName = null) => {
    if (type == 'date') {
      let value = moment(new Date(e)).format('YYYY-MM-DD');
      setFormValues({ ...formValues, [fieldName]: value });
    }
  };

  // top areas
  const handleArea = (value) => {
    setArea(value);
  };

  // category in candidate
  const handleCategory = (value) => {
    setCategory(value);
  };

  // category in client
  const handleCategoryClient = (value) => {
    setCategoryClient(value);
  };

  useEffect(() => {
    if (times == '28d') {
      let month = moment().subtract(28, 'days').format('YYYY-MM-DD');
      const fdate = toTimestamp(moment(month).format('YYYY-MM-DD'));
      const tdate = toTimestamp(moment().format('YYYY-MM-DD'));
      dispatch(getCountCandidate(fdate, tdate, 'day'));
      dispatch(getCountJobs(fdate, tdate));
    }
  }, [changes]);

  // time of candidate
  const handleTime = (e, value) => {
    setTimes(value);
    if (value == 'today') {
      const fdate = toTimestamp(moment().format('YYYY-MM-DD'));
      const tdate = '';
      dispatch(getCountCandidate(fdate, tdate, 'day'));
      dispatch(getCountJobs(fdate, tdate));
    }
    if (value == 'yesterday') {
      let day = moment().subtract(1, 'days').format('YYYY-MM-DD');
      const fdate = toTimestamp(moment(day).format('YYYY-MM-DD'));
      const tdate = toTimestamp(moment().format('YYYY-MM-DD'));
      dispatch(getCountCandidate(fdate, tdate, 'day'));
      dispatch(getCountJobs(fdate, tdate));
    }
    if (value == '7d') {
      let week = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const fdate = toTimestamp(moment(week).format('YYYY-MM-DD'));
      const tdate = toTimestamp(moment().format('YYYY-MM-DD'));
      dispatch(getCountCandidate(fdate, tdate, 'day'));
      dispatch(getCountJobs(fdate, tdate));
    }
    if (value == '28d') {
      let month = moment().subtract(28, 'days').format('YYYY-MM-DD');
      const fdate = toTimestamp(moment(month).format('YYYY-MM-DD'));
      const tdate = toTimestamp(moment().format('YYYY-MM-DD'));
      dispatch(getCountCandidate(fdate, tdate, 'day'));
      dispatch(getCountJobs(fdate, tdate));
    }
    if (value == '90d') {
      let threemonth = moment().subtract(90, 'days').format('YYYY-MM-DD');
      const fdate = toTimestamp(moment(threemonth).format('YYYY-MM-DD'));
      const tdate = toTimestamp(moment().format('YYYY-MM-DD'));
      dispatch(getCountCandidate(fdate, tdate, 'month'));
      dispatch(getCountJobs(fdate, tdate));
    }
  };

  useEffect(() => {
    setMonthData(monthDatas);
  }, [monthDatas]);

  useEffect(() => {
    dispatch(getAreaCandidate());
    dispatch(getAreaClient());
    dispatch(getTopSubCandidate());
    dispatch(getGenderCandidate());
    dispatch(getTopSubClient());
    dispatch(getTopProfessionClient());
    dispatch(getEvents());
  }, [changes]);

  const handleCustomSearch = () => {
    const fdate = toTimestamp(moment(formValues.sdate).format('YYYY-MM-DD'));
    const tdate = toTimestamp(moment(formValues.edate).format('YYYY-MM-DD'));
    var a = moment(formValues.sdate);
    var b = moment(formValues.edate);
    const diff = b.diff(a, 'days');
    if (diff > 30) {
      dispatch(getCountCandidate(fdate, tdate, 'month')).then(() =>
        setSuccess(true)
      );
      dispatch(getCountJobs(fdate, tdate));
    } else {
      dispatch(getCountCandidate(fdate, tdate, 'day')).then(() =>
        setSuccess(true)
      );
      dispatch(getCountJobs(fdate, tdate));
    }
  };

  return (
    <div className="mainPage">
      <div className="main-analytic">
        <p className="analytic-head pt-5">Analytics</p>
        <div>
          <Card metricsData={metricsData} datamonth={datamonth} />
        </div>
        <AddEventDrawer />
        <div className="mt-3">
          <div className="candidate-total-head">Total candidates</div>
          <div className="pt-3">
            <AnalyticChart
              times={times}
              monthData={monthData}
              success={success}
            />
          </div>
          <div className="chart-menu d-flex gap-3">
            <div className="dropdown">
              <button
                style={{
                  boxShadow: '3px 3px 3px 3px RGBA(0, 0, 0, 0.1)',
                  width: '150px'
                }}
                className="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {times == 'today' && 'Today'}
                {times == 'yesterday' && 'Yesterday'}
                {times == '7d' && 'Last 7 days'}
                {times == '28d' && 'Last 28 days'}
                {times == '90d' && 'Last 90 days'}
                {times == 'custom' && 'Custom'}
              </button>
              <ul
                className="dropdown-menu analytic-menu"
                style={{
                  textAlign: 'start',
                  width: '20%',
                  height: 'auto',
                  borderRadius: 'none'
                }}
              >
                <li
                  className="d-flex cursor-pointer"
                  onClick={(e) => handleTime(e, 'today')}
                >
                  <a
                    className={`dropdown-item ${
                      times == 'today' ? 'active-drop' : ''
                    }`}
                  >
                    Today
                  </a>
                  {times == 'today' && <CheckIcon className="active-drop" />}
                </li>
                <li
                  className="d-flex cursor-pointer"
                  onClick={(e) => handleTime(e, 'yesterday')}
                >
                  <a
                    className={`dropdown-item ${
                      times == 'yesterday' ? 'active-drop' : ''
                    }`}
                  >
                    Yesterday
                  </a>
                  {times == 'yesterday' && (
                    <CheckIcon className="active-drop" />
                  )}
                </li>
                <li
                  className="d-flex cursor-pointer"
                  onClick={(e) => handleTime(e, '7d')}
                >
                  <a
                    className={`dropdown-item ${
                      times == '7d' ? 'active-drop' : ''
                    }`}
                  >
                    Last 7 days
                  </a>
                  {times == '7d' && <CheckIcon className="active-drop" />}
                </li>
                <li
                  className="d-flex cursor-pointer"
                  onClick={(e) => handleTime(e, '28d')}
                >
                  <a
                    className={`dropdown-item ${
                      times == '28d' ? 'active-drop' : ''
                    }`}
                  >
                    Last 28 days
                  </a>
                  {times == '28d' && <CheckIcon className="active-drop" />}
                </li>
                <li
                  className="d-flex cursor-pointer"
                  onClick={(e) => handleTime(e, '90d')}
                >
                  <a
                    className={`dropdown-item ${
                      times == '90d' ? 'active-drop' : ''
                    }`}
                  >
                    Last 90 days
                  </a>
                  {times == '90d' && <CheckIcon className="active-drop" />}
                </li>
                <div className="dropdown-divider mt-2 mb-1"></div>
                <li
                  className="cursor-pointer"
                  onClick={(e) => handleTime(e, 'custom')}
                >
                  <a
                    className="dropdown-item"
                    style={{ paddingBottom: '11px' }}
                  >
                    Custom..
                  </a>
                </li>
              </ul>
            </div>
            {times == 'custom' && (
              <>
                <DateField
                  edit={true}
                  type="date"
                  value={dayjs(formValues.sdate)}
                  name="sdate"
                  onChange={(e) => handleChange(e, 'date', 'sdate')}
                  label="Select Start Date"
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
                <DateField
                  edit={true}
                  value={dayjs(formValues.edate)}
                  type="date"
                  name="edate"
                  // className="mt-5"
                  onChange={(e) => handleChange(e, 'date', 'edate')}
                  label="Select End Date"
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
                <button
                  className="search-button"
                  onClick={() => handleCustomSearch()}
                  style={{ width: '150px' }}
                >
                  Search
                </button>
              </>
            )}
          </div>
        </div>
        <div style={{ paddingTop: '80px' }}>
          <JobCard jobsData={jobsData} />
        </div>
        <div className="pt-5">
          <p className="analytic-head">Top Areas</p>
          <div className="main-tab d-flex mb-2">
            <div
              onClick={() => handleArea('client')}
              className={`border-tab-first ${
                area == 'client' ? 'activetab ' : 'inactivetab'
              }`}
            >
              Client
            </div>
            <div
              onClick={() => handleArea('candidate')}
              className={`border-tab-last ${
                area == 'candidate' ? 'activetab' : 'inactivetab'
              }`}
            >
              Candidates
            </div>
          </div>
          <div style={{ marginLeft: 0 }}>
            <div className="row flex-card">
              <div className="col-12 col-lg-8 col-xl-8 col-md-12">
                <AreaCard
                  area={area}
                  category={category}
                  AreaCandidate={AreaCandidate}
                  topSubArea={topSubArea}
                  topSubAreaClient={topSubAreaClient}
                  topProfession={topProfession}
                  categoryClient={categoryClient}
                  AreaClient={AreaClient}
                  handleCategory={handleCategory}
                  handleCategoryClient={handleCategoryClient}
                />
              </div>
              <div className="col-12 col-lg-4 col-xl-4 col-md-12">
                <div className="gender-main">
                  <GenderChart gender={gender} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
