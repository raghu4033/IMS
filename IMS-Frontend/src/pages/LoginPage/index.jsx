import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import IMSLogo from "../../assets/Images/logo.png";
import ApiService from "../../Utils/ApiService";
import "./style.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      emailOrSid: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrSid: Yup.string().trim().required(),
      password: Yup.string().trim().required(),
    }),
    onSubmit: (data) => {
      login(data);
    },
  });

  const login = async (data) => {
    try {
      const resp = await ApiService.post(ApiService.ApiURLs.Login, data);
      if (resp.status === 200 && resp.data?.data?.token) {
        const token = resp.data?.data?.token || {};
        const role = resp.data?.data?.payload?.role || {};
        localStorage.setItem("ims:auth:token", token);
        localStorage.setItem("ims:auth:role", role);
        localStorage.setItem(
          "ims:auth:profile",
          JSON.stringify(resp.data?.data?.payload || {})
        );
        console.log(role)
        if (role === "ADMIN") {
          navigate("/");
        } else if (role === "FACULTY") {
          navigate("/view-profile");
        } else if (role === "STUDENT") {
          navigate("/student-profile");
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  console.log("errors", errors);

  return (
    <div className="ims-login-body">
      <div className="ims-login-box">
        <img className="ims-login-logo" src={IMSLogo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <input
            className="ims-login-input"
            type="text"
            name="emailOrSid"
            placeholder="Email Address or Student Id"
            onChange={handleChange}
            value={values.emailOrSid}
          />
          <input
            className="ims-login-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {/* <input className="ims-login-input" type="submit" value="Login" /> */}
          <button type="submit" disabled={loading} className="block">
            Login
          </button>
        </form>
        <div className="ims-links">
          <span onClick={() => navigate("/forgot-password")} className="ims-forgot-password">
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}
