import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Drawer } from '../../Common/Drawer';
import { useFormik } from 'formik';
import ApiService from '../../../../Utils/ApiService';
import { Table } from '../../Common/Table';
import { StudentAdmissionForm } from './StudentAdmissionForm';

const columns = [
  {
    label: 'Student ID',
    key: 'studentId',
  },
  {
    label: 'Academic Year',
    key: 'studentId',
  },
  {
    label: 'Joining Date',
    key: 'studentId',
  },
  {
    label: 'First Name',
    key: 'studentId',
  },
  {
    label: 'Middle Name',
    key: 'studentId',
  },
  {
    label: 'Last Name',
    key: 'studentId',
  },
  {
    label: 'Email',
    key: 'studentId',
  },
  {
    label: 'Date of Birth',
    key: 'studentId',
  },
  {
    label: 'Gender',
    key: 'studentId',
  },
  {
    label: 'Nationality',
    key: 'studentId',
  },
  {
    label: 'Blood Group',
    key: 'studentId',
  },
  {
    label: 'Cast',
    key: 'studentId',
  },
  {
    label: 'Permanent Address',
    key: 'studentId',
  },
  {
    label: 'Present Address',
    key: 'studentId',
  },
  {
    label: 'City',
    key: 'studentId',
  },
  {
    label: 'Pin',
    key: 'studentId',
  },
  {
    label: 'Mobile',
    key: 'studentId',
  },
  {
    label: 'Parents Name',
    key: 'studentId',
  },
  {
    label: 'Parents Mobile',
    key: 'studentId',
  },
  {
    label: 'Fees',
    key: 'studentId',
  },
  {
    label: 'Course',
    key: 'studentId',
  },
  {
    label: 'Batch',
    key: 'studentId',
  },
  {
    label: 'Actions',
    key: 'studentId',
  },
];

export const StudentAdmission = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} disabled={loading}>
        Student Admission
      </button>

      <StudentAdmissionForm
        getStudentAdmissions={() => {}}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />

      <Table columns={columns} rows={[]} />

      {/* <div className="card-table-container">
        <div className="card-table">
          <div className="table-responsive">
            <table id="student-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Academic Year</th>
                  <th>Joining Date</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Nationality</th>
                  <th>Blood Group</th>
                  <th>Cast</th>
                  <th>Permanent Address</th>
                  <th>Present Address</th>
                  <th>City</th>
                  <th>Pin</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Parents Name</th>
                  <th>Parents Mobile</th>
                  <th>Total Fees</th>
                  <th>Course Name</th>
                  <th>Batch Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1111111</td>
                  <td>2023-2024</td>
                  <td>2023-09-15</td>
                  <td>Harshad</td>
                  <td>Vinubhai</td>
                  <td>Satasiya</td>
                  <td>1998-05-25</td>
                  <td>Male</td>
                  <td>American</td>
                  <td>A+</td>
                  <td>-</td>
                  <td>123 Street, ABC Town</td>
                  <td>456 Road, XYZ City</td>
                  <td>New York</td>
                  <td>10001</td>
                  <td>1234567890</td>
                  <td>john.doe@example.com</td>
                  <td>Jane Doe</td>
                  <td>9876543210</td>
                  <td>5000</td>
                  <td>Fashion</td>
                  <td>Batch A</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="update-btn">Update</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>1111112</td>
                  <td>2023-2024</td>
                  <td>2023-09-20</td>
                  <td>Manthan</td>
                  <td>Manthan</td>
                  <td>Patel</td>
                  <td>1999-03-10</td>
                  <td>Female</td>
                  <td>British</td>
                  <td>O+</td>
                  <td>-</td>
                  <td>789 Lane, PQR City</td>
                  <td>321 Avenue, LMN Town</td>
                  <td>London</td>
                  <td>SW1A 1AA</td>
                  <td>9876543210</td>
                  <td>jane.smith@example.com</td>
                  <td>John Smith</td>
                  <td>1234567890</td>
                  <td>6000</td>
                  <td>Graphics</td>
                  <td>Batch B</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="update-btn">Update</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};
