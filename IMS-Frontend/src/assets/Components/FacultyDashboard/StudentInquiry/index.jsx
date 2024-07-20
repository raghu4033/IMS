import moment from "moment/moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
import { StudentInquiryForm } from "./StudentInquiryForm";
import Loader from "../../Common/Loader"; 

const columns = [
  {
    label: "Date",
    key: "joiningDate",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY")
        : "N/A";
    },
  },
  {
    label: "Full Name",
    key: "fullName",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Mobile",
    key: "mobile",
  },
  {
    label: "Whatsapp",
    key: "whatsapp",
  },
  {
    label: "Course",
    key: "course",
    renderValue: (value) => {
      return value?.name || "N/A";
    },
  },
  {
    label: "Date of Birth",
    key: "dob",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY")
        : "N/A";
    },
  },
  {
    label: "Reference",
    key: "reference",
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
      <div className="action-button">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={loading}
        >
          Student Inquiry
        </button>
      </div>
      {!loading ? (
        <Table columns={columns} rows={studentInquiries} title="Student Inquiry"/>
      ) : (
        <Loader />
      )}
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
