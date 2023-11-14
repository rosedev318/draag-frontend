import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import useScrollTop from '../../useScrollTop';

const PasswordSend = () => {
  useScrollTop();

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center content-wrap">
        <div className="passwordsend-card mt-5 mb-5 password-center">
          <div className="success-check">
            <CheckCircleOutlineOutlinedIcon className="success-check" />
          </div>
          <p className="success-text">
            We've sent you an email with instructions on how to reset your
            password.{' '}
          </p>
          <span className="">
            <Link className="text-decoration-none backlogin-text" to="/">
              Back to Log in
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordSend;
