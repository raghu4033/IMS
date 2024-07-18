import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";

export const FacultyAdmissionForm = ({
  open,
  onClose,
  getFacultyAdmissions,
}) => {
  const [loading, setLoading] = useState(false);

  const saveFacultyAdmission = async (data) => {
    try {
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveFacultyAdmission,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log("Faculty data saved successfully.");
        onClose();
        getFacultyAdmissions();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      department: "",
      yearOfExperience: "",
      joiningDate: "",
      qualification: "",
      salary: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      nationality: "",
      bloodGroup: "",
      cast: "",
      permanentAddress: "",
      presentAddress: "",
      city: "",
      pin: "",
      mobile: "",
      email: "",
      bankName: "",
      accountName: "",
      ifscCode: "",
      accountNumber: "",
    },
    validationSchema: Yup.object({
      department: Yup.string().trim().required(),
      yearOfExperience: Yup.number().min(0).required(),
      joiningDate: Yup.date().required(),
      qualification: Yup.string().trim().required(),
      salary: Yup.number().min(1).required(),
      firstName: Yup.string().trim().required(),
      middleName: Yup.string().trim().required(),
      lastName: Yup.string().trim().required(),
      gender: Yup.string().trim().required(),
      dob: Yup.date().required(),
      nationality: Yup.string().trim().required(),
      bloodGroup: Yup.string().trim().required(),
      cast: Yup.string().trim().required(),
      permanentAddress: Yup.string().trim().required(),
      presentAddress: Yup.string().trim().required(),
      pin: Yup.string().trim().required(),
      city: Yup.string().trim().required(),
      email: Yup.string().trim().required(),
      mobile: Yup.string().trim().length(10).required(),
      bankName: Yup.string().trim().required(),
      accountName: Yup.string().trim().required(),
      ifscCode: Yup.string().trim().required(),
      accountNumber: Yup.string().trim().required(),
    }),
    onSubmit: (data) => {
      console.log("data", data);
      saveFacultyAdmission(data);
    },
  });

  console.log(errors);

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={"Faculty Admission"}
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
        <form>
          <div className="form-section">
            <div className="form-group form-group-column">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={values.department}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="yearOfExperience">Year of Experience:</label>
              <input
                type="number"
                id="yearOfExperience"
                name="yearOfExperience"
                value={values.yearOfExperience}
                onChange={handleChange}
              />
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
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="qualification">Qualification:</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={values.qualification}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={values.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">Personal Details</h3>
            <hr />
            <div className="form-group form-group-column">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="middleName">Middle Name:</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={values.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
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
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={values.nationality}
                onChange={handleChange}
              />
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
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="cast">Cast:</label>
              <input
                type="text"
                id="cast"
                name="cast"
                value={values.cast}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">Contact Details</h3>
            <hr />
            <div className="form-group">
              <label htmlFor="permanentAddress">Permanent Address:</label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={values.permanentAddress}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="presentAddress">Present Address:</label>
              <textarea
                id="presentAddress"
                name="presentAddress"
                value={values.presentAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="pin">Pin:</label>
              <input
                type="text"
                id="pin"
                name="pin"
                value={values.pin}
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-section">
              <h3 className="section-heading">Photo</h3>
              <hr />
              <div className="form-group">
                <label htmlFor="photo">Upload Photo:</label>
                <input type="file" id="photo" name="photo" accept="image/*" />
              </div>
            </div> */}
          </div>

          <div className="form-section">
            <h3 className="section-heading">Bank Details</h3>
            <hr />
            <div className="form-group form-group-column">
              <label htmlFor="bankName">Bank Name:</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={values.bankName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="accountName">Account Holder Name:</label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                value={values.accountName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="ifscCode">IFSC Code:</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={values.ifscCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="accountNumber">Account Number:</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={values.accountNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
