import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";
import ApiService from "../../../../Utils/ApiService";

export const EventManagement = () => {
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
        Add Event
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Add Event"}
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        <div className="form-container">
          <h2 className="form-heading">Schedule Event</h2>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="event-name">Event Name:</label>
              <input type="text" id="event-name" name="event-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="event-place">Event Place:</label>
              <input type="text" id="event-place" name="event-place" required />
            </div>
            <div className="form-group">
              <label htmlFor="event-date">Event Date:</label>
              <input type="date" id="event-date" name="event-date" required />
            </div>
            <div className="form-group">
              <label htmlFor="event-time">Event Time:</label>
              <input type="time" id="event-time" name="event-time" required />
            </div>
            <button type="submit" className="btn">Add Event</button>
          </form>
        </div>
      </Drawer>

      <div className="card-table-container">
        <h2 className="form-heading">Event Schedule</h2>
        <hr />
        <div className="card-table">
          <table id="event-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Place</th>
                <th>Event Date</th>
                <th>Event Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy records */}
              <tr>
                <td>Birthday Party</td>
                <td>City Hall</td>
                <td>2024-07-15</td>
                <td>18:00</td>
              </tr>
              <tr>
                <td>Conference</td>
                <td>Convention Center</td>
                <td>2024-08-20</td>
                <td>09:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
