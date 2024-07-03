import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Drawer } from "../../Common/Drawer";
import { useFormik } from "formik";
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
        Fees Collection
      </button>

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
          <h2 className="form-heading">Manthan Patel - 11111112</h2>
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
    <br/>
      <div className="form-container">
          <div className="card">
            <h2 className="form-heading">Fees Collections</h2>
            <hr />
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="course">Select Student:</label>
                <select id="course" name="course">
                  <option value="" disabled selected>
                    Choose Student
                  </option>
                  <option value="course1">Manthan Patel</option>
                  <option value="course2">Harshad Satasiya</option>
                  <option value="course3">John Doe</option>
                  <option value="course4">Jane Joe</option>
                </select>
              </div>
              <button className="btn" id="next-btn">Next</button>
            </div>
          </div>
        </div>

      <br/>
        <h2 className="form-heading">Manthan Patel - 11111112</h2>
        <hr />
        <div className="card-table">
          <table id="fees-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Installment Number</th>
                <th>Payment Type</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy records */}
              <tr>
                <td>2024-06-15</td>
                <td>500</td>
                <td>1</td>
                <td>Cash</td>
                <td><button className="invoice-btn edit-btn">Invoice</button></td>
              </tr>
              <tr>
                <td>2024-06-22</td>
                <td>600</td>
                <td>2</td>
                <td>Card</td>
                <td><button className="invoice-btn edit-btn">Invoice</button></td>
              </tr>
            </tbody>
          </table>
        </div>
     
    </>
  );
};
