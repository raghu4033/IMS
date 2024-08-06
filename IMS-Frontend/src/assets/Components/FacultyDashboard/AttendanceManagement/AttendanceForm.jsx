import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const AttendanceForm = ({ open, onClose, getAttendances }) => {
  const [courses, setCourses] = useState([]);
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

  useEffect(() => {
    getCourses();
  }, []);

  const saveAttendances = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.saveAttendance, {
        ...data,
      });
      if (resp.status === 200 && resp.data?.data) {
        console.log("Class scheduled successfully.");
        onClose();
        getAttendances();
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

  const { values, handleChange, handleSubmit, errors, setFieldValue, touched } =
    useFormik({
      initialValues: {
        course: "",
        date: "",
        students: [],
      },
      validationSchema: Yup.object({
        course: Yup.string()
          .trim()
          .length(24)
          .required("Please select course.")
          .typeError("Please select course."),
        date: Yup.date()
          .required("Attendance date is required.")
          .typeError("Attendance date is required."),
        students: Yup.array().of(
          Yup.object().shape({
            _id: Yup.string().trim().length(24).required(),
            sid: Yup.number().required(),
            name: Yup.string().trim().required(),
            isPresent: Yup.boolean(),
          })
        ),
      }),
      onSubmit: (data) => {
        console.log("data", data);
        saveAttendances(data);
      },
    });

  const getStudentByCourse = async ({ courseId }) => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getUsers}?role=STUDENT&course=${courseId}`
      );
      if (resp.status === 200 && resp.data?.data) {
        setFieldValue(
          "students",
          resp.data?.data?.map(({ sid, firstName, lastName, _id, mobile }) => ({
            _id,
            sid,
            name: [firstName, lastName].filter(Boolean).join(" "),
            mobile,
            isPresent: true,
          }))
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (values.course && values.date) {
      getStudentByCourse({ courseId: values.course });
    }
  }, [values.course, values.date]);

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Take Attendance"}
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
            <label htmlFor="date">Attendance Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleChange}
            />
            {touched?.date && errors?.date ? (
              <span className="error-text">{errors?.date}</span>
            ) : (
              <></>
            )}
          </div>
          {values.course && values.date && values.students.length ? (
            <div className="card-table">
              <table id="attendance-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Student Mobile</th>
                    <th>Absent/Present</th>
                  </tr>
                </thead>
                <tbody>
                  {values.students.map((stud) => {
                    return (
                      <tr key={stud.sid}>
                        <td>{stud.sid}</td>
                        <td>{stud.name}</td>
                        <td>{stud.mobile}</td>
                        <td>
                          <button
                            className="attendance-btn edit-btn"
                            onClick={() => {
                              setFieldValue(
                                "students",
                                values.students?.map((student) => ({
                                  ...student,
                                  isPresent:
                                    student?._id === stud?._id
                                      ? !student?.isPresent
                                      : student?.isPresent,
                                }))
                              );
                            }}
                          >
                            {stud.isPresent ? "Present" : "Absent"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Drawer>
  );
};
