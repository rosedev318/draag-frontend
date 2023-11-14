import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';


const LogoBox = styled(Box)(() => ({
  paddingTop: 20,
  display: 'flex',
  alignItems: 'center'
}));

const Logo = ({ mobileOpen }) => {
  return (
    <LogoBox>
      <img
        alt="Dragg"
        className={`${mobileOpen ? 'ps-4' : 'mx-3'}`}
        style={{ objectFit: 'contain' }}
        src={require('../../Images/WhiteLogo.png')}
        height={40}
        width={104}
      />
    </LogoBox>
  );
};

export default Logo;
