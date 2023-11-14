import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import Select from '@mui/material/Select';

const MultiSelectField = (props) => {
  const {
    children,
    multiple,
    onChange,
    value,
    renderValue,
    name,
    size,
    label,
    className
  } = props;

  return (
    <div>
      <FormControl fullWidth size={size}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          value={value}
          name={name}
          onChange={onChange}
          //   input={<OutlinedInput label="Tag" />}
          renderValue={renderValue}
          size={size}
          label={label}
          className={className}
        >
          {children}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectField;
