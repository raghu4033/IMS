import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const StudentInquiryForm = ({ getStudentInquiries, open, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getCourses);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setCourses(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const saveStudentInquiries = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveStudentInquiries,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log("Student Inquiry saved successfully.");
        onClose();
        getStudentInquiries();
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ||
          "Something went wrong. please try again later."
      );
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobile: "",
      whatsapp: "",
      joiningDate: "",
      dob: "",
      qualification: "",
      gender: "",
      reference: "",
      course: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required("Please enter valid name.")
        .typeError("Please enter valid name."),
      email: Yup.string()
        .trim()
        .required("Please enter valid email.")
        .typeError("Please enter valid email."),
      mobile: Yup.string()
        .trim()
        .length(10)
        .required("Please enter valid mobile nunmber.")
        .typeError("Please enter valid mobile nunmber."),
      whatsapp: Yup.string()
        .trim()
        .length(10)
        .required("Please enter valid whatsapp number.")
        .typeError("Please enter valid whatsapp number."),
      joiningDate: Yup.date()
        .required("Please enter valid joining date.")
        .typeError("Please enter valid joining date."),
      dob: Yup.date()
        .required("Please enter valid date of birth.")
        .typeError("Please enter valid date of birth."),
      qualification: Yup.string()
        .trim()
        .required("Please enter valid qualificaion.")
        .typeError("Please enter valid qualificaion."),
      gender: Yup.string()
        .trim()
        .required("Please select gender.")
        .typeError("Please select gender."),
      reference: Yup.string()
        .trim()
        .required("Please select reference.")
        .typeError("Please select reference."),
      course: Yup.string()
        .trim()
        .length(24)
        .required("Please select course.")
        .typeError("Please select course."),
    }),
    onSubmit: (data) => {
      console.log("data", data);
      saveStudentInquiries(data);
    },
  });

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Student Inquiry"}
      footer={
        <>
          <button>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} type="submit">
            Submit
          </button>
        </>
      }
    >
      <div>
        {errorMessage ? (
          <span className="error-text">{errorMessage}</span>
        ) : (
          <></>
        )}
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullName"
            placeholder="Full Name"
            value={values.fullName}
            onChange={handleChange}
          />
          {touched?.fullName && errors?.fullName ? (
            <span className="error-text">{errors?.fullName}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
          />
          {touched?.email && errors?.email ? (
            <span className="error-text">{errors?.email}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group form-group-column">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="Mobile Number"
            value={values.mobile}
            onChange={handleChange}
          />
          {touched?.mobile && errors?.mobile ? (
            <span className="error-text">{errors?.mobile}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group form-group-column">
          <label htmlFor="whatsapp">Whatsapp Number:</label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            pattern="[0-9]{10}"
            placeholder="Whatsapp"
            value={values.whatsapp}
            onChange={handleChange}
          />
          {touched?.whatsapp && errors?.whatsapp ? (
            <span className="error-text">{errors?.whatsapp}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="joiningDate"
            value={values.joiningDate}
            onChange={handleChange}
          />
          {touched?.joiningDate && errors?.joiningDate ? (
            <span className="error-text">{errors?.joiningDate}</span>
          ) : (
            <></>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={values.dob}
            onChange={handleChange}
          />
          {touched?.dob && errors?.dob ? (
            <span className="error-text">{errors?.dob}</span>
          ) : (
            <></>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="qualification">Educations Qualification:</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            placeholder="Educational Qualification"
            value={values.qualification}
            onChange={handleChange}
          />
          {touched?.qualification && errors?.qualification ? (
            <span className="error-text">{errors?.qualification}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Choose Your Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {touched?.gender && errors?.gender ? (
            <span className="error-text">{errors?.gender}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group form-group-column">
          <label htmlFor="course">Course Name:</label>
          <select
            id="course"
            name="course"
            value={values.course}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Choose Your Course
            </option>
            {courses.map((course) => {
              return (
                <option value={course._id} key={course._id}>
                  {course.name}
                </option>
              );
            })}
          </select>
          {touched?.course && errors?.course ? (
            <span className="error-text">{errors?.course}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group form-group-column">
          <label htmlFor="reference">Reference:</label>
          <select
            id="reference"
            name="reference"
            value={values.reference}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Choose Reference
            </option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="internet">Internet</option>
            <option value="other">Other</option>
          </select>
          {touched?.reference && errors?.reference ? (
            <span className="error-text">{errors?.reference}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Drawer>
  );
};
