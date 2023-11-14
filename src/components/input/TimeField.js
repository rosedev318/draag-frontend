import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const TimeField = (props) => {
  const { label, className, name, value, slotProps, onChange, edit } = props;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (edit) {
      setSelected(true);
    }
  }, [edit]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div onClick={() => setSelected(true)}>
          <TimePicker
            ampm={false}
            value={value}
            label={label}
            className={className}
            name={name}
            slotProps={slotProps}
            onChange={onChange}
            format="hh:mm"
            disabled={!selected}
            // defaultValue={defaultValue}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default TimeField;
