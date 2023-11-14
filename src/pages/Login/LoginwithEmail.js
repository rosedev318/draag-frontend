import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { userLogin } from '../../Redux/Actions/AuthAction';
import useScrollTop from '../../useScrollTop';
import Input from '../../components/input/Input';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
// import { FaKey } from 'react-icons/fa';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import GoogleButton from '../../components/Buttons/GoogleButton';

const LoginwithEmail = () => {
  useScrollTop();
  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputFocusedTwo, setIsInputFocusedTwo] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();

  const loading = useSelector((state) => state.Auth.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (isSubmit) {
      setFormErrors(validate({ ...formValues, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      dispatch(userLogin(formValues, navigation));
    }
  };

  useEffect(() => {
    setFormValues({ ...formValues, username: location.state?.username || '' });
  }, []);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = 'Email is required!';
    } else if (!regex.test(values.username)) {
      errors.username = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    }

    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center content-wrap">
        <div className="logincard mt-5" style={{ height: '662px' }}>
          <h3 className="p-4">Log in to Draag</h3>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                className={`input-container ${isInputFocused ? 'focused' : ''}`}
              >
                <Input
                  type="text"
                  label="Enter username or email"
                  value={formValues.username}
                  onChange={handleChange}
                  name="username"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                {isInputFocused && (
                  <>
                    {/* <FaKey className="fa-key" />
                    <KeyboardArrowDownOutlinedIcon className="fa-angle-down" /> */}
                    {/* <i className="fa-solid fa-key"></i>
                    <i className="fa-solid fa-angle-down"></i> */}
                  </>
                )}
                <div className="usererror-login-email">
                  {formErrors.username}
                </div>
              </div>
              <div
                className={`input-container mt-4 ${
                  isInputFocusedTwo ? 'focused' : ''
                }`}
              >
                <Input
                  type="password"
                  className=""
                  label="Enter password"
                  value={formValues.password}
                  onChange={handleChange}
                  onFocus={() => setIsInputFocusedTwo(true)}
                  onBlur={() => setIsInputFocusedTwo(false)}
                  name="password"
                />
                {isInputFocusedTwo && (
                  <>
                    <KeyOutlinedIcon className="key" />
                    <KeyboardArrowDownOutlinedIcon className="arrow-down" />
                    {/* <i className="fa-solid fa-key"></i>
                    <i className="fa-solid fa-angle-down"></i> */}
                  </>
                )}
                <div className="usererror-login-email">
                  {formErrors.password}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link to="/forgetpassword" className="text-decoration-none">
                <span className="forget-text">Forgot password?</span>
              </Link>
              <br />
              <button className="disbtn login-btn" disabled={loading}>
                {loading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    Login
                    <div
                      className="spinner-border"
                      style={{ marginLeft: 10 }}
                      role="status"
                    ></div>
                  </div>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>
          <div className="or separator">&nbsp;&nbsp;or&nbsp;&nbsp;</div>

          {/* <button className="googlebtn mt-3 p-1">Continue with Google</button> */}
          <div className="g_body mt-4">
            <GoogleButton />
            {/* <button className="g-button" onClick={() => GoogleLogin()}>
              <img
                className="g-logo"
                src={require('../../Images/google.png')}
                alt="Google Logo"
              />
              <p className="g-text continue-google">Continue in with Google</p>
            </button> */}
          </div>

          <div className="p60">
            <div className="or-2 separator dont-account pb-3">
              &nbsp;&nbsp;Don't have a Dragg account?&nbsp;&nbsp;
            </div>
            <Link to="/signup">
              <button className="signupbtn p-1">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginwithEmail;
