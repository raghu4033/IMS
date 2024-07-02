import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";

export const GenerateCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Generate Certificate
      </button>

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