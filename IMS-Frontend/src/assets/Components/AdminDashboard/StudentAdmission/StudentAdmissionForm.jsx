import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";
import { ImageUpload } from "../../Common/ImageUpload";

export const StudentAdmissionForm = ({
  getStudentAdmissions,
  open,
  onClose,
}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const saveStudentAdmission = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveStudentAdmission,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log("Student Admission saved successfully.");
        onClose();
        getStudentAdmissions();
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ||
          "Something went wrong. please try again later."
      );
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        academicYear: "",
        joiningDate: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dob: "",
        nationality: "",
        bloodGroup: "",
        cast: "",
        permanentAddress: "",
        presentAddress: "",
        pin: "",
        city: "",
        email: "",
        mobile: "",
        parentsName: "",
        parentsMobile: "",
        totalFees: "",
        batchName: "",
        course: "",
        profileImage: "",
      },
      validationSchema: Yup.object({
        academicYear: Yup.string()
          .trim()
          .required("Academic Year is required.")
          .typeError("Academic Year is required."),
        joiningDate: Yup.date()
          .required("Joining Date is required.")
          .typeError("Joining Date is required."),
        firstName: Yup.string()
          .trim()
          .required("First Name is required.")
          .typeError("First Name is required."),
        middleName: Yup.string()
          .trim()
          .required("Middle Name is required.")
          .typeError("Middle Name is required."),
        lastName: Yup.string()
          .trim()
          .required("Last Name is required.")
          .typeError("Last Name is required."),
        gender: Yup.string()
          .trim()
          .required("Please select Gender.")
          .typeError("Please select Gender."),
        dob: Yup.date()
          .required("Date of Birth is required.")
          .typeError("Date of Birth is required."),
        nationality: Yup.string()
          .trim()
          .required("Nationality is required.")
          .typeError("Nationality is required."),
        bloodGroup: Yup.string()
          .trim()
          .required("Please select Blood Group.")
          .typeError("Please select Blood Group."),
        cast: Yup.string()
          .trim()
          .required("Cast is required.")
          .typeError("Cast is required."),
        permanentAddress: Yup.string()
          .trim()
          .required("Permanent Address is required.")
          .typeError("Permanent Address is required."),
        presentAddress: Yup.string()
          .trim()
          .required("Present Address is required.")
          .typeError("Present Address is required."),
        pin: Yup.string()
          .trim()
          .required("Pin is required.")
          .typeError("Pin is required."),
        city: Yup.string()
          .trim()
          .required("City is required.")
          .typeError("City is required."),
        email: Yup.string()
          .trim()
          .required("Email is required.")
          .typeError("Email is required."),
        mobile: Yup.string()
          .trim()
          .length(10)
          .required("Mobilr Number is required.")
          .typeError("Mobilr Number is required."),
        parentsName: Yup.string()
          .trim()
          .required("Parent's Name is required.")
          .typeError("Parent's Name is required."),
        parentsMobile: Yup.string()
          .trim()
          .required("Parent's Mobile is required.")
          .typeError("Parent's Mobile is required."),
        totalFees: Yup.number()
          .min(1)
          .required("Total Fees is required.")
          .typeError("Total Fees is required."),
        batchName: Yup.string()
          .trim()
          .required("Batch Name is required.")
          .typeError("Batch Name is required."),
        course: Yup.string()
          .trim()
          .length(24)
          .required("Please select Course.")
          .typeError("Please select Course."),
        profileImage: Yup.string()
          .trim()
          .required("Profile image is required.")
          .typeError("Profile image is required."),
      }),
      onSubmit: (data) => {
        saveStudentAdmission(data);
      },
    });

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Student Admission"}
      footer={
        <>
          <button>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} type="submit">
            Submit
          </button>
        </>
      }
    >
      <div className="form-container">
        <form>
          {errorMessage ? (
            <span className="error-text">{errorMessage}</span>
          ) : (
            <></>
          )}
          <div className="form-section">
            <div className="section-heading">Official Details</div>
            <div className="form-group form-group-column">
              <label htmlFor="academicYear">Academic Year:</label>
              <select
                id="academicYear"
                name="academicYear"
                value={values.academicYear}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Choose Academic Year
                </option>
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
                <option value="2021-22">2021-22</option>
                <option value="2020-21">2020-21</option>
              </select>
              {touched?.academicYear && errors?.academicYear ? (
                <span className="error-text">{errors?.academicYear}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="joiningDate">Joining Date:</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={values.joiningDate}
                onChange={handleChange}
              />
              {touched?.joiningDate && errors?.joiningDate ? (
                <span className="error-text">{errors?.joiningDate}</span>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">Personal Details</div>
            <div className="form-group form-group-column">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
              />
              {touched?.firstName && errors?.firstName ? (
                <span className="error-text">{errors?.firstName}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="middleName">Middle Name:</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
                value={values.middleName}
                onChange={handleChange}
              />
              {touched?.middleName && errors?.middleName ? (
                <span className="error-text">{errors?.middleName}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
              />
              {touched?.lastName && errors?.lastName ? (
                <span className="error-text">{errors?.lastName}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={values.dob}
                onChange={handleChange}
              />
              {touched?.dob && errors?.dob ? (
                <span className="error-text">{errors?.dob}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
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
              {touched?.gender && errors?.gender ? (
                <span className="error-text">{errors?.gender}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                placeholder="Nationality"
                value={values.nationality}
                onChange={handleChange}
              />
              {touched?.nationality && errors?.nationality ? (
                <span className="error-text">{errors?.nationality}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={values.bloodGroup}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Choose Your Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {touched?.bloodGroup && errors?.bloodGroup ? (
                <span className="error-text">{errors?.bloodGroup}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="cast">Cast:</label>
              <input
                type="text"
                id="cast"
                name="cast"
                placeholder="Cast"
                value={values.cast}
                onChange={handleChange}
              />
              {touched?.cast && errors?.cast ? (
                <span className="error-text">{errors?.cast}</span>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">Contact Details</div>
            <div className="form-group">
              <label htmlFor="permanentAddress">Permanent Address:</label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                placeholder="Permanent Address"
                value={values.permanentAddress}
                onChange={handleChange}
              ></textarea>
              {touched?.permanentAddress && errors?.permanentAddress ? (
                <span className="error-text">{errors?.permanentAddress}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="presentAddress">Present Address:</label>
              <textarea
                id="presentAddress"
                name="presentAddress"
                placeholder="Present Address"
                value={values.presentAddress}
                onChange={handleChange}
              ></textarea>
              {touched?.presentAddress && errors?.presentAddress ? (
                <span className="error-text">{errors?.presentAddress}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
              />
              {touched?.city && errors?.city ? (
                <span className="error-text">{errors?.city}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="pin">Pin:</label>
              <input
                type="text"
                id="pin"
                name="pin"
                placeholder="PIN"
                value={values.pin}
                onChange={handleChange}
              />
              {touched?.pin && errors?.pin ? (
                <span className="error-text">{errors?.pin}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                pattern="[0-9]{10}"
                placeholder="Mobile"
                value={values.mobile}
                onChange={handleChange}
              />
              {touched?.mobile && errors?.mobile ? (
                <span className="error-text">{errors?.mobile}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={values.email}
                onChange={handleChange}
              />
              {touched?.email && errors?.email ? (
                <span className="error-text">{errors?.email}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-section">
              <div className="section-heading">Photo</div>
              <div className="form-group">
                <label htmlFor="photo">Upload Photo:</label>
                <ImageUpload
                  error={
                    touched?.profileImage && errors?.profileImage
                      ? errors.profileImage
                      : null
                  }
                  onUpload={(url) => {
                    console.log(url);
                    setFieldValue("profileImage", url);
                  }}
                  onDelete={() => {
                    setFieldValue("profileImage", "");
                  }}
                  onError={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">Parents Details</div>
            <div className="form-group">
              <label htmlFor="parentsName">Parents Name:</label>
              <input
                type="text"
                id="parentsName"
                name="parentsName"
                placeholder="Parent's Name"
                value={values.parentsName}
                onChange={handleChange}
              />
              {touched?.parentsName && errors?.parentsName ? (
                <span className="error-text">{errors?.parentsName}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="parentsMobile">Parents Mobile:</label>
              <input
                type="tel"
                id="parentsMobile"
                name="parentsMobile"
                pattern="[0-9]{10}"
                placeholder="Parent's Mobile"
                value={values.parentsMobile}
                onChange={handleChange}
              />
              {touched?.parentsName && errors?.parentsName ? (
                <span className="error-text">{errors?.parentsName}</span>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">Fees Details</div>
            <div className="form-group">
              <label htmlFor="totalFees">Total Fees:</label>
              <input
                type="number"
                id="totalFees"
                name="totalFees"
                placeholder="Fees"
                value={values.totalFees}
                onChange={handleChange}
              />
              {touched?.totalFees && errors?.totalFees ? (
                <span className="error-text">{errors?.totalFees}</span>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">Course Details</div>
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
              {touched?.course && errors?.course ? (
                <span className="error-text">{errors?.course}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="batchName">Batch Name:</label>
              <input
                type="text"
                id="batchName"
                name="batchName"
                placeholder="Batch Name"
                value={values.batchName}
                onChange={handleChange}
              />
              {touched?.batchName && errors?.batchName ? (
                <span className="error-text">{errors?.batchName}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
