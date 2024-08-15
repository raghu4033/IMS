import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";
import { ImageUpload } from "../../Common/ImageUpload";

export const FacultyAdmissionForm = ({
  open,
  onClose,
  getFacultyAdmissions,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log(import.meta.env);

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
        profileImage: "",
      },
      validationSchema: Yup.object({
        department: Yup.string()
          .trim()
          .required("Department is required.")
          .typeError("Department is required."),
        yearOfExperience: Yup.number()
          .min(0)
          .required("Years of Experience is required.")
          .typeError("Years of Experience is required."),
        joiningDate: Yup.date()
          .required("Joining Date is required.")
          .typeError("Joining Date is required."),
        qualification: Yup.string()
          .trim()
          .required("Qualification is required.")
          .typeError("Qualification is required."),
        salary: Yup.number()
          .min(1)
          .required("Salary is required.")
          .typeError("Salary is required."),
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
          .required("Blood Group is required.")
          .typeError("Blood Group is required."),
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
          .required("Mobile Number is required.")
          .typeError("Mobile Number is required."),
        bankName: Yup.string()
          .trim()
          .required("Bank Name is required.")
          .typeError("Bank Name is required."),
        accountName: Yup.string()
          .trim()
          .required("Account Name is required.")
          .typeError("Account Name is required."),
        ifscCode: Yup.string()
          .trim()
          .required("IFSC Code is required.")
          .typeError("IFSC Code is required."),
        accountNumber: Yup.string()
          .trim()
          .required("Account Number is required.")
          .typeError("Account Number is required."),
        profileImage: Yup.string()
          .trim()
          .required("Profile Image is required.")
          .typeError("Profile Image is required."),
      }),
      onSubmit: (data) => {
        saveFacultyAdmission(data);
      },
    });

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
          {errorMessage ? (
            <span className="error-text">{errorMessage}</span>
          ) : (
            <></>
          )}
          <div className="form-section">
            <div className="form-group form-group-column">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                placeholder="Department"
                value={values.department}
                onChange={handleChange}
              />
              {touched?.department && errors?.department ? (
                <span className="error-text">{errors?.department}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="yearOfExperience">Year of Experience:</label>
              <input
                type="number"
                id="yearOfExperience"
                name="yearOfExperience"
                placeholder="Years of Experience"
                value={values.yearOfExperience}
                onChange={handleChange}
              />
              {touched?.yearOfExperience && errors?.yearOfExperience ? (
                <span className="error-text">{errors?.yearOfExperience}</span>
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
                placeholder="Joining Date"
                value={values.joiningDate}
                onChange={handleChange}
              />
              {touched?.joiningDate && errors?.joiningDate ? (
                <span className="error-text">{errors?.joiningDate}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="qualification">Qualification:</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                placeholder="Qualification"
                value={values.qualification}
                onChange={handleChange}
              />
              {touched?.qualification && errors?.qualification ? (
                <span className="error-text">{errors?.qualification}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                id="salary"
                name="salary"
                placeholder="Salary"
                value={values.salary}
                onChange={handleChange}
              />
              {touched?.salary && errors?.salary ? (
                <span className="error-text">{errors?.salary}</span>
              ) : (
                <></>
              )}
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
                placeholder="Date of Birth"
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
                placeholder="Gender"
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
                placeholder="Blood Group"
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
            <h3 className="section-heading">Contact Details</h3>
            <hr />
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
              />
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
                placeholder="Pin"
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
                placeholder="Mobile Number"
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
                placeholder="Email"
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
              <h3 className="section-heading">Photo</h3>
              <hr />
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
            <h3 className="section-heading">Bank Details</h3>
            <hr />
            <div className="form-group form-group-column">
              <label htmlFor="bankName">Bank Name:</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                placeholder="Bank Name"
                value={values.bankName}
                onChange={handleChange}
              />
              {touched?.bankName && errors?.bankName ? (
                <span className="error-text">{errors?.bankName}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="accountName">Account Holder Name:</label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                placeholder="Account Name"
                value={values.accountName}
                onChange={handleChange}
              />
              {touched?.accountName && errors?.accountName ? (
                <span className="error-text">{errors?.accountName}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="ifscCode">IFSC Code:</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                placeholder="IFSC Code"
                value={values.ifscCode}
                onChange={handleChange}
              />
              {touched?.ifscCode && errors?.ifscCode ? (
                <span className="error-text">{errors?.ifscCode}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group form-group-column">
              <label htmlFor="accountNumber">Account Number:</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                placeholder="Acoount Number"
                value={values.accountNumber}
                onChange={handleChange}
              />
              {touched?.accountNumber && errors?.accountNumber ? (
                <span className="error-text">{errors?.accountNumber}</span>
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
