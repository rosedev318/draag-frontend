import React, { useEffect, useRef, useState } from 'react';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import './Schedule.css';
import { Avatar } from '@mui/material';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import {
  addNotes,
  deleteNotes,
  getSchedules,
  toggleNotes
} from '../../Redux/Actions/CalenderAction';
import { useSelector } from 'react-redux';
import Calender from './CalenderCard/Calender';
import ConfettiExplosion from 'react-confetti-explosion';

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

const Schedule = () => {
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const scheduleData = useSelector((state) => state.Calender.schedules);
  const changes = useSelector((state) => state.Agency.agencyChange);
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const [addnote, setAddnote] = useState(false);
  const [noteid, setNoteid] = useState([]);
  const [open, setOpen] = useState(false);
  const [progressCard, setProgressCard] = useState([]);
  const [progress, setProgress] = useState();

  const [check, setCheck] = useState(false);
  const [checkNote, setCheckNote] = useState([]);

  const active = { border: '0.18rem solid #2998ff' };
  const inactive = {};

  const handleClick = (divNum) => {
    setSelected(divNum);
    const filterCard = scheduleData.filter((e) => e.id === divNum);
    setProgressCard(filterCard);
  };

  useEffect(() => {
    const filterCard = scheduleData.filter((e) => e.id === selected);
    setProgressCard(filterCard);
  }, [selected]);

  useEffect(() => {
    dispatch(getSchedules());
  }, [changes]);

  const progressDa =
    Number(progressCard[0]?.doneNotesCount / progressCard[0]?.notes?.length) *
      100 +
    '%';

  useEffect(() => {
    if (progressDa) {
      setProgress(progressDa);
    }
  }, [progressDa]);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  const openNote = (data) => {
    setAddnote(true);
    if (!noteid?.includes(data?.id)) {
      setNoteid((prevState) => [...prevState, data?.id]);
    }
  };

  const closeAdd = (value) => {
    let arr = noteid;
    arr = arr.filter((item) => item !== value);
    setNoteid(arr);
  };

  const addNote = (id, data) => {
    dispatch(addNotes({ content: data, scheduleId: id })).then((res) => {
      if (res.status === 200) {
        let arr = noteid;
        arr = arr.filter((item) => item !== id);
        setNoteid(arr);
        dispatch(getSchedules());
      }
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleHorizantalScroll(elementRef.current, 200, 0, 1400);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (open) {
      const confetti = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(confetti);
    }
  }, [open]);

  return (
    <div className="mb-5">
      {open && (
        <div style={source}>
          <ConfettiExplosion {...bigExplodeProps} />
        </div>
      )}
      <div className="p-3 fw-bold fs-6">Schedule</div>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div>
          {check
            ? checkNote.filter((d) => d.done).length
            : progressCard[0]?.doneNotesCount}{' '}
          tasks
          <span className="title-progress"> completed </span> out of{' '}
          {check ? checkNote?.length : progressCard[0]?.notes?.length}.
        </div>
        <div className="container pt-1">
          <div className="progress">
            <div
              className={`${
                progress === '100%'
                  ? 'calender-progress-success'
                  : 'calender-progress-pending'
              }`}
              role="progressbar"
              style={{ width: progress }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div className="w-100 position-relative pt-4">
        <div className="left-arrow-btn cursor-pointer">
          <button
            className="btn-calender"
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, -10);
            }}
            disabled={arrowDisable}
          >
            <svg
              style={arrowDisable ? { stroke: 'gray' } : { stroke: '#61a5ff' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left icon-primary"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <div className="right-arrow-btn cursor-pointer">
          <button
            className="btn-calender"
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, 10);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right icon-primary"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div
          className="d-flex gap-3"
          style={{ overflow: 'hidden' }}
          ref={elementRef}
        >
          {scheduleData.map((e, index) => {
            return (
              <Calender
                index={index}
                active={active}
                inactive={inactive}
                e={e}
                selected={selected}
                setSelected={setSelected}
                // handleCheck={handleCheck}
                handleClick={handleClick}
                addnote={addnote}
                noteid={noteid}
                closeAdd={closeAdd}
                openNote={openNote}
                addNote={addNote}
                progressCard={progressCard}
                setProgressCard={setProgressCard}
                setOpen={setOpen}
                scheduleData={scheduleData}
                setProgress={setProgress}
                setCheck={setCheck}
                checkNote={checkNote}
                setCheckNote={setCheckNote}
                progress={progress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
