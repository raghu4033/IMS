import { useState, useEffect } from "react";
import { Drawer } from "../../Common/Drawer";
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
      <button onClick={() => setIsOpen(true)}>Take Attendance</button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Take Attendance"}
      >
        <div className="form-container">
          <h2 className="form-heading">Take Attendance</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="course">Select Course:</label>
            <select id="course" name="course">
              <option value="" disabled selected>Choose Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="attendance-date">Attendance Date:</label>
            <input type="date" id="attendance-date" name="attendance-date" required />
          </div>
          <button className="btn" id="next-btn">Next</button>
        </div>
      </Drawer>
    </>
  );
};
