import React from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";

export const StudentFees = () => {
  return (
    <>
      <div className="card-table-container">
        <h2 className="form-heading">Fees Details</h2>
        <hr />
        <div className="card-container">
          <div className="fees-summary-card fees-summary-total">
            <div className="summary-content">
              <p><strong>Total Fees:</strong> $2000</p>
            </div>
          </div>
          <div className="fees-summary-card fees-summary-paid">
            <div className="summary-content">
              <p><strong>Paid Fees:</strong> $1000</p>
            </div>
          </div>
          <div className="fees-summary-card fees-summary-remaining">
            <div className="summary-content">
              <p><strong>Remaining Fees:</strong> $1000</p>
            </div>
          </div>
        </div>
        <h2 className="form-heading">Paid Installment Details</h2>
        <div className="card-table">
          <table id="fees-table">
            <thead>
              <tr>
                <th>Installment</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Payment Type</th>
                <th>Invoice Number</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>$500</td>
                <td>2024-01-15</td>
                <td>Credit Card</td>
                <td>INV001</td>
                <td><button className="download-btn">Download</button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>$500</td>
                <td>2024-02-15</td>
                <td>Debit Card</td>
                <td>INV002</td>
                <td><button className="download-btn">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
