import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Drawer } from "../../Common/Drawer";
import { useFormik } from "formik";
import ApiService from "../../../../Utils/ApiService";

export const ClassSchedule = () => {
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
        Add Class Schedule
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Add Class Schedule"}
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <div className="card">
            <h2 className="form-heading">Add Class Schedule</h2>
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
              <button className="btn" id="next-btn">Next</button>
            </div>
          </div>
        </div>
        <div className="form-container">
          <div className="card" id="second-card">
            <br/>
            <h2 className="form-heading">Class Schedule Details</h2>
            <hr />
            <div className="card-body">
              <div className="form-group">
                <div className="multi-column">
                  <label htmlFor="from-date">From Date:</label>
                  <input type="date" id="from-date" name="from-date" />
                </div>
                <div className="multi-column">
                  <label htmlFor="to-date">To Date:</label>
                  <input type="date" id="to-date" name="to-date" />
                </div>
              </div>
              <div className="form-group">
                <div className="multi-column">
                  <label htmlFor="from-time">From Time:</label>
                  <input type="time" id="from-time" name="from-time" />
                </div>
                <div className="multi-column">
                  <label htmlFor="to-time">To Time:</label>
                  <input type="time" id="to-time" name="to-time" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" />
              </div>
              <div className="form-group">
                <label htmlFor="class-type">Class Type:</label>
                <select id="class-type" name="class-type">
                  <option value="" disabled selected>
                    Choose Class Type
                  </option>
                  <option value="practical">Practical</option>
                  <option value="theory">Theory</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="faculty">Faculty:</label>
                <select id="faculty" name="faculty">
                  <option value="" disabled selected>
                    Choose Faculty
                  </option>
                  <option value="faculty1">Faculty 1</option>
                  <option value="faculty2">Faculty 2</option>
                  <option value="faculty3">Faculty 3</option>
                </select>
              </div>
              <button className="btn" id="submit-btn">Submit</button>
            </div>
          </div>
        </div>
      </Drawer>

      <div className="card-table-container">
        <h2 className="form-heading">View Schedule</h2>
        <hr />
        <div className="card-table">
        <div className="table-responsive">
          <table id="schedule-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Subject</th>
                <th>Class Type</th>
                <th>Faculty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Course 1</td>
                <td>2024-06-15</td>
                <td>2024-06-30</td>
                <td>09:00</td>
                <td>11:00</td>
                <td>Mathematics</td>
                <td>Practical</td>
                <td>Faculty 1</td>
              </tr>
              <tr>
                <td>Course 2</td>
                <td>2024-07-01</td>
                <td>2024-07-15</td>
                <td>14:00</td>
                <td>16:00</td>
                <td>Physics</td>
                <td>Theory</td>
                <td>Faculty 2</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
};