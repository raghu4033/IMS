import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Drawer } from "../../Common/Drawer";
import { useFormik } from "formik";
import ApiService from "../../../../Utils/ApiService";

export const StudentInquiry = () => {
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

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobile: "",
      whatsapp: "",
      joiningDate: "",
      dob: "",
      qualification: "",
      gender: "",
      reference: "",
      course: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required(),
      email: Yup.string().trim().required(),
      mobile: Yup.string().trim().length(10).required(),
      whatsapp: Yup.string().trim().length(10).required(),
      joiningDate: Yup.date().required(),
      dob: Yup.date().required(),
      qualification: Yup.string().trim().required(),
      gender: Yup.string().trim().required(),
      reference: Yup.string().trim().optional(),
      course: Yup.string().trim().length(24).required(),
    }),
    onSubmit: (data) => {
      console.log("data", data);
      // login(data);
    },
  });

  console.log(errors);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Student Inquiry
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Student Inquiry"}
        footer={
          <>
            <button>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </>
        }
      >
        <div>
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              placeholder="Full Name"
              value={values.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group form-group-column">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              pattern="[0-9]{10}"
              value={values.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group form-group-column">
            <label htmlFor="whatsapp">Whatsapp Number:</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              pattern="[0-9]{10}"
              value={values.whatsapp}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="joiningDate"
              value={values.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={values.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="qualification">Educations Qualification:</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={values.qualification}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Choose Your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
          <div className="form-group form-group-column">
            <label htmlFor="reference">Reference:</label>
            <select
              id="reference"
              name="reference"
              value={values.reference}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Choose Reference
              </option>
              <option value="friend">Friend</option>
              <option value="family">Family</option>
              <option value="internet">Internet</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </Drawer>
    </>
  );
};
