import React, { useEffect, useState } from 'react';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers';

const DateField = (props) => {
  const {
    className,
    onChange,
    label,
    name,
    value,
    error,
    defaultValue,
    slotProps,
    inputVariant,
    edit
  } = props;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (edit) {
      setSelected(true);
    }
  }, [edit]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div onClick={() => setSelected(true)}>
          <MobileDatePicker
            label={label}
            onChange={onChange}
            className={className}
            name={name}
            value={value || null}
            error={error}
            defaultValue={defaultValue || null}
            slotProps={slotProps}
            inputVariant={inputVariant}
            inputFormat="YYYY-MM-DD"
            InputProps={{ sx: { color: '#E7E7E7' } }}
            disabled={!selected}
          />
        </div>
      </LocalizationProvider>
    </>
  );
};

export default DateField;
