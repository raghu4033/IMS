import React, { useEffect, useState } from "react";
import moment from "moment";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClassSchedules = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getClassSchedules);
      if (resp.status === 200 && resp.data?.data) {
        setClasses(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClassSchedules();
  }, []);

  return (
    <div className="class-schedule-container">
      <h2 className="card-heading">Class Schedule</h2>
      {!loading ? (
        <div className="schedule-card">
          {classes.map((classItem) => (
            <div className="class-item" key={classItem.id}>
              <div className="class-info">
                <h3>{classItem.course?.name || "N/A"}</h3>
                <hr />
                <p>
                  <strong>Date:</strong> {moment(classItem.fromDate).isValid() ? moment(classItem.fromDate).format("YYYY-MM-DD") : "N/A"}
                </p>
                <p>
                  <strong>Time:</strong> {moment(classItem.fromDate).isValid() ? moment(classItem.fromDate).format("HH:mm A") : "N/A"}
                </p>
                <p>
                  <strong>Class Type:</strong> {classItem.classType || "N/A"}
                </p>
                <p>
                  <strong>Faculty:</strong> {[classItem.faculty?.firstName, classItem.faculty?.lastName].filter(Boolean).join(" ") || "N/A"}
                </p>
              </div>
              <div className="progress-bar"></div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
