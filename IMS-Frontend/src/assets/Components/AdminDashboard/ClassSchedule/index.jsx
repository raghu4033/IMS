import moment from "moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
import { ClassScheduleForm } from "./ClassScheduleForm";

const columns = [
  {
    label: "Faculty Name",
    key: "faculty",
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
    label: "From",
    key: "fromDate",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY HH:mm A")
        : "N/A";
    },
  },
  {
    label: "To",
    key: "toDate",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY HH:mm A")
        : "N/A";
    },
  },
  {
    label: "Subject",
    key: "subject",
  },
  {
    label: "Class Type",
    key: "classType",
  },
];

export const ClassSchedule = () => {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getClassSchedules = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getClassSchedules);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setClasses(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClassSchedules();
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
          Add Class Schedule
        </button>
      </div>

      {isOpen ? (
        <ClassScheduleForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          getClassSchedules={getClassSchedules}
        />
      ) : (
        <></>
      )}

      {!loading ? (
        <Table rows={classes} columns={columns} title="Class Schedules List" />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
