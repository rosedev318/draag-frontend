import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { resetPassword } from '../../Redux/Actions/AuthAction';
import Input from '../../components/input/Input';

const PasswordReset = () => {
  const { code } = useParams();
  const initialValues = { password: '', passwordRepeat: '', code };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Auth.loading);
  console.log('loading --- PasswordReset', loading);

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
      dispatch(resetPassword(formValues));
    }
  };

  const validate = (value) => {
    const errors = {};

    if (!value.password) {
      errors.password = 'Password is required!';
    }

    if (!value.passwordRepeat) {
      errors.passwordRepeat = 'Confirm Password is required!';
    } else if (value.passwordRepeat !== value.password) {
      errors.passwordRepeat = 'The passwords you entered do not match';
    }

    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center content-wrap">
        <div className="forgetpass-card mt-5" style={{ height: 'auto' }}>
          <h3 className="p-4">Password Reset</h3>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="input-container">
                <Input
                  type="password"
                  // style={{ border: '2px solid #2F8AE1' }}
                  className=""
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  label="Enter new password here"
                />
                <div className="usererror-login-email">
                  {formErrors.password}
                </div>
              </div>
              <div className="input-container mt-3">
                <Input
                  type="password"
                  className=""
                  label="Confirm new password here"
                  name="passwordRepeat"
                  onChange={handleChange}
                  value={formValues.passwordRepeat}
                />
                <div className="usererror-login-email">
                  {formErrors.passwordRepeat}
                </div>
              </div>
            </div>
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
            <Link className="text-decoration-none text-dark" to="/">
              Back to Log in
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordReset;
