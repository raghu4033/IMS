import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const GenerateCertificateForm = ({ open, onClose, getCertificates }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getUsers}?role=STUDENT`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setStudents(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const saveCertificate = async (data) => {
    try {
      setLoading(true);
      const resp = await ApiService.post(ApiService.ApiURLs.saveCertificate, {
        ...data,
      });
      if (resp.status === 200 && resp.data?.data) {
        console.log("Certificate saved successfully.");
        onClose();
        getCertificates();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, setFieldValue, touched } =
    useFormik({
      initialValues: {
        student: "",
        studentName: "",
        sid: "",
        course: "",
        certificateGrade: "",
        date: "",
      },
      validationSchema: Yup.object({
        student: Yup.string()
          .trim()
          .length(24)
          .required("Please select Student.")
          .typeError("Please select Student."),
        course: Yup.string()
          .trim()
          .length(24)
          .required("Please select Course.")
          .typeError("Please select Course."),
        studentName: Yup.string()
          .trim()
          .required("Student Name is required.")
          .typeError("Student Name is required."),
        certificateGrade: Yup.string()
          .trim()
          .required("Centificate Grade is required.")
          .typeError("Centificate Grade is required."),
        sid: Yup.string()
          .trim()
          .required("Student ID is required.")
          .typeError("Student ID is required."),
        date: Yup.date()
          .required("Date is required.")
          .typeError("Date is required."),
      }),
      onSubmit: (data) => {
        console.log("data", data);
        saveCertificate(data);
      },
    });

  console.log(errors);

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Generate Certificate"}
      footer={
        <>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading || !values.student}
            type="submit"
          >
            Submit
          </button>
        </>
      }
    >
      <form>
        <div className="form-container">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="student">Select Student:</label>
                <select
                  id="student"
                  name="student"
                  value={values.student}
                  onChange={(e) => {
                    const value = e.target.value;
                    const student = students.find((i) => i._id === value);
                    setFieldValue("student", value);
                    setFieldValue(
                      "studentName",
                      [student?.firstName, student?.lastName]
                        .filter(Boolean)
                        .join(" ")
                    );
                    setFieldValue("sid", student?.sid);
                    setFieldValue("course", student?.course?._id);
                  }}
                >
                  <option value="" disabled selected>
                    Choose Student
                  </option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {[student?.firstName, student?.lastName]
                        .filter(Boolean)
                        .join(" ")}
                    </option>
                  ))}
                </select>
                {touched?.student && errors?.student ? (
                  <span className="error-text">{errors?.student}</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="sid">Student ID:</label>
            <input
              type="text"
              id="sid"
              name="sid"
              placeholder="Student ID"
              value={values.sid}
              disabled
            />
            {touched?.sid && errors?.sid ? (
              <span className="error-text">{errors?.sid}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="studentName">Full Name:</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Student Name"
              value={values.studentName}
              disabled
            />
            {touched?.studentName && errors?.studentName ? (
              <span className="error-text">{errors?.studentName}</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="certificateGrade">Certificate Grade:</label>
            <select
              id="certificateGrade"
              name="certificateGrade"
              value={values.certificateGrade}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Choose Certificate Grade
              </option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
            </select>
            {touched?.certificateGrade && errors?.certificateGrade ? (
              <span className="error-text">{errors?.certificateGrade}</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              value={values.date}
              onChange={handleChange}
            />
            {touched?.date && errors?.date ? (
              <span className="error-text">{errors?.date}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </Drawer>
  );
};
