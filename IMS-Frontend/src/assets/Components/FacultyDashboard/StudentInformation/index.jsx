import { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "../../Common/Table";
import ApiService from "../../../../Utils/ApiService";
import Loader from "../../Common/Loader";

const columns = [
  {
    label: "Student ID",
    key: "sid",
  },
  {
    label: "Academic Year",
    key: "academicYear",
  },
  {
    label: "Joining Date",
    key: "joiningDate",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY")
        : "N/A";
    },
  },
  {
    label: "First Name",
    key: "firstName",
  },
  {
    label: "Middle Name",
    key: "middleName",
  },
  {
    label: "Last Name",
    key: "lastName",
  },
  {
    label: "Email",
    key: "email",
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
    label: "Gender",
    key: "gender",
  },
  {
    label: "Nationality",
    key: "nationality",
  },
  {
    label: "Blood Group",
    key: "bloodGroup",
  },
  {
    label: "Cast",
    key: "cast",
  },
  {
    label: "Permanent Address",
    key: "permanentAddress",
  },
  {
    label: "Present Address",
    key: "presentAddress",
  },
  {
    label: "City",
    key: "city",
  },
  {
    label: "Pin",
    key: "pin",
  },
  {
    label: "Mobile",
    key: "mobile",
  },
  {
    label: "Parents Name",
    key: "parentsName",
  },
  {
    label: "Parents Mobile",
    key: "parentsMobile",
  },
  {
    label: "Fees",
    key: "totalFees",
    renderValue: (value) => {
      return value
        ? Number(value).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })
        : "N/A";
    },
  },
  {
    label: "Course",
    key: "course",
    renderValue: (value) => {
      return value?.name || "N/A";
    },
  },
  {
    label: "Batch",
    key: "batch",
  },
  // {
  //   label: "Actions",
  //   key: "studentId",
  // },
];

export const StudentInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentAdmissions, setStudentAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudentAdmissions = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getUsers}?role=STUDENT`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setStudentAdmissions(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentAdmissions();
  }, []);

  return (
    <>
      {!loading ? (
        <Table columns={columns} rows={studentAdmissions} title="Student Admission"/>
      ) : (
       <Loader/>
      )}
    </>
  );
};
