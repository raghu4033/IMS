import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Drawer } from "../../Common/Drawer";
import { useFormik } from "formik";
import ApiService from "../../../../Utils/ApiService";

export const AttendanceManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Take Attendance
      </button>
      

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Take Attendance"}
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <div className="card">
            <h2 className="form-heading">Take Attendance</h2>
            <hr />
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="course">Select Course:</label>
                <select id="course" name="course">
                  <option value="" disabled selected>
                    Choose Course
                  </option>
                  <option value="course1">Course 1</option>
                  <option value="course2">Course 2</option>
                  <option value="course3">Course 3</option>
                  <option value="course4">Course 4</option>
                  <option value="course5">Course 5</option>
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
              <button className="btn" id="next-btn">
                Next
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="form-container">
          <h2 className="form-heading">Take Attendance</h2>
          <hr />
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
      </Drawer>
      <br />
      <div className="form-container">
        <div className="card">
          <h2 className="form-heading">View Attendance</h2>
          <hr />
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="course">Select Course:</label>
              <select id="course" name="course">
                <option value="" disabled selected>
                  Choose Course
                </option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <option value="course3">Course 3</option>
                <option value="course4">Course 4</option>
                <option value="course5">Course 5</option>
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
            <button className="btn" id="next-btn">
              Next
            </button>
          </div>
        </div>
      </div>
      <br/>
      
        <h2 className="form-heading">View Attendance</h2>
        <hr />
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
                  <button className="attendance-btn delete-btn">Absent</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

    </>
  );
};
