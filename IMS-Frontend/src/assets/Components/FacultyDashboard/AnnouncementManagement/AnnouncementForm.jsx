import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const AnnouncementForm = ({ getAnnouncements, open, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const localStore = JSON.parse(
    localStorage.getItem("ims:auth:profile") || "{}"
  );

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

  const saveAnnoucements = async (data) => {
    try {
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveAnnouncement,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log("Student Inquiry saved successfully.");
        onClose();
        getAnnouncements();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      subject: "",
      description: "",
      date: "",
      user: localStore?._id,
      course: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().trim().required(),
      description: Yup.string().trim().required(),
      date: Yup.date().required(),
      user: Yup.string().trim().length(24).required(),
      course: Yup.string().trim().length(24).required(),
    }),
    onSubmit: (data) => {
      console.log("data", data);
      saveAnnoucements(data);
    },
  });

  console.log("errors", errors)

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
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={values.date}
            onChange={handleChange}
          />
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
        </div>
      </div>
    </Drawer>
  );
};
