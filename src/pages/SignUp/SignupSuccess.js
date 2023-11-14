import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Link, useParams } from 'react-router-dom';
import { signinSuccess } from '../../Redux/Actions/AuthAction';
import { useDispatch } from 'react-redux';

const SignupSuccess = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    // console.log('============token', token);
    if (token) {
      dispatch(signinSuccess(token));
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center content-wrap">
        <div className="">
          <div className="success-check">
            <CheckCircleOutlineOutlinedIcon className="success-check" />
          </div>
          <p className="success-text pt-0">your email has been confirmed.</p>
          <span className="d-flex align-items-center justify-content-center">
            <Link
              className="text-decoration-none"
              style={{ color: 'grey' }}
              to="/"
            >
              Back to Log in
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupSuccess;
