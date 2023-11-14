import React, { useEffect, useState } from 'react';
import { ListItemIcon, Button, Divider, Menu, MenuItem } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import './DatePicker.css';
import moment from 'moment';

const DatePicker = (props) => {
  const { label } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [value, setValue] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val) => {
    if (val) {
        setValue(val);
    }
    setPickerVisible(false);
    setAnchorEl(null);
  };
  const handleChange = (val, state) => {
    if(state == 'finish') {
        setValue(moment(val.$d).format('MM/DD/YYYY'));
        setAnchorEl(null);
        setPickerVisible(false);
    }
  }
  const showPicker = () => {
    setPickerVisible(true);
  }

  return (
    <>
        <Button
            variant="text"
            sx={{ color: '#262525', backgroundColor: '#e2e8f0', textTransform: 'unset' }}
            className='btn-gray mt-2'
            onClick={handleClick}
        >
            <CalendarMonth sx={{ color: '#0B66E4', marginRight: '6px' }} />{ value ? value : label }
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            className='datepicker-container'
            onClose={() => {handleClose()}}
        >
            { pickerVisible
                ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar onChange={handleChange} />
                </LocalizationProvider>
                : <div>
                    <h6 className='menu-title'>Suggestions</h6>
                    <MenuItem onClick={() => {handleClose(moment().format('MM/DD/YYYY'))}}>
                    <ListItemIcon>
                        <CalendarMonth />
                    </ListItemIcon>
                    <div className='label-content'>
                        <span className='title'>Today</span>
                        <span className='sub-title'>{ moment().format('MM/DD/YYYY') }</span>
                    </div>
                    </MenuItem>
                    <MenuItem onClick={() => {handleClose(moment().add(1, 'days').format('MM/DD/YYYY'))}}>
                    <ListItemIcon>
                        <CalendarMonth />
                    </ListItemIcon>
                    <div className='label-content'>
                        <span className='title'>Tomorrow</span>
                        <span className='sub-title'>{ moment().add(1, 'days').format('MM/DD/YYYY') }</span>
                    </div>
                    </MenuItem>
                    <MenuItem onClick={() => {handleClose(moment().endOf('week').add(1, 'days').format('MM/DD/YYYY'))}}>
                    <ListItemIcon>
                        <CalendarMonth />
                    </ListItemIcon>
                    <div className='label-content'>
                        <span className='title'>Next Weekend</span>
                        <span className='sub-title'>{moment().endOf('week').add(1, 'days').format('MM/DD/YYYY')}</span>
                    </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={showPicker}>
                        <ListItemIcon>
                            <CalendarMonth />
                        </ListItemIcon>
                        <div className='label-content'>
                            <span className='title'>Custom...</span>
                            <span className='sub-title'>Use the calendar to pick a date</span>
                        </div>
                    </MenuItem>
                </div>
            }
        </Menu>
    </>
  );
};

export default DatePicker;
