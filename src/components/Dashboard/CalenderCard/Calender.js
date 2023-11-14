import React, { useEffect, useState } from 'react';
import CloseIcon from '../../../Images/close_notes.svg';
import CloseIconNote from '../../../Images/notes_close.svg';
import CheckIconNote from '../../../Images/notes_check.svg';
import moment from 'moment';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  deleteEvents,
  deleteNotes,
  getSchedules,
  toggleNotes,
  updateEvents,
  updateNotes
} from '../../../Redux/Actions/CalenderAction';
import Notes from './Notes';
import { IoIosClose } from 'react-icons/io';
import Events from './Events';

const Calender = (props) => {
  const {
    e,
    index,
    selected,
    setSelected,
    handleClick,
    active,
    inactive,
    // handleCheck,
    addnote,
    noteid,
    closeAdd,
    openNote,
    addNote,
    progressCard,
    setProgressCard,
    setOpen,
    scheduleData,
    setProgress,
    setCheck,
    setCheckNote,
    checkNote
  } = props;

  // notes state
  const [text, setText] = useState('');
  const [updatenote, setUpdatenote] = useState(false);
  const [updateid, setUpdateid] = useState('');
  const [editnote, setEditNote] = useState(false);
  const [editevent, setEditevent] = useState(false);
  const [editnoteid, setEditNoteid] = useState([]);
  const dispatch = useDispatch();
  const [notedata, setNotedata] = useState('');
  const [notetext, setNotetext] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notesupdate, setNotesupdate] = useState([]);

  // events state
  const [editeventid, setEditeventid] = useState([]);
  const [eventtext, setEventtext] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsupdate, setEventsupdate] = useState([]);

  useEffect(() => {
    if (e.notes) {
      setNotesupdate(e.notes);
      setNotes(e.notes.sort((a, b) => (a.done && !b.done ? 1 : -1)));
    }
  }, [e.notes]);

  useEffect(() => {
    if (e.events) {
      setEventsupdate(e.events);
      setEvents(e.events);
    }
  }, [e.events]);

  const editNote = (id, data) => {
    setEditNote(true);
    if (!editnoteid?.includes(id)) {
      setNotetext((prevState) => [...prevState, data]);
      setEditNoteid((prevState) => [...prevState, id]);
    }
  };

  const editEvent = (id, data) => {
    setEditevent(true);
    if (!editeventid.includes(id)) {
      setEventtext((prevState) => [...prevState, data]);
      setEditeventid((prevState) => [...prevState, id]);
    }
  };

  const editClose = (id, index) => {
    let arr = editnoteid;
    arr = arr.filter((item) => item !== id);
    setEditNoteid(arr);
    let noteValue = JSON.parse(JSON.stringify(notesupdate));
    noteValue[index].content == noteValue[index].content;
    setNotes(noteValue);
  };

  const eventClose = (id, index) => {
    let arr = editeventid;
    arr = arr.filter((item) => item !== id);
    setEditeventid(arr);
    let eventValue = JSON.parse(JSON.stringify(eventsupdate));
    eventValue[index].title == eventValue[index].title;
    setEvents(eventValue);
  };

  const updateNote = (id, data) => {
    dispatch(updateNotes(id, { content: data })).then((res) => {
      if (res.status === 200) {
        let arr = editnoteid;
        arr = arr.filter((item) => item !== id);
        setEditNoteid(arr);
        // dispatch(getSchedules());
      }
    });
  };

  const updateEvent = (id, data) => {
    dispatch(updateEvents(id, { title: data })).then((res) => {
      if (res.status === 200) {
        let arr = editeventid;
        arr = arr.filter((item) => item !== id);
        setEditeventid(arr);
      }
    });
  };

  const handleChange = (data, index) => {
    let noteValue = JSON.parse(JSON.stringify(notes));
    noteValue[index].content = data;
    setNotes(noteValue);
  };

  const handleEvent = (data, index) => {
    let eventValue = JSON.parse(JSON.stringify(events));
    eventValue[index].title = data;
    setEvents(eventValue);
  };

  const handleCheck = (check, id, index) => {
    let checkValue = JSON.parse(JSON.stringify(notes));
    checkValue[index].done = check;
    setNotes(checkValue.sort((a, b) => (a.done && !b.done ? 1 : -1)));
    setCheckNote(checkValue);
    dispatch(toggleNotes(id)).then((res) => {
      if (res.status === 200) {
        setCheck(true);
      }
    });
  };

  const handleDeleteNote = (id) => {
    let arr = notes;
    arr = arr.filter((item) => item.id !== id);
    setNotes(arr);
    setCheckNote(arr);
    dispatch(deleteNotes(id)).then((res) => {
      if (res.status === 200) {
        setCheck(true);
      }
    });
  };

  useEffect(() => {
    const progress1 =
      Number(checkNote?.filter((d) => d.done).length / checkNote?.length) *
        100 +
      '%';
    setProgress(progress1);
    if (progress1 === '100%') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [checkNote]);

  const matchDate =
    moment.parseZone(e.date).format('YYYY-MM-DD') ===
    moment.parseZone().format('YYYY-MM-DD');

  useEffect(() => {
    if (matchDate) {
      setSelected(e.id);
    }
  }, []);

  return (
    <div key={index}>
      <div
        style={selected === e.id ? active : inactive}
        className="mainsch-card mt-3 mb-3"
        onClick={() => {
          handleClick(e.id);
          setCheck(false);
          setSelected(e.id);
        }}
      >
        <div className="card-header">
          <div
            className={`
            ${selected === e.id ? 'scheduled-day-active' : 'scheduled-day'}
          `}
          >
            {moment(e.date).format('MMM')}
          </div>
          <div className="event-date-day">
            {moment.parseZone(e.date).format('D')}
          </div>
          <div
            className={`
            ${selected === e.id ? 'scheduled-day-active' : 'scheduled-day'}
          `}
          >
            {moment.parseZone(e.date).format('ddd')}
          </div>
        </div>
        <div className="schedule-card-body p-3">
          <ul className="note-list">
            {notes?.length > 0 &&
              notes.map((note, index) => {
                return (
                  <Notes
                    index={index}
                    note={note}
                    handleCheck={handleCheck}
                    editNote={editNote}
                    handleDeleteNote={handleDeleteNote}
                    updatenote={updatenote}
                    updateid={updateid}
                    editnoteid={editnoteid?.includes(note?.id) ? true : false}
                    editClose={editClose}
                    updateNote={updateNote}
                    setNotetext={setNotetext}
                    handleChange={handleChange}
                  />
                );
              })}
          </ul>
          {addnote && noteid.includes(e?.id) ? (
            <div className="input-container-notes">
              <input
                type="text"
                className="note-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <img
                src={CheckIconNote}
                className="cursor-pointer px-2"
                onClick={() => {
                  addNote(e.id, text);
                  setText('');
                }}
              />
              <img
                src={CloseIconNote}
                className="cursor-pointer"
                onClick={() => closeAdd(e?.id)}
              />
            </div>
          ) : (
            <button className="addnote-btn" onClick={() => openNote(e)}>
              Add a note
            </button>
          )}
        </div>
        <div className="main-footer-card p-3">
          <div className="event-list-container">
            {events?.length > 0 ? (
              events?.map((ev, index) => {
                return (
                  <Events
                    ev={ev}
                    index={index}
                    editeventid={editeventid.includes(ev.id) ? true : false}
                    handleEvent={handleEvent}
                    updateEvent={updateEvent}
                    editEvent={editEvent}
                    eventClose={eventClose}
                  />
                );
              })
            ) : (
              <p className="fst-italic">There are no interviews scheduled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
