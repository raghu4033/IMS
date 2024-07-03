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
        <div className="container form-container">
          <h2 className="form-heading heading">Schedule Event</h2>
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
            <button type="submit" className="btn custome-blue-submit">Add Event</button>
          </form>
        </div>
      </Drawer>
    </>
  );
};
