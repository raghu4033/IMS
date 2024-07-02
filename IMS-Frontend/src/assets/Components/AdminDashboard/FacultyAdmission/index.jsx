import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Drawer } from "../../Common/Drawer";
import { useFormik } from "formik";
import ApiService from "../../../../Utils/ApiService";

export const FacultyAdmission = () => {
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
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Faculty Admission
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Faculty Admission"}
        footer={
          <>
            <button>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <h2 className="form-heading">Faculty Admission</h2>
          <hr />
          <form>
            <div className="form-section">
              <h3 className="section-heading">Official Details</h3>
              <hr />
              <div className="form-group form-group-column">
                <label htmlFor="department">Department:</label>
                <input type="text" id="department" name="department" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="experience">Year of Experience:</label>
                <input type="number" id="experience" name="experience" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="joining-date">Joining Date:</label>
                <input type="date" id="joining-date" name="joining-date" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="qualification">Qualification:</label>
                <input type="text" id="qualification" name="qualification" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="salary">Salary:</label>
                <input type="number" id="salary" name="salary" required />
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
                  <option value="" disabled selected>Choose Your Gender</option>
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
                  <option value="" disabled selected>Choose Your Blood Group</option>
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
              <h3 className="section-heading">Bank Details</h3>
              <hr />
              <div className="form-group form-group-column">
                <label htmlFor="bank-name">Bank Name:</label>
                <input type="text" id="bank-name" name="bank-name" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="bank-holder-name">Bank Holder Name:</label>
                <input type="text" id="bank-holder-name" name="bank-holder-name" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="ifsc-code">IFSC Code:</label>
                <input type="text" id="ifsc-code" name="ifsc-code" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="account-number">Account Number:</label>
                <input type="text" id="account-number" name="account-number" required />
              </div>
            </div>

            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </Drawer>

      <div className="card-table-container">
        <h2 className="form-heading">Faculty Admission List</h2>
        <hr />
        <div className="card-table table-responsive">
          <table id="faculty-table">
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Department</th>
                <th>Year of Experience</th>
                <th>Joining Date</th>
                <th>Qualification</th>
                <th>Salary</th>
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
                <th>Bank Name</th>
                <th>Bank Holder Name</th>
                <th>IFSC Code</th>
                <th>Account Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample records */}
              <tr>
                <td>1234567</td>
                <td>Computer Science</td>
                <td>5</td>
                <td>2023-09-15</td>
                <td>Ph.D. in Computer Science</td>
                <td>80000</td>
                <td>John</td>
                <td>Doe</td>
                <td></td>
                <td>1978-12-25</td>
                <td>Male</td>
                <td>American</td>
                <td>O+</td>
                <td></td>
                <td>123 Street, ABC Town</td>
                <td>456 Road, XYZ City</td>
                <td>New York</td>
                <td>10001</td>
                <td>1234567890</td>
                <td>john.doe@example.com</td>
                <td>Bank of America</td>
                <td>John Doe</td>
                <td>BOFAUS3N</td>
                <td>12345678901234</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="update-btn">Update</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
              <tr>
                <td>1234568</td>
                <td>Mathematics</td>
                <td>8</td>
                <td>2023-09-20</td>
                <td>Ph.D. in Mathematics</td>
                <td>90000</td>
                <td>Jane</td>
                <td>Smith</td>
                <td></td>
                <td>1980-06-10</td>
                <td>Female</td>
                <td>British</td>
                <td>A-</td>
                <td></td>
                <td>789 Lane, PQR City</td>
                <td>321 Avenue, LMN Town</td>
                <td>London</td>
                <td>SW1A 1AA</td>
                <td>9876543210</td>
                <td>jane.smith@example.com</td>
                <td>HSBC Bank</td>
                <td>Jane Smith</td>
                <td>HSBCINBB</td>
                <td>56789012345678</td>
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
    </>
  );
};

