import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import ApiService from '../../../../Utils/ApiService';
import { Table } from '../../Common/Table';
import { StudentInquiryForm } from './StudentInquiryForm';

const columns = [
  {
    label: 'Date',
    key: 'joiningDate',
    renderValue: (value, row) => {
      return moment(value).format('DD MMMM YYYY');
    },
  },
  {
    label: 'Full Name',
    key: 'fullName',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Mobile',
    key: 'mobile',
  },
  {
    label: 'Whatsapp',
    key: 'whatsapp',
  },
  {
    label: 'Course',
    key: 'course',
    renderValue: (value, row) => {
      return value?.name || 'N/A';
    },
  },
  {
    label: 'Date of Birth',
    key: 'dob',
    renderValue: (value, row) => {
      return moment(value).format('DD MMMM YYYY');
    },
  },
  {
    label: 'Reference',
    key: 'reference',
  },
];

export const StudentInquiry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentInquiries, setStudentInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudentInquiries = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getStudentInquiries);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setStudentInquiries(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentInquiries();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        disabled={loading}
      >
        Student Inquiry
      </button>
      <Table columns={columns} rows={studentInquiries} />
      {isOpen ? (
        <StudentInquiryForm
          getStudentInquiries={getStudentInquiries}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
