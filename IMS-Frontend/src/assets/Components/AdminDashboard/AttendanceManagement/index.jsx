import { useState, useEffect } from "react";
import { Drawer } from "../../Common/Drawer";
import ApiService from "../../../../Utils/ApiService";

export const AttendanceManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

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
        </div>
      </Drawer>
    </>
  );
};
