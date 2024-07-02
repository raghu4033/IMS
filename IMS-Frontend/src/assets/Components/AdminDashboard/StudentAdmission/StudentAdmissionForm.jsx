import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ApiService from '../../../../Utils/ApiService';
import { Drawer } from '../../Common/Drawer';

export const StudentAdmissionForm = ({
  getStudentAdmissions,
  open,
  onClose,
}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const resp = await ApiService.post(
        ApiService.ApiURLs.saveStudentAdmission,
        {
          ...data,
        }
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log('Student Admission saved successfully.');
        onClose();
        getStudentAdmissions();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      academicYear: '',
      joiningDate: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dob: '',
      nationality: '',
      bloodGroup: '',
      cast: '',
      permanentAddress: '',
      presentAddress: '',
      pin: '',
      city: '',
      email: '',
      mobile: '',
      parentsName: '',
      parentsMobile: '',
      totalFees: '',
      qualification: '',
      batchName: '',
      course: '',
    },
    validationSchema: Yup.object({
      academicYear: Yup.string().trim().required(),
      joiningDate: Yup.date().required(),
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
      parentsName: Yup.string().trim().required(),
      parentsMobile: Yup.string().trim().required(),
      totalFees: Yup.number().min(1).required(),
      batchName: Yup.string().trim().required(),
      course: Yup.string().trim().length(24).required(),
    }),
    onSubmit: (data) => {
      console.log('data', data);
      saveStudentAdmission(data);
    },
  });
  
  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={'Student Admission'}
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
                placeholder="Nationality"
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
                placeholder="Cast"
                value={values.cast}
                onChange={handleChange}
              />
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
            </div>
            {/* <div className="form-section">
              <div className="section-heading">Photo</div>
              <div className="form-group">
                <label htmlFor="photo">Upload Photo:</label>
                <input type="file" id="photo" name="photo" accept="image/*" />
              </div>
            </div> */}
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
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
