import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

const LogoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

const Logo = ({ mobileOpen, type = 'big' }) => {
  return (
    <LogoBox>
      <img
        alt="Dragg"
        className={`${mobileOpen ? 'ps-4' : 'ps-0'}`}
        style={mobileOpen ? { objectFit: 'contain' } : { marginLeft: '30px' }}
        src={type === 'small' ? './LogoMark.png' : '/WhiteLogo.png'}
        height={30}
        width={type === 'small' ? 30 : 85}
      />
    </LogoBox>
  );
};

export default Logo;
