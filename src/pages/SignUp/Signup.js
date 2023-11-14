// import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollTop from '../../useScrollTop';
// import { useGoogleLogin, useGoogleAuth } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../Redux/Actions/AuthAction';
// import { loginGoogle } from '../../Redux/Actions/AuthAction';
import Input from '../../components/input/Input';
import { BsCheckLg } from 'react-icons/bs';
import GoogleButton from '../../components/Buttons/GoogleButton';
const Signup = () => {
  const dispatch = useDispatch();

  // const GoogleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     console.log('google response - ', tokenResponse, {
  //       Authorization: `Bearer ${tokenResponse.access_token}`,
  //       Accept: 'application/json'
  //     });
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenResponse.access_token}`,
  //             Accept: 'application/json'
  //           }
  //         }
  //       )
  //       .then((res) => {
  //         //  googleID, gmail, name, etc...
  //         console.log('googlw data : ', res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   },
  //   flow: 'implicit',
  //   prompt: 'consent'
  // });

  useScrollTop();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    termsAndConditions: false
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const loading = useSelector((state) => state.Auth.loading);

  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [length, setLength] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newvalue = type === 'checkbox' ? checked : value;
    const errors = {};

    if (formValues.passwordRepeat !== value.password) {
      errors.passwordRepeat = 'The password you entered do not match';
    }

    setFormValues({ ...formValues, [name]: newvalue });
    if (isSubmit) {
      setFormErrors(validate({ ...formValues, [name]: newvalue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      dispatch(userRegister(formValues));
    }
  };

  const validate = (value) => {
    // console.log('formValues :', formValues, value);
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // console.log('formValues.fname:  ', value);
    if (!value.firstName) {
      errors.firstName = 'First name is required!';
    }
    if (!value.lastName) {
      errors.lastName = 'Surname is required!';
    }
    if (!value.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(value.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!value.password) {
      errors.password = 'Password is required!';
    }
    // if (!confirmPassword) {
    //   setConfirmPasswordError('Confirm Password is required!');
    // } else if (confirmPassword !== value.password) {
    //   setConfirmPasswordError('Password do not match');
    // }

    if (!value.passwordRepeat) {
      errors.passwordRepeat = 'Confirm Password is required!';
    } else if (value.passwordRepeat !== value.password) {
      errors.passwordRepeat = 'The password you entered do not match';
    }

    if (value.termsAndConditions === false) {
      errors.termsAndConditions =
        'You must agree to our terms of service before proceeding.';
    }

    return errors;
  };

  const onPasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password });
    if (password.length === 0) {
      setTyping(false);
    } else {
      setTyping(true);
    }

    // Check for lowercase letter
    if (password.match(/[a-z]/)) {
      setLowercase(true);
    } else {
      setLowercase(false);
    }

    // check for uppercase letter
    if (password.match(/[A-Z]/)) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }

    // check for number
    if (password.match(/[0-9]/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }

    // check for special character
    if (password.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
      setSpecial(true);
    } else {
      setSpecial(false);
    }

    // check for length
    if (password.length >= 8) {
      setLength(true);
    } else {
      setLength(false);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#F6F6F6' }}>
        <div className="main-signup content-wrap-without-footer">
          <div className="signupcard password-center">
            <div className="s1 m-auto">
              <h3 className="p-4">Sign up to Draag</h3>
              <form onSubmit={handleSubmit}>
                <div className="signup">
                  <div className="">
                    <Input
                      type="text"
                      className="input-field-fname"
                      label="First name *"
                      value={formValues.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                    <small className="err-msg-fname d-flex">
                      {formErrors.firstName}
                    </small>
                  </div>

                  <div className="">
                    <Input
                      type="text"
                      className="input-field-surname"
                      label="Surname *"
                      value={formValues.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                    <small className="err-msg-surname d-flex">
                      {' '}
                      {formErrors.lastName}{' '}
                    </small>
                  </div>
                </div>
                <div className="">
                  <Input
                    type="email"
                    className="input-field-email"
                    label="Email *"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <div className="sign-email-err d-flex ">
                    {formErrors.email}
                  </div>
                </div>

                <div>
                  <Input
                    className="input-field-email"
                    type="password"
                    label="Password *"
                    value={formValues.password}
                    onChange={onPasswordChange}
                    name="password"
                  />
                </div>
                {typing && (
                  <>
                    <p className="error-message">
                      {!lowercase && formValues.password.length > 0 ? (
                        <span>
                          <BsCheckLg /> One lowercase character
                        </span>
                      ) : (
                        lowercase &&
                        formValues.password.length > 0 && (
                          <span className="green">
                            <BsCheckLg /> One lowercase character
                          </span>
                        )
                      )}
                      <br />
                      {!uppercase && formValues.password.length > 0 ? (
                        <span>
                          <BsCheckLg /> One uppercase character
                        </span>
                      ) : (
                        uppercase &&
                        formValues.password.length > 0 && (
                          <span className="green">
                            <BsCheckLg /> One uppercase character
                          </span>
                        )
                      )}
                      <br />
                      {!number && formValues.password.length > 0 ? (
                        <span>
                          <BsCheckLg /> One number
                        </span>
                      ) : (
                        number &&
                        formValues.password.length > 0 && (
                          <span className="green">
                            <BsCheckLg /> One number
                          </span>
                        )
                      )}
                      <br />
                      {!special && formValues.password.length > 0 ? (
                        <span>
                          <BsCheckLg /> One special character
                        </span>
                      ) : (
                        special &&
                        formValues.password.length > 0 && (
                          <span className="green">
                            <BsCheckLg /> One special character
                          </span>
                        )
                      )}
                      <br />
                      {!length && formValues.password.length > 0 ? (
                        <span>
                          <BsCheckLg /> 8 character minimum
                        </span>
                      ) : (
                        length &&
                        formValues.password.length > 0 && (
                          <span className="green">
                            <BsCheckLg /> 8 character minimum
                          </span>
                        )
                      )}
                    </p>
                  </>
                )}
                <div className="sign-email-err">
                  {formValues.password === '' && formErrors.password}
                </div>
                <div className="">
                  <Input
                    type="password"
                    className="input-field-email"
                    label="Confirm Password *"
                    name="passwordRepeat"
                    value={formValues.passwordRepeat}
                    onChange={handleChange}
                  />
                </div>
                <div className="sign-email-err">
                  {formErrors.passwordRepeat}
                </div>
                <div className="container mt-3 s2">
                  <p className="termstext">
                    <>
                      <input
                        className="termsinput"
                        type="checkbox"
                        name="terms1"
                        id="cb1"
                      />
                      Send me information about new products, deal and
                      everything related to my account.
                      <br />
                    </>
                  </p>
                  <p className="termstext-two">
                    <>
                      <input
                        className="termsinput"
                        value={formValues.termsAndConditions}
                        onChange={handleChange}
                        type="checkbox"
                        name="termsAndConditions"
                      />
                      By clicking the submit button below, I hereby agree to and
                      accept the following{' '}
                      <span style={{ color: '#4285F4', fontSize: '15px' }}>
                        terms of service
                      </span>{' '}
                      and{' '}
                      <span style={{ color: '#4285F4', fontSize: '15px' }}>
                        Privacy policy
                      </span>
                    </>
                    <div className="terms-err">
                      {formErrors.termsAndConditions}
                    </div>
                  </p>
                </div>
                <button
                  className="disbtn accountbtn mt-3 p-1"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      Create account
                      <div
                        className="spinner-border"
                        style={{ marginLeft: 10 }}
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    <span>Create account</span>
                  )}
                </button>
              </form>
              <div className="separator">&nbsp;&nbsp;or&nbsp;&nbsp;</div>
              <div className="g_body mt-3">
                <GoogleButton />

                {/* <button className="g-button" onClick={() => GoogleLogin()}>
                  <img
                    className="g-logo"
                    src={require('../../Images/google.png')}
                    alt="Google Logo"
                  />
                  <p className="g-text continue-google">
                    Continue in with Google
                  </p>
                </button> */}
              </div>
              <p className="logintext pt-3">
                Already have an account?{' '}
                <span>
                  <Link className="loginbtn text-decoration-none" to="/">
                    Log in
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
