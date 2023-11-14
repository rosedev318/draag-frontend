import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import useScrollTop from '../../useScrollTop';
import Input from '../../components/input/Input';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Key from '../../Images/key.svg';
import GoogleButton from '../../components/Buttons/GoogleButton';
// import { useDispatch } from 'react-redux';
// import { loginGoogle } from '../../Redux/Actions/AuthAction';

const Login = () => {
  useScrollTop();
  const initialValues = { username: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const navigate = useNavigate();

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
      navigate('/loginwithemail', { state: { username: formValues.username } });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = 'Email is required!';
    } else if (!regex.test(values.username)) {
      errors.username = 'This is not a valid email format!';
    }

    return errors;
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (res) => console.log('res', res)
  // });

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center content-wrap">
        <div className="logincard mt-5">
          <h3 className="p-4">Log in to Draag</h3>
          <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={`input-container ${isInputFocused ? 'focused' : ''}`}
              >
                <Input
                  label="Enter username or email"
                  value={formValues.username}
                  onChange={handleChange}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  name="username"
                />

                {isInputFocused && (
                  <>
                    <img src={Key} className="arrow-down d-none" />
                    <KeyOutlinedIcon className="key " />
                    <KeyboardArrowDownOutlinedIcon className="arrow-down " />
                    {/* <i className="fa-solid fa-key"></i> */}
                    {/* <i className="fa-solid fa-angle-down"></i> */}
                  </>
                )}
                <div className="usererror-login-email">
                  {formErrors.username}
                </div>
              </div>
            </div>
            <button className="emailbtn mt-4 p-1">Continue with Email</button>
          </form>
          <div className="or separator">&nbsp;&nbsp;or&nbsp;&nbsp;</div>

          {/* <button className="googlebtn mt-3 p-1">Continue with Google</button> */}
          <div className="g_body mt-4">
            {/* <button className="g-button" onClick={() => googleLogin()}>
              <img
                className="g-logo"
                src={require('../../Images/google.png')}
                alt="Google Logo"
              />
              <p className="g-text">Sign in with Google</p>
            </button> */}
            <GoogleButton />
          </div>

          <div className="p80">
            <div className="or-2 separator dont-account pb-4">
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

export default Login;
