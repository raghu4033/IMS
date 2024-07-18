import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import "../styles.css";
import moment from "moment";
import { Table } from "../../Common/Table";

const columns = [
  {
    label: "Student",
    key: "student",
    renderValue: (value) => {
      return [value?.firstName, value?.lastName].filter(Boolean).join(" ");
    },
  },
  {
    label: "Total Fees",
    key: "totalFees",
    renderValue: (value, row) => {
      return row?.student
        ? Number(row?.student?.totalFees).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })
        : "N/A";
    },
  },
  {
    label: "Remaining Fees",
    key: "remainingFees",
    renderValue: (value, row) => {
      return row?.student
        ? Number(row?.student?.remainingFees).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })
        : "N/A";
    },
  },
  {
    label: "Fees Amount",
    key: "feesAmount",
    renderValue: (value) => {
      return value
        ? Number(value).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })
        : "N/A";
    },
  },
  {
    label: "Payment Date",
    key: "paymentDate",
    renderValue: (value) => {
      return moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY")
        : "N/A";
    },
  },
  {
    label: "Install. Number",
    key: "installmentNumber",
    renderValue: (value) => {
      return value || "N/A";
    },
  },
  {
    label: "Receipt Number",
    key: "receiptNo",
    renderValue: (value) => {
      return value || "N/A";
    },
  },
  {
    label: "Payment By",
    key: "paymentType",
    renderValue: (value) => {
      return value || "N/A";
    },
  },
];

export const StudentFees = () => {
  const [studentFees, setStudentFes] = useState([]);
  const [loading, setLoading] = useState(false);

  const localStore = JSON.parse(
    localStorage.getItem("ims:auth:profile") || "{}"
  );

  const getStudentFees = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getStudentFees}?student=${localStore?._id}`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setStudentFes(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStore?._id) getStudentFees();
  }, [localStore?._id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="card-container">
        <div className="fees-summary-card fees-summary-total">
          <div className="summary-content">
            <p>
              <strong>Total Fees:</strong> $
              {studentFees.length
                ? Number(
                    studentFees[0]?.student?.totalFees || 0
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                  })
                : "0"}
            </p>
          </div>
        </div>
        <div className="fees-summary-card fees-summary-paid">
          <div className="summary-content">
            <p>
              <strong>Paid Fees:</strong> $
              {Number(
                studentFees.reduce(
                  (prev, fees) => prev + Number(fees?.feesAmount || 0),
                  0
                )
              ).toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className="fees-summary-card fees-summary-remaining">
          <div className="summary-content">
            <p>
              <strong>Remaining Fees:</strong> $
              {studentFees.length
                ? Number(
                    studentFees[0]?.student?.remainingFees || 0
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                  })
                : "0"}
            </p>
          </div>
        </div>
      </div>
      {studentFees[0]?.feesAmount ? (
        <Table columns={columns} rows={studentFees} />
      ) : (
        <></>
      )}
    </>
  );
};
