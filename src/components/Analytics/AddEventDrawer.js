import React, { useEffect, useState } from 'react';
import { Button, IconButton, Box, Drawer } from '@mui/material';
import './AddEventDrawer.css';
import { AddCircleOutlineOutlined } from '@mui/icons-material';

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
        <Box sx={{color: '#BAB7B7', fontSize: '16px', lineHeight: '20px'}}>
          Input data about your activities, enabling you to track your progress effectively.<br />
          By doing so, you can gain insights into what is working well for you and what 
          you need to avoid in your journey.
        </Box>
      </div>
    </Drawer>
    </>
  );
};

export default AddEventDrawer;
