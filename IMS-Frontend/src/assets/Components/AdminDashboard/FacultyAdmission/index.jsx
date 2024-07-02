import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";
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
            </div>

            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </Drawer>
    </>
  );
};