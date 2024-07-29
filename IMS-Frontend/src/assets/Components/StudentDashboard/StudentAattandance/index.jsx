import { useEffect, useState } from "react";
import moment from "moment"
import "../styles.css";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";

const columns = [
  {
    label: "Faculty Name",
    key: "faculty",
    renderValue: (value) => {
      return [value?.firstName, value?.lastName].filter(Boolean).join(" ");
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

export const StudentAattandance = () => {

  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    sessions: [],
    present: 0,
    absent: 0,
  })

  const getAttendances = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getAttendances);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setAttendances(resp.data.data);
        const summaryData = {
          sessions: [],
          present: 0,
          absent: 0,
        }

        if (resp.data.data) {
          resp.data.data.forEach((a) => {
            const session = a.course?._id + a.date
            console.log(session, summaryData.sessions)
            if (!summaryData.sessions.includes(session)) {
              summaryData.sessions.push(session)
            }

            if (a.isPresent) {
              summaryData.present += 1;
            } else {
              summaryData.absent += 1;
            }
          })
        }

        setSummary({ ...summaryData })
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

  if (loading) {
    return <p> Loading...</p >
  }
  return (
    <>
      <div className="card-table-container">
        <div className="summary-cards">
          <div className="attandence-card total-sessions">
            <h3>Total Sessions</h3>
            <p className="count">{summary.sessions.length || 0}</p>
          </div>
          <div className="attandence-card present">
            <h3>Present</h3>
            <p className="count">{summary.present}</p>
          </div>
          <div className="attandence-card absent">
            <h3>Absent</h3>
            <p className="count">{summary.absent}</p>
          </div>
          <div className="attandence-card percentage">
            <h3>Percentage</h3>
            <p className="count">{summary.sessions.length ? (summary.present / summary.sessions.length) * 100 : 0}%</p>
          </div>
        </div>
      </div>
      <hr />
      <Table rows={attendances} columns={columns} />
    </>
  );
};
