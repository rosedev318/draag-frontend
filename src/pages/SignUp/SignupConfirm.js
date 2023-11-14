import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import useScrollTop from '../../useScrollTop';

const SignupConfirm = () => {
  const user = useSelector((state) => state.Auth.user);
  console.log('User', user);

  useScrollTop();
  return (
    <>
      <Navbar />
      <div className="signup-success-card content-wrap">
        <img
          src={require('../../Images/envelop.png')}
          className="img-fluid envelop-img"
          alt="Envelop"
        />
        <p className="signup-success-text">
          Please confirm your email to complete registration.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SignupConfirm;
