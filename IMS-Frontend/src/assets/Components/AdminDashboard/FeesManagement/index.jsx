import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { FeesManagementForm } from "./FeesManagementForm";
import { Table } from "../../Common/Table";
import moment from "moment";

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
      return value && moment(value).isValid()
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

export const FeesManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentFees, setStudentFes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudentFees = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getStudentFees);
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
    getStudentFees();
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
          Fees Collection
        </button>
      </div>

      {isOpen ? (
        <FeesManagementForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          getStudentFees={getStudentFees}
        />
      ) : (
        <></>
      )}
      {!loading ? (
        <Table columns={columns} rows={studentFees} title="Students Fees Records" />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
