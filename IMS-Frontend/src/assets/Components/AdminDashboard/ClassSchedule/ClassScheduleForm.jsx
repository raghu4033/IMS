import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const ClassScheduleForm = ({ open, onClose, getClassSchedules }) => {
  const [courses, setCourses] = useState([]);
  const [faculties, setFacaulties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getCourses = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getCourses);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setCourses(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getFaculty = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getUsers}?role=FACULTY`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setFacaulties(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
    getFaculty();
  }, []);

  const saveClassSchedules = async (data) => {
    try {
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.saveClassSchedule, {
        ...data,
      });
      if (resp.status === 200 && resp.data?.data) {
        console.log("Class scheduled successfully.");
        onClose();
        getClassSchedules();
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
      course: "",
      faculty: "",
      fromDate: "",
      toDate: "",
      classType: "",
      subject: "",
    },
    validationSchema: Yup.object({
      course: Yup.string()
        .trim()
        .length(24)
        .required("Please select Course.")
        .typeError("Please select Course."),
      faculty: Yup.string()
        .trim()
        .length(24)
        .required("Please select Faculty.")
        .typeError("Please select Faculty."),
      fromDate: Yup.date()
        .required("From Date is required.")
        .typeError("From Date is required."),
      toDate: Yup.date()
        .required("To Date is required.")
        .typeError("To Date is required."),
      classType: Yup.string()
        .trim()
        .required("Please select Class Type.")
        .typeError("Please select Class Type."),
      subject: Yup.string()
        .trim()
        .required("Subject is required.")
        .typeError("Subject is required."),
    }),
    onSubmit: (data) => {
      saveClassSchedules(data);
    },
  });

  console.log(errors);

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Add Class Schedule"}
      footer={
        <>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} type="submit">
            Submit
          </button>
        </>
      }
    >
      <div className="form-container">
        {errorMessage ? (
          <span className="error-text">{errorMessage}</span>
        ) : (
          <></>
        )}
        <div className="card-body">
          <div className="form-group">
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
          <div className="form-group">
            <div className="multi-column">
              <label htmlFor="fromDate">From Date:</label>
              <input
                type="datetime-local"
                id="fromDate"
                name="fromDate"
                placeholder="From Date"
                value={values.fromDate}
                onChange={handleChange}
              />
              {touched?.fromDate && errors?.fromDate ? (
                <span className="error-text">{errors?.fromDate}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="multi-column">
              <label htmlFor="toDate">To Date:</label>
              <input
                type="datetime-local"
                id="toDate"
                name="toDate"
                placeholder="To Date"
                value={values.toDate}
                onChange={handleChange}
              />
              {touched?.toDate && errors?.toDate ? (
                <span className="error-text">{errors?.toDate}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              value={values.subject}
              onChange={handleChange}
            />
            {touched?.subject && errors?.subject ? (
              <span className="error-text">{errors?.subject}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="classType">Class Type:</label>
            <select
              id="classType"
              name="classType"
              value={values.classType}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Choose Class Type
              </option>
              <option value="practical">Practical</option>
              <option value="theory">Theory</option>
              <option value="lab">Lab</option>
            </select>
            {touched?.classType && errors?.classType ? (
              <span className="error-text">{errors?.classType}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="faculty">Faculty:</label>
            <select
              id="faculty"
              name="faculty"
              value={values.faculty}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Choose Faculty
              </option>
              {faculties.map((faculty) => {
                return (
                  <option value={faculty._id} key={faculty._id}>
                    {[faculty?.firstName, faculty?.lastName]
                      .filter(Boolean)
                      .join(" ")}
                  </option>
                );
              })}
            </select>
            {touched?.faculty && errors?.faculty ? (
              <span className="error-text">{errors?.faculty}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
