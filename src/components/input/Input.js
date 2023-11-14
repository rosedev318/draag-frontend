import { TextField } from '@mui/material';
import React from 'react';

const Input = (props) => {
  const {
    label,
    value,
    onChange,
    name,
    onFocus,
    onBlur,
    className,
    type,
    helperText,
    error,
    size,
    rows,
    multiline,
    style,
    sx,
    InputLabelProps
  } = props;

  return (
    <div>
      <div component="form" noValidate autoComplete="off">
        <TextField
          label={label}
          onChange={onChange}
          value={value}
          name={name}
          variant="outlined"
          onFocus={onFocus}
          onBlur={onBlur}
          className={className}
          type={type}
          helperText={helperText}
          error={error}
          size={size}
          rows={rows}
          multiline={multiline}
          style={style}
          sx={sx}
          InputLabelProps={InputLabelProps}
        />
      </div>
    </div>
  );
};

export default Input;
