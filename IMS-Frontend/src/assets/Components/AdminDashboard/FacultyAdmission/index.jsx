import moment from "moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
import { FacultyAdmissionForm } from "./FacultyAdmissionForm";

const columns = [
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
    label: "Salary",
    key: "salary",
    renderValue: (value) => {
      return value
        ? Number(value).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })
        : "N/A";
    },
  },
];

export const FacultyAdmission = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [facultyAdmissions, setFacultyAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFacultyAdmissions = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getUsers}?role=FACULTY`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setFacultyAdmissions(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFacultyAdmissions();
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
          Faculty Admission
        </button>
      </div>

      {isOpen ? (
        <FacultyAdmissionForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          getFacultyAdmissions={getFacultyAdmissions}
        />
      ) : (
        <></>
      )}

      {!loading ? (
        <Table columns={columns} rows={facultyAdmissions} title="Faculty List" />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
