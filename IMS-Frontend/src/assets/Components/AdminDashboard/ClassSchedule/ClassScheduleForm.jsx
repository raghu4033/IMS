import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";
import ApiService from "../../../../Utils/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ClassScheduleForm = ({ open, onClose, getClassSchedules }) => {
  const [courses, setCourses] = useState([]);
  const [faculties, setFacaulties] = useState([]);
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
            <div className="multi-column">
              <label htmlFor="fromDate">From Date:</label>
              <input
                type="datetime-local"
                id="fromDate"
                name="fromDate"
                value={values.fromDate}
                onChange={handleChange}
              />
            </div>
            <div className="multi-column">
              <label htmlFor="toDate">To Date:</label>
              <input
                type="datetime-local"
                id="toDate"
                name="toDate"
                value={values.toDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
            />
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
          </div>
        </div>
      </div>
    </Drawer>
  );
};
