import React, { useEffect, useState } from 'react';
import { Button, IconButton, Box, Drawer, TextField, FormControlLabel } from '@mui/material';
import './AddEventDrawer.css';
import { AddCircleOutlineOutlined, Close, PanoramaFishEye } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from '../DatePicker/DatePicker';

const AddEventDrawer = (props) => {
  const [addingState, setAddingState] = useState(false);

  return (
    <div className='day-event-box'>
      <div className='day-event-header'>
        <DatePicker label="Select Date" />
        <IconButton
          variant="text"
          onClick={() => {}}
        >
          <Close />
        </IconButton>
      </div>
      <div className='day-event-body'>
        <div className='w-100 d-flex align-center'>
          <PanoramaFishEye />
          <p className='m-0 ml-8px border-b-gray flex-1 lh-32px'>FB Campain</p>
        </div>
        <div className='w-100 d-flex align-center'>
          <PanoramaFishEye />
          <TextField variant="standard" className='flex-1 ml-8px' />
        </div>
        <div className='w-100'>
          <Button
            variant="text"
            className='mt-2 text-unset'
          >
            Add New Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEventDrawer;
