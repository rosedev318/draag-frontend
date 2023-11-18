import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Box,
  Drawer,
  TextField,
  FormControlLabel
} from '@mui/material';
import './AddEventDrawer.css';
import {
  AddCircleOutlineOutlined,
  Close,
  Check,
  PanoramaFishEye
} from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from '../DatePicker/DatePicker';

const AddEventDrawer = (props) => {
  const { handleClose, saveEvent, event } = props;
  const inputRef = useRef(null);
  const [addingState, setAddingState] = useState(true);
  const [newNote, setNewNote] = useState('');
  const removeNote = (index) => {
    saveEvent({
      date: event.date,
      notes: event.notes.filter((n, i) => i != index)
    });
  };
  // const colseAdding = () => {
  //   setNewNote('');
  //   setAddingState(false);
  // }
  const setDate = (date) => {
    saveEvent({ date: date, notes: event.notes });
  };
  const handleBlur = (e) => {
    if (newNote) {
      saveEvent({ date: event.date, notes: [...event.notes, newNote] });
      setNewNote('');
    }
    setAddingState(false);
  };
  const handleKeyDown = (e) => {
    if (newNote && e.keyCode === 13) {
      saveEvent({
        date: event.date,
        notes: [...event.notes, newNote]
      });
      setAddingState(true);
      setNewNote('');
    }
  };
  const createNote = () => {
    setAddingState(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="day-event-box">
      <div className="day-event-header">
        <DatePicker label="Select Date" value={event.date} onChange={setDate} />
        <IconButton variant="text" onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <div className="day-event-body">
        {event.notes.map((note, index) => (
          <div className="w-100 d-flex align-center" key={index}>
            <PanoramaFishEye />
            <p className="m-0 ml-8px border-b-gray flex-1 lh-32px">{note}</p>
            <IconButton
              variant="text"
              onClick={() => {
                removeNote(index);
              }}
            >
              <Close />
            </IconButton>
          </div>
        ))}
        {(addingState || event?.notes?.length == 0) && (
          <div className="w-100 d-flex align-center">
            <PanoramaFishEye />
            <TextField
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              variant="standard"
              className="flex-1 ml-8px"
            />
            <IconButton variant="text">
              <Check />
            </IconButton>
          </div>
        )}
        <div className="w-100">
          <Button
            variant="text"
            className="mt-2 text-unset"
            onClick={createNote}
          >
            Add new event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEventDrawer;
