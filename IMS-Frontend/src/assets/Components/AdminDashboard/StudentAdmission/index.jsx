import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Drawer } from "../../Common/Drawer";
import { useFormik } from "formik";
import ApiService from "../../../../Utils/ApiService";

export const StudentAdmission = () => {
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

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Student Admission</button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Student Admission"}
        footer={
          <>
            <button>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <h2 className="form-heading">Student Admission</h2>
          <hr />
          <form>
            <div className="form-section">
              <h3 className="section-heading">Official Details</h3>
              <hr />
              <div className="form-group form-group-column">
                <label htmlFor="academic-year">Academic Year:</label>
                <select id="academic-year" name="academic-year">
                  <option value="" disabled selected>
                    Choose Academic Year
                  </option>
                  {/* Add academic year options here */}
                </select>
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="joining-date">Joining Date:</label>
                <input type="date" id="joining-date" name="joining-date" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-heading">Personal Details</h3>
              <hr />
              <div className="form-group form-group-column">
                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="middle-name">Middle Name:</label>
                <input type="text" id="middle-name" name="middle-name" />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" id="last-name" name="last-name" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="date-of-birth">Date of Birth:</label>
                <input type="date" id="date-of-birth" name="date-of-birth" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" required>
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
                <input type="text" id="nationality" name="nationality" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="blood-group">Blood Group:</label>
                <select id="blood-group" name="blood-group" required>
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
                <input type="text" id="cast" name="cast" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-heading">Contact Details</h3>
              <hr />
              <div className="form-group">
                <label htmlFor="permanent-address">Permanent Address:</label>
                <textarea id="permanent-address" name="permanent-address" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="present-address">Present Address:</label>
                <textarea id="present-address" name="present-address"></textarea>
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="pin">Pin:</label>
                <input type="text" id="pin" name="pin" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="mobile">Mobile Number:</label>
                <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-section">
                <h3 className="section-heading">Photo</h3>
                <hr />
                <div className="form-group">
                  <label htmlFor="photo">Upload Photo:</label>
                  <input type="file" id="photo" name="photo" accept="image/*" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-heading">Parents Details</h3>
              <hr />
              <div className="form-group">
                <label htmlFor="parents-name">Parents Name:</label>
                <input type="text" id="parents-name" name="parents-name" required />
              </div>
              <div className="form-group">
                <label htmlFor="parents-mobile">Parents Mobile:</label>
                <input type="tel" id="parents-mobile" name="parents-mobile" pattern="[0-9]{10}" required />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-heading">Fees Details</h3>
              <hr />
              <div className="form-group">
                <label htmlFor="total-fees">Total Fees:</label>
                <input type="number" id="total-fees" name="total-fees" required />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-heading">Course Details</h3>
              <hr />
              <div className="form-group">
                <label htmlFor="course-name">Course Name:</label>
                <select id="course-name" name="course-name" required>
                  <option value="" disabled selected>
                    Choose Course Name
                  </option>
                  <option value="fashion">Fashion</option>
                  <option value="graphics">Graphics</option>
                  <option value="fineart">Fineart</option>
                  <option value="textile">Textile</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="batch-name">Batch Name:</label>
                <input type="text" id="batch-name" name="batch-name" required />
              </div>
            </div>

            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </Drawer>

      <div className="card-table-container">
        <h2 className="form-heading">Student Admission List</h2>
        <hr />
        <div className="card-table">
          <div className="table-responsive">
            <table id="student-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Academic Year</th>
                  <th>Joining Date</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Nationality</th>
                  <th>Blood Group</th>
                  <th>Cast</th>
                  <th>Permanent Address</th>
                  <th>Present Address</th>
                  <th>City</th>
                  <th>Pin</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Parents Name</th>
                  <th>Parents Mobile</th>
                  <th>Total Fees</th>
                  <th>Course Name</th>
                  <th>Batch Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1111111</td>
                  <td>2023-2024</td>
                  <td>2023-09-15</td>
                  <td>Harshad</td>
                  <td>Vinubhai</td>
                  <td>Satasiya</td>
                  <td>1998-05-25</td>
                  <td>Male</td>
                  <td>American</td>
                  <td>A+</td>
                  <td>-</td>
                  <td>123 Street, ABC Town</td>
                  <td>456 Road, XYZ City</td>
                  <td>New York</td>
                  <td>10001</td>
                  <td>1234567890</td>
                  <td>john.doe@example.com</td>
                  <td>Jane Doe</td>
                  <td>9876543210</td>
                  <td>5000</td>
                  <td>Fashion</td>
                  <td>Batch A</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="update-btn">Update</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>1111112</td>
                  <td>2023-2024</td>
                  <td>2023-09-20</td>
                  <td>Manthan</td>
                  <td>Manthan</td>
                  <td>Patel</td>
                  <td>1999-03-10</td>
                  <td>Female</td>
                  <td>British</td>
                  <td>O+</td>
                  <td>-</td>
                  <td>789 Lane, PQR City</td>
                  <td>321 Avenue, LMN Town</td>
                  <td>London</td>
                  <td>SW1A 1AA</td>
                  <td>9876543210</td>
                  <td>jane.smith@example.com</td>
                  <td>John Smith</td>
                  <td>1234567890</td>
                  <td>6000</td>
                  <td>Graphics</td>
                  <td>Batch B</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="update-btn">Update</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

