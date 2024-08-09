// src/pages/ForgotPasswordPage.jsx

import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ApiService from '../../Utils/ApiService';
import IMSLogo from '../../assets/Images/logo.png';
import './style.css';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState('request');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      newPassword: Yup.string().required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const resp = await ApiService.post(
          ApiService.ApiURLs.resetPassword,
          values
        );
        if (resp.status === 200 && resp.data?.data?.changed) {
          console.log('Password changed');
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const verifyFormik = useFormik({
    initialValues: { email: '', otp: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      otp: Yup.string().required('OTP is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const resp = await ApiService.post(
          ApiService.ApiURLs.forgotPasswordVerifyOTP,
          values
        );
        if (resp.status === 200 && resp.data?.data?.verified) {
          resetFormik.setFieldValue('email', values.email);
          setStep('reset');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const requestFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email address is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const resp = await ApiService.post(
          ApiService.ApiURLs.forgotPasswordSendOTP,
          values
        );
        if (resp.status === 200 && resp.data?.data) {
          verifyFormik.setFieldValue('email', values.email);
          setStep('verify');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  console.log(requestFormik.errors);

  return (
    <div className="ims-login-body">
      <div className="ims-login-box">
        <img className="ims-login-logo" src={IMSLogo} alt="Logo" />
        {step === 'request' && (
          <form onSubmit={requestFormik.handleSubmit}>
            <div className="input-box">
              <h2 className="ims-login-heading">Forgot Password</h2>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={requestFormik.handleChange}
                value={requestFormik.values.email}
              />
              {requestFormik?.touched?.email && requestFormik?.errors?.email ? (
                <span className="error-text">
                  {requestFormik?.errors?.email}
                </span>
              ) : (
                <></>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Forgot Password'}
            </button>
          </form>
        )}
        {step === 'verify' && (
          <form onSubmit={verifyFormik.handleSubmit}>
            <h2 className="ims-login-heading">Enter OTP</h2>
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email"
                disabled
                value={verifyFormik.values.email}
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                onChange={verifyFormik.handleChange}
                value={verifyFormik.values.otp}
              />
              {verifyFormik?.touched?.otp && verifyFormik?.errors?.otp ? (
                <span className="error-text">{verifyFormik?.errors?.otp}</span>
              ) : (
                <></>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={resetFormik.handleSubmit}>
            <h2 className="ims-login-heading">Set New Password</h2>
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email"
                disabled
                value={resetFormik.values.email}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={resetFormik.handleChange}
                value={resetFormik.values.newPassword}
              />
              {resetFormik?.touched?.newPassword &&
              resetFormik?.errors?.newPassword ? (
                <span className="error-text">
                  {resetFormik?.errors?.newPassword}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter New Password"
                onChange={resetFormik.handleChange}
                value={resetFormik.values.confirmPassword}
              />
              {resetFormik?.touched?.confirmPassword &&
              resetFormik?.errors?.confirmPassword ? (
                <span className="error-text">
                  {resetFormik?.errors?.confirmPassword}
                </span>
              ) : (
                <></>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Setting...' : 'Set Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
