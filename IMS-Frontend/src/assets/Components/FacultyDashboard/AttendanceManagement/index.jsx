import moment from "moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
import { AttendanceForm } from "./AttendanceForm";

const columns = [
  {
    label: "Faculty Name",
    key: "faculty",
    renderValue: (value) => {
      return [value?.firstName, value?.lastName].filter(Boolean).join(" ");
    },
  },
  {
    label: "Student Name",
    key: "student",
    renderValue: (value) => {
      return [value?.firstName, value?.lastName].filter(Boolean).join(" ");
    },
  },
  {
    label: "Course Name",
    key: "course",
    renderValue: (value) => {
      return value?.name || "N/A";
    },
  },
  {
    label: "Date",
    key: "date",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY")
        : "N/A";
    },
  },
  {
    label: "is Present?",
    key: "isPresent",
    renderValue: (value) => {
      return value ? "Yes" : "No";
    },
  },
];

export const AttendanceManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAttendances = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getAttendances);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setAttendances(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttendances();
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
          Take Attendance
        </button>
      </div>

      {!loading ? <Table rows={attendances} columns={columns} title="Student Attandence" /> : <></>}

      {isOpen ? (
        <AttendanceForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          getAttendances={getAttendances}
        />
      ) : (
        <></>
      )}
    </>
  );
};
