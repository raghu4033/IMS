import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";
import ApiService from "../../../../Utils/ApiService";

export const GenerateCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getStudents);
      if (resp.status === 200 && resp.data?.data) {
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
          
            <hr />
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="student">Select Student:</label>
                <select id="student" name="student">
                  <option value="" disabled selected>
                    Choose Student
                  </option>
                </select>
              </div>
              <button className="btn" id="next-btn">Next</button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};