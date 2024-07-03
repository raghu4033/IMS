import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";
import ApiService from "../../../../Utils/ApiService";

export const AnnouncementManagement = () => {
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
        Add Announcement
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Add Announcement"}
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <h2 className="form-heading">Announcements</h2>
          <hr />
          <form>
            <div className="form-group form-group-column">
              <label htmlFor="course-name">Notice For:</label>
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
            <div className="form-group form-group-column">
              <label htmlFor="notice-subject">Notice Subject:</label>
              <input type="text" id="notice-subject" name="notice-subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="notice-date">Notice Date:</label>
              <input type="date" id="notice-date" name="notice-date" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="attachment">Attachment:</label>
              <input type="file" id="attachment" name="attachment" accept="image/*" />
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </Drawer>

      <div className="card-table-container">
        <h2 className="form-heading">View Announcements</h2>
        <hr />
        <div className="card-table">
        <div className="table-responsive">
          <table id="announcements-table">
            <thead>
              <tr>
                <th>Notice For</th>
                <th>Notice Subject</th>
                <th>Notice Date</th>
                <th>Description</th>
                <th>Attachment</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Records */}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
};
