import React from 'react';
import './Dashboard.css';

import Expand from '../Images/expand.svg';
import CollapseImage from '../Images/shrink.svg';
import Collapse from '@mui/material/Collapse';
import { useEffect } from 'react';
import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Maindrag from '../components/Dashboard/dnd/Maindrag';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMonthstats,
  nanniesHightlight
} from '../Redux/Actions/CategoryAction';
import MonthStats from '../components/Dashboard/MonthStats';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { Box, Skeleton } from '@mui/material';
import SideBar from '../components/Dashboard/Sidebar/SideBar';
import Schedule from '../components/Dashboard/Schedule';
import { useNavigate } from 'react-router-dom';
import runOneSignal from '../constants/OneSignal';
import { seenStatus } from '../Redux/Actions/CalenderAction';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { PopupModal } from 'react-calendly';

import Calender from '../Images/calendar_check.svg';
import FilterLight from '../Images/Dashboard/filter_icon_light.svg';
import FilterDark from '../Images/Dashboard/filter_icon_dark.svg';
import CalenderLight from '../Images/Dashboard/calendar_check_light.svg';
import CalenderDark from '../Images/Dashboard/calendar_check_dark.svg';
import PlusSquareLight from '../Images/Dashboard/jobicon_light.svg';
import PlusSquareDark from '../Images/Dashboard/jobicon_dark.svg';
import CalendlyLight from '../Images/Dashboard/calendar_plus_light.svg';
import CalendlyDark from '../Images/Dashboard/calendar_plus_dark.svg';

const bigExplodeProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600
};

const source = {
  position: 'absolute',
  right: '50%',
  left: '50%',
  width: '500px'
};

const Dashboard = (props) => {
  const { setOpenCalendly, mode } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const localCalender = localStorage.getItem('calender') === 'true';
  const [openCalender, setOpenCalender] = useState(localCalender);
  const [statsOpen, setStatsOpen] = useState(false);
  const isVisible = localStorage.getItem('isVisible');
  const navigate = useNavigate();
  const changes = useSelector((state) => state.Agency.agencyChange);
  const monthData = useSelector((state) => state.Category.monthStats);
  const status = useSelector((state) => state.Calender.statusSeen);
  const [placeConfetti, setPlaceConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleStatsOpen = () => {
    setStatsOpen(!statsOpen);
  };

  useEffect(() => {
    if (localCalender === null) {
      localStorage.setItem('calender', 'false');
    }
  }, []);

  const handleCalender = () => {
    const isOpen = !openCalender;
    setOpenCalender(isOpen);
    localStorage.setItem('calender', isOpen);
  };

  const handleFilterSidebar = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    if (isVisible == 'true') {
      setOpen(true);
    }
  }, [isVisible]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('isVisible', 'false');
      setOpen(false);
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch(getMonthstats());
  }, [changes]);

  useEffect(() => {
    dispatch(seenStatus());
  }, []);

  return (
    <>
      <div
        style={{
          paddingTop: 65,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden',
          flexGrow: '1'
          // overflowY: openSidebar && 'hidden'
        }}
        className="position-relative"
      >
        {placeConfetti && (
          <div>
            <div style={source}>
              <ConfettiExplosion open={open} {...bigExplodeProps} />
            </div>
          </div>
        )}
        <div style={{ maxHeight: '100vh' }}>
          <Collapse
            orientation="vertical"
            in={statsOpen}
            collapsedSize={50}
            sx={{
              backgroundColor: '#008BFF'
            }}
          >
            {/* <div className={!statsOpen ? 'topcard-small' : 'topcard'}> */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ paddingTop: '11px' }}
            >
              <div
                className="state-text px-5 mx-2"
                style={{
                  fontSize: '15px',
                  lineHeight: '30px'
                }}
              >
                Monthly stats
              </div>
              <div
                className="coll-icon text-white px-3 cursor-pointer"
                onClick={() => handleStatsOpen()}
              >
                {statsOpen ? <img src={CollapseImage} /> : <img src={Expand} />}
              </div>
            </div>
            {<MonthStats monthData={monthData} />}
            {/* </div> */}
          </Collapse>
        </div>
        <div style={{ padding: '15px 0 10px 50px' }}>
          <div className="d-flex gap-5">
            {loading ? (
              <Skeleton width={28} height={28} variant="rounded" />
            ) : (
              <div>
                <img
                  width={28}
                  height={28}
                  src={mode === 'light' ? FilterLight : FilterDark}
                  onClick={() => handleFilterSidebar()}
                  className={`cursor-pointer ${
                    !openFilter && mode === 'light' ? 'fade-out' : ''
                  }`}
                />
              </div>
            )}
            {loading ? (
              <Skeleton width={28} height={28} variant="rounded" />
            ) : (
              <div>
                <div
                  className={`position-relative ${
                    openCalender === true
                      ? 'calender-icon-highlight'
                      : 'calender-icon'
                  }`}
                >
                  <svg
                    onClick={() => handleCalender()}
                    className="position-relative cursor-pointer"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <title>calendar / calendar_check</title>
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
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g id="calendar-/-calendar_check">
                        <mask id="mask-2" fill="white">
                          <use xlinkHref="#path-1"></use>
                        </mask>
                        <g id="calendar-/-calendar_check-(Background/Mask)"></g>
                        <path
                          d="M16.7070007,12.7070312 L15.2929993,11.2930298 L11,15.5860291 L8.70699883,13.2930298 L7.29299927,14.7070312 L11,18.414032 L16.7070007,12.7070312 Z M19,4 L17,4 L17,2 L15,2 L15,4 L9,4 L9,2 L7,2 L7,4 L5,4 C3.89699984,4 3,4.89699984 3,6 L3,20 C3,21.1030006 3.89699984,22 5,22 L19,22 C20.1030006,22 21,21.1030006 21,20 L21,6 C21,4.89699984 20.1030006,4 19,4 L19,4 Z M19.0020008,20 L5,20 L5,10 L19,10 L19.0020008,20 L19.0020008,20 Z M19.0002861,8 L19,6 L5,6 L5,8 L19.0002861,8 L19.0002861,8 Z"
                          fill="#2E3A59"
                          mask="url(#mask-2)"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  {Object.keys(status)?.length > 0 && !status?.seen && (
                    <div
                      className="position-absolute"
                      style={{ bottom: -3, right: -2 }}
                    >
                      <FiberManualRecordIcon
                        sx={{ height: 13, width: 13, color: '#FF6818' }}
                      />
                    </div>
                  )}
                </div>
                {/* <img
                src={mode === 'light' ? CalenderLight : CalenderDark}
                onClick={() => handleCalender()}
                className="cursor-pointer"
              /> */}
              </div>
            )}
            {loading ? (
              <Skeleton width={28} height={28} variant="rounded" />
            ) : (
              <div>
                <img
                  width={28}
                  height={28}
                  src={mode === 'light' ? PlusSquareLight : PlusSquareDark}
                  onClick={() => navigate('/jobdetail')}
                  className="cursor-pointer"
                />
              </div>
            )}
            {loading ? (
              <Skeleton width={28} height={28} variant="rounded" />
            ) : (
              <div>
                <img
                  width={28}
                  height={28}
                  src={mode === 'light' ? CalendlyLight : CalendlyDark}
                  className="cursor-pointer"
                  onClick={() => setOpenCalendly(true)}
                />
              </div>
            )}
          </div>
          {openCalender && <Schedule />}
        </div>
        <Maindrag
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          setPlaceConfetti={setPlaceConfetti}
          setLoading={setLoading}
        />
        {isVisible == 'true' && (
          <div style={source}>
            <ConfettiExplosion open={open} {...bigExplodeProps} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
