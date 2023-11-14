import { FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';
import { inputLabelClasses } from '@mui/material/InputLabel';

const SelectField = (props) => {
  const {
    label,
    children,
    className,
    size,
    onChange,
    value,
    name,
    error,
    multiple
  } = props;

  return (
    <div>
      <FormControl fullWidth error={error} size={size}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className={className}
          size={size}
          onChange={onChange}
          value={value}
          name={name}
          label={label}
          error={error}
          inputlabelprops={{
            sx: {
              color: '#E7E7E7',
              [`&.${inputLabelClasses.shrink}`]: {
                color: 'rgba(0, 0, 0, 0.6)'
              }
            }
          }}
        >
          {children}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
