import moment from "moment/moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
// import { SubmissionsForm } from "./SubmissionsForm";
import Loader from "../../Common/Loader";
import { SubmissionDetails } from "./SubmissionDetails";

export const Submissions = () => {
  const [isOpen, setIsOpen] = useState({ open: false, id: null });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSubmissions = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getSubmissions);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setSubmissions(resp?.data?.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  const openViewDrawer = (id) => {
    setIsOpen({ open: true, id });
  };

  const columns = () => [
    {
      label: "Faculty",
      key: "createdBy",
      renderValue: (value) => {
        return (
          [value?.firstName, value?.lastName].filter(Boolean).join(" ") || "N/A"
        );
      },
    },
    {
      label: "Title",
      key: "title",
      renderValue: (value) => {
        return value || "N/A";
      },
    },
    {
      label: "From",
      key: "fromDate",
      renderValue: (value) => {
        return value && moment(value).isValid()
          ? moment(value).format("DD MMMM YYYY")
          : "N/A";
      },
    },
    {
      label: "To",
      key: "toDate",
      renderValue: (value) => {
        return value && moment(value).isValid()
          ? moment(value).format("DD MMMM YYYY")
          : "N/A";
      },
    },
    {
      label: "Status",
      key: "submittedAt",
      renderValue: (value, row) => {
        return (
          <>
            {moment().isBetween(moment(row.fromDate), moment(row.toDate)) ? (
              <span className="success-text">Open</span>
            ) : (
              <span className="error-text">Closed</span>
            )}
          </>
        );
      },
    },
    {
      label: "Action",
      key: "_id",
      renderValue: (value) => {
        return <button onClick={() => openViewDrawer(value)}>View</button>;
      },
    },
  ];

  return (
    <>
      {!loading ? (
        <Table columns={columns()} rows={submissions} title="Submissions" />
      ) : (
        <Loader />
      )}
      {isOpen.open ? (
        <SubmissionDetails
          id={isOpen.id}
          open={isOpen.open}
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
