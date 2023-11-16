import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

const LogoBox = styled(Box)(() => ({
  paddingTop: 20,
  display: 'flex',
  alignItems: 'center'
}));

const Logo = ({ mobileOpen, type = 'big' }) => {
  return (
    <LogoBox>
      <img
        alt="Dragg"
        className={`${mobileOpen ? 'ps-4' : 'mx-4'}`}
        style={{ objectFit: 'contain' }}
        src={
          type === 'small'
            ? require('../../Images/LogoMark.png')
            : require('../../Images/WhiteLogo.png')
        }
        height={40}
        width={type === 'small' ? 40 : 104}
      />
    </LogoBox>
  );
};

export default Logo;
