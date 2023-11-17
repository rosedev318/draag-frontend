import React, { useEffect, useState } from 'react';
import { Button, IconButton, Box, Drawer, TextField, FormControlLabel } from '@mui/material';
import './AddEventDrawer.css';
import { AddCircleOutlineOutlined, Close, PanoramaFishEye } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from '../DatePicker/DatePicker';
import EventCard from './EventCard';
import { createEvent } from '../../Redux/Actions/AnalyticsAction';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddEventDrawer = (props) => {
  const dispatch = useDispatch();
  const [addingEvent, setAddingEvent] = useState(false);
  const [eventsByDay, setEventsByDay] = useState([{
    date: '',
    notes: []
  }]);

  const saveEventsByDate = () => {
    if(eventsByDay.length && eventsByDay.every(e => e.date && e?.notes.length)) {
      dispatch(
        createEvent(eventsByDay.map(event => {
          return {
            date: moment(event.date, "MM/DD/YYYY").unix(),
            notes: event.notes
          }
        }))
      ).then((data) => {
        setEventsByDay([{
          date: '',
          notes: []
        }])
        setAddingEvent(false)
      });
    } else {
      toast.error('Please check events.', { autoClose: 1500 });
    }
  }
  const saveEvent = (index, newEvent) => {
    setEventsByDay(eventsByDay.map((event, i) => {
      if(index == i)
        return newEvent
      else
        return event
    }))
  }
  const addEventByDay = () => {
    if(eventsByDay?.length == 0 || eventsByDay.some(e => !e.date)) {
      toast.error('Please select a date for the event.', { autoClose: 1500 });
    }else if(eventsByDay?.length == 0 || eventsByDay.some(e => !e?.notes?.length)) {
      toast.error('Please input at least one note for the event.', { autoClose: 1500 });
    } else {
      setEventsByDay([
        ...eventsByDay,
        {
          date: '',
          notes: []
        }
      ]);
    }
  }

  return (
    <>
    <Button
      variant="text"
      sx={{ color: '#262525' }}
      className='add-event-btn mt-4 mb-3'
      onClick={() => {setAddingEvent(true)}}
    >
      <AddCircleOutlineOutlined sx={{ color: '#0B66E4', marginRight: '6px' }} />Add an event
    </Button>
    <Drawer
      anchor={'right'}
      open={addingEvent}
      onClose={() => {setAddingEvent(false)}}
    >
      <div className='add-event-container'>
        <div className='d-flex justify-between items-center w-full'>
          <h3>Add an event</h3>
        </div>
        <Box sx={{color: '#BAB7B7', fontSize: '14px', lineHeight: '20px'}}>
          Input data about your activities, enabling you to track your progress effectively.
          By doing so, you can gain insights into what is working well for you and what 
          you need to avoid in your journey.
        </Box>
        <Box sx={{marginTop: '32px'}}>
          {
            eventsByDay.map((event, index) => 
              <EventCard
                key={index}
                event={event}
                saveEvent={(e) => {saveEvent(index, e)}}
                handleClose={() => {setEventsByDay(eventsByDay.filter((e, i) => i != index))}}
              />
            )
          }
          <div className='w-100 d-flex flex-row-reverse'>
            <Button
              variant="text"
              className='mt-2 text-unset'
              onClick={() => {addEventByDay()}}
            >
              Add another event
            </Button>
          </div>
          <div className='w-100 d-flex flex-row-reverse'>
            <Button
              variant="contained"
              onClick={saveEventsByDate}
              className='mt-2 text-unset'
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </Drawer>
    </>
  );
};

export default AddEventDrawer;
