import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import userLogo from "../../../Images/user.png";
import { Drawer } from "../../Common/Drawer";

export const GenerateCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getStudents);
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

  return (
    <>
      <div className="action-button">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Generate Certificate
        </button>
      </div>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Generate Certificate"}
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <div className="card">
            <h2 className="form-heading">Select Student</h2>
            <hr />
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="student">Select Student:</label>
                <select id="student" name="student">
                  <option value="" disabled selected>
                    Choose Student
                  </option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn" id="next-btn">
                Next
              </button>
            </div>
          </div>
        </div>

        <br />
        <h2 className="form-heading">Add Certificate and Student Grade</h2>
        <hr />
        <form>
          <div className="form-section">
            {/* <h3 className="section-heading">Student Information</h3> */}
            <hr />
            <div className="form-group">
              <label htmlFor="student-id">Student ID:</label>
              <input type="text" id="student-id" name="student-id" required />
            </div>
            <div className="form-group">
              <label htmlFor="full-name">Full Name:</label>
              <input type="text" id="full-name" name="full-name" required />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">Certificate Grade</h3>
            <hr />
            <div className="form-group">
              <label htmlFor="certificate-grade">Certificate Grade:</label>
              <select id="certificate-grade" name="certificate-grade" required>
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
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">Other Details</h3>
            <hr />
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div className="form-group">
              <label htmlFor="certificate-attachment">
                Certificate Attachment:
              </label>
              <input
                type="file"
                id="certificate-attachment"
                name="certificate-attachment"
                accept=".pdf, .doc, .docx"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </Drawer>

      <div className="card-table-container">
        <h2 className="form-heading">Certificates and Student Grades</h2>
        <hr />
        <div className="card-table">
          <div className="table-responsive">
            <table id="certificate-table">
              <thead>
                <tr>
                  <th>User Image</th>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Certificate Grade</th>
                  <th>Date</th>
                  <th>Certificate Attachment</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample records */}
                <tr>
                  <td>
                    <img
                      src={userLogo}
                      className="certificate-table-img"
                      alt="User"
                    />
                  </td>
                  <td>123456</td>
                  <td>Harshad Satasiya</td>
                  <td>A</td>
                  <td>2024-06-15</td>
                  <td>
                    <a
                      href="certificate1.pdf"
                      className="edit-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src={userLogo}
                      alt="User"
                      className="certificate-table-img"
                    />
                  </td>
                  <td>789012</td>
                  <td>Manthan Patel</td>
                  <td>B</td>
                  <td>2024-06-20</td>
                  <td>
                    <a
                      href="certificate2.pdf"
                      className="edit-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
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
