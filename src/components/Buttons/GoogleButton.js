import { GoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../../Redux/Actions/AuthAction';

const GoogleButton = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(390);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    if (screenSize.width < 480) {
      setWidth(250);
    } else {
      setWidth(390);
    }
  }, [screenSize]);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  return (
    <div>
      <GoogleLogin
        onSuccess={(res) => {
          // console.log('res', res);
          dispatch(loginGoogle({ id_token: res.credential }));
        }}
        theme="filled_blue"
        size="large"
        text="Sign in with Google"
        shape="pill"
        width={width}
        logo_alignment="left"
        onError={(err) => {
          console.log('err : ', err);
        }}
      />
    </div>
  );
};

export default GoogleButton;
