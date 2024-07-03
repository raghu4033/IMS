import { useEffect, useState } from "react";
import { Drawer } from "../../Common/Drawer";
import ApiService from "../../../../Utils/ApiService";

export const FeesManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getCourses);
      if (resp.status === 200 && resp.data?.data) {
        setCourses(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Fees Collection</button>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={"Fees Collection"}
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button>Submit</button>
          </>
        }
      >
        
<div className="card-table-container">
          <h2 className="form-heading">Harshad Satasiya - 11111111</h2>
          <hr />
          <form>
            <div className="form-section">
              <h3 className="section-heading">Fees Details</h3>
              <hr />
              <div className="form-group form-group-column">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" name="amount" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="installment-number">Installment Number:</label>
                <input type="number" id="installment-number" name="installment-number" required />
              </div>
              <div className="form-group form-group-column">
                <label htmlFor="payment-type">Payment Type:</label>
                <select id="payment-type" name="payment-type" required>
                  <option value="" disabled selected>
                    Choose Payment Type
                  </option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </Drawer>
    </>
  );
};
