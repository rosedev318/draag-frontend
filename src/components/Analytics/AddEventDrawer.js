import React, { useEffect, useState } from 'react';
import { Button, IconButton, Box, Drawer, TextField, FormControlLabel } from '@mui/material';
import './AddEventDrawer.css';
import { AddCircleOutlineOutlined, CalendarMonth } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from '../DatePicker/DatePicker';

const AddEventDrawer = (props) => {
//   const { timezone, handleChange } = props;
  const [addingEvent, setAddingEvent] = useState(false);

  return (
    <>
    <Button
      variant="text"
      sx={{ color: '#262525' }}
      className='add-event-btn mt-2'
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
          <IconButton
            variant="text"
            sx={{ color: '#262525' }}
            className='add-event-btn'
            onClick={() => {}}
          >
            <AddCircleOutlineOutlined sx={{ color: '#0B66E4' }} />
          </IconButton>
        </div>
        <Box sx={{color: '#BAB7B7', fontSize: '16px', lineHeight: '20px', marginTop: '16px'}}>
          Input data about your activities, enabling you to track your progress effectively.
          By doing so, you can gain insights into what is working well for you and what 
          you need to avoid in your journey.
        </Box>
        <Box sx={{marginTop: '16px'}}>
        </Box>
        <Box className="mt-16px">
          <DatePicker label="Add date" />
        </Box>
      </div>
    </Drawer>
    </>
  );
};

export default AddEventDrawer;
