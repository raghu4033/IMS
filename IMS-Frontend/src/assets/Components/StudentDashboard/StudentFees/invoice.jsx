
import React from "react";
import "../styles.css";
import InvoiceLogo from "../../../Images/logo.png";

const FeesInvoice = () => {
  return (
    <div className="fees-invoice">
      <div className="invoice-header">
        <img src={InvoiceLogo} alt="Institute Logo" className="invoice-logo" />
        <div className="invoice-header-details">
          <h1 className="institute-name">Institute Master</h1>
          <p className="invoice-date">Date: July 13, 2024</p>
        </div>
      </div>
      <div className="invoice-body">
        <h2 className="invoice-title">Fees Invoice</h2>
        <p><strong>Student Name:</strong> John Doe</p>
        <p><strong>Total Fees:</strong> $2000</p>
        <p><strong>Paid Fees:</strong> $1000</p>
        <p><strong>Remaining Fees:</strong> $1000</p>
        <div className="invoice-details">
          <h3>Installment Details</h3>
          <table className="invoice-details-table">
            <thead>
              <tr>
                <th>Installment</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Payment Type</th>
                <th>Invoice Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>$500</td>
                <td>2024-01-15</td>
                <td>Credit Card</td>
                <td>INV001</td>
              </tr>
              <tr>
                <td>2</td>
                <td>$500</td>
                <td>2024-02-15</td>
                <td>Debit Card</td>
                <td>INV002</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="invoice-footer">
        <p className="footer-text">Thank you for your payment!</p>
      </div>
    </div>
  );
};

export default FeesInvoice;
