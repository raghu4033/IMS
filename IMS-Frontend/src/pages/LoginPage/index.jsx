import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import IMSLogo from '../../assets/Images/logo.png';
import ApiService from '../../Utils/ApiService';
import './style.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      emailOrSid: '',
      password: '',
    },
    validationSchema: Yup.object({
      emailOrSid: Yup.string()
        .trim()
        .required('Email address is required.')
        .typeError('Email address is required.'),
      password: Yup.string()
        .trim()
        .required('Password is required')
        .typeError('Password is required'),
    }),
    onSubmit: (data) => {
      login(data);
    },
  });

  const login = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.Login, data);
      if (resp.status === 200 && resp.data?.data?.token) {
        const token = resp.data?.data?.token || {};
        const role = resp.data?.data?.payload?.role || {};
        localStorage.setItem('ims:auth:token', token);
        localStorage.setItem('ims:auth:role', role);
        localStorage.setItem(
          'ims:auth:profile',
          JSON.stringify(resp.data?.data?.payload || {})
        );
        console.log(role);
        if (role === 'ADMIN') {
          navigate('/');
        } else if (role === 'FACULTY') {
          navigate('/dashboard');
        } else if (role === 'STUDENT') {
          navigate('/dashboard');
        }
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ||
          'Something went wrong. please try again later.'
      );
      setLoading(false);
    }
  };

  console.log('errors', errors);

  return (
    <div className="ims-login-body">
      <div className="ims-login-box">
        <img className="ims-login-logo" src={IMSLogo} alt="Logo" />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* <div className="form-box"> */}
            <div className="form-group input-box">
              <input
                type="text"
                name="emailOrSid"
                placeholder="Email Address"
                onChange={handleChange}
                value={values.emailOrSid}
              />
              {touched?.emailOrSid && errors?.emailOrSid ? (
                <span className="error-text">{errors?.emailOrSid}</span>
              ) : (
                <></>
              )}
            </div>
            {/* </div> */}
            <div className="form-group input-box">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {touched?.password && errors?.password ? (
                <span className="error-text">{errors?.password}</span>
              ) : (
                <></>
              )}
            </div>
            {/* <input className="ims-login-input" type="submit" value="Login" /> */}
            <button type="submit" disabled={loading} className="block">
              Login
            </button>
            {errorMessage ? (
              <div className="error-text">{errorMessage}</div>
            ) : (
              <></>
            )}
          </form>
        </div>
        <div className="ims-links">
          <span
            onClick={() => navigate('/forgot-password')}
            className="ims-forgot-password"
          >
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}
