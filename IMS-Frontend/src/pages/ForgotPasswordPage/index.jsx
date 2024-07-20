// src/pages/ForgotPasswordPage.jsx

import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import ApiService from '../../Utils/ApiService';
import './style.css'; 
import IMSLogo from "../../assets/Images/logo.png";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState('request'); 
  const [loading, setLoading] = useState(false);

  const requestFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await ApiService.post(ApiService.ApiURLs.ForgotPassword, values);
        setStep('verify');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const verifyFormik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string().required('OTP is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await ApiService.post(ApiService.ApiURLs.VerifyOTP, values);
        setStep('reset');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const resetFormik = useFormik({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await ApiService.post(ApiService.ApiURLs.ResetPassword, values);
        // Redirect or notify user of success
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="ims-login-body">
      <div className="ims-login-box">
        <img className="ims-login-logo" src={IMSLogo} alt="Logo" />
        {step === 'request' && (
          <form onSubmit={requestFormik.handleSubmit}>
            <h2 className="ims-login-heading">Forgot Password</h2>
            <input
              className="ims-login-input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={requestFormik.handleChange}
              value={requestFormik.values.email}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Forgot Password'}
            </button>
          </form>
        )}
        {step === 'verify' && (
          <form onSubmit={verifyFormik.handleSubmit}>
            <h2 className="ims-login-heading">Enter OTP</h2>
            <input
              className="ims-login-input"
              type="text"
              name="otp"
              placeholder="OTP"
              onChange={verifyFormik.handleChange}
              value={verifyFormik.values.otp}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={resetFormik.handleSubmit}>
            <h2 className="ims-login-heading">Set New Password</h2>
            <input
              className="ims-login-input"
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={resetFormik.handleChange}
              value={resetFormik.values.newPassword}
            />
            <input
              className="ims-login-input"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter New Password"
              onChange={resetFormik.handleChange}
              value={resetFormik.values.confirmPassword}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Setting...' : 'Set Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
