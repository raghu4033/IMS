import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const AttendanceForm = ({ open, onClose, getAttendances }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.saveClassSchedule, {
        ...data,
      });
      if (resp.status === 200 && resp.data?.data) {
        console.log("Class scheduled successfully.");
        onClose();
        getAttendances();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      course: "",
      faculty: "",
      fromDate: "",
      toDate: "",
      classType: "",
      subject: "",
    },
    validationSchema: Yup.object({
      course: Yup.string().trim().length(24).required(),
      faculty: Yup.string().trim().length(24).required(),
      fromDate: Yup.date().required(),
      toDate: Yup.date().required(),
      classType: Yup.string().trim().required(),
      subject: Yup.string().trim().required(),
    }),
    onSubmit: (data) => {
      console.log("data", data);
      saveAttendances(data);
    },
  });

  console.log(errors);

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
          </div>
          <div className="form-group">
            <label htmlFor="attendance-date">Attendance Date:</label>
            <input
              type="date"
              id="attendance-date"
              name="attendance-date"
              required
            />
          </div>
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
                {/* Dummy Records */}
                <tr>
                  <td>1111111</td>
                  <td>Harshad Satasiya</td>
                  <td>1234567890</td>
                  <td>
                    <button className="attendance-btn edit-btn">Present</button>
                  </td>
                </tr>
                <tr>
                  <td>1111112</td>
                  <td>Manthan Patel</td>
                  <td>9876543210</td>
                  <td>
                    <button className="attendance-btn delete-btn">
                      Absent
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
