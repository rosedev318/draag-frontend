import { Avatar } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import {
  deleteEvents,
  getSchedules
} from '../../../Redux/Actions/CalenderAction';
import CloseIconNote from '../../../Images/notes_close.svg';
import CheckIconNote from '../../../Images/notes_check.svg';

const Events = (props) => {
  const {
    ev,
    index,
    editeventid,
    handleEvent,
    updateEvent,
    editEvent,
    eventClose
  } = props;

  const dispatch = useDispatch();
  const deleteEvent = (id) => {
    dispatch(deleteEvents(id)).then((res) => {
      if (res.status === 200) {
        dispatch(getSchedules());
      }
    });
  };

  return (
    <div key={index}>
      <div className="event-container passed mb-1">
        <div className="event-content">
          <div className="inline-avtar">
            <Avatar
              alt="Remy Sharp"
              src={ev?.invitee?.photo}
              sx={{ width: 30, height: 30 }}
            />
          </div>
          {editeventid ? (
            <div className="input-container-notes w-100 mb-2">
              <input
                type="text"
                className="note-input"
                defaultValue={ev.title}
                onChange={(e) => {
                  handleEvent(e.target.value, index);
                }}
              />
              <img
                src={CheckIconNote}
                className="cursor-pointer px-2"
                onClick={() => updateEvent(ev.id, ev.title)}
              />
              <img
                src={CloseIconNote}
                className="cursor-pointer"
                onClick={() => eventClose(ev.id, index)}
              />
            </div>
          ) : (
            <span
              className="event-title"
              onClick={() => {
                editEvent(ev.id, ev.title);
              }}
            >
              {ev?.title}
            </span>
          )}
          <div className="event-time">
            {moment(ev?.startTime, 'HH:mm:ss').format('hh:mm')} -{' '}
            {moment(ev?.endTime, 'HH:mm:ss').format('hh:mm')}
          </div>
        </div>
        <div
          className="delete-note cursor-pointer"
          onClick={() => deleteEvent(ev?.id)}
        >
          <IoIosClose />
        </div>
      </div>
    </div>
  );
};

export default Events;
