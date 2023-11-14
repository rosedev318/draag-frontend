import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { forgetPassword } from '../../Redux/Actions/AuthAction';
import useScrollTop from '../../useScrollTop';
import Input from '../../components/input/Input';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const ForgetPassword = () => {
  useScrollTop();
  const initialValues = { email: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dispatch = useDispatch();
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
      dispatch(forgetPassword(formValues));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center content-wrap">
        <div className="forgetpass-card mt-5">
          <h3 className="p-4">Forgot Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={`input-container ${isInputFocused ? 'focused' : ''}`}
              >
                <Input
                  type="text"
                  className=""
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  name="email"
                  label="Enter Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                {isInputFocused && (
                  <>
                    <KeyOutlinedIcon className="key" />
                    <KeyboardArrowDownOutlinedIcon className="arrow-down" />
                  </>
                )}
                <div className="usererror-login-email">{formErrors.email}</div>
              </div>
            </div>
            <span className="mt-5"></span>

            <button
              className="disbtn reset-passwordbtn mt-4 p-1"
              disabled={loading}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center">
                  Reset my password
                  <div
                    className="spinner-border"
                    style={{ marginLeft: 10 }}
                    role="status"
                  ></div>
                </div>
              ) : (
                <span>Reset my password</span>
              )}
            </button>
          </form>
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

export default ForgetPassword;
