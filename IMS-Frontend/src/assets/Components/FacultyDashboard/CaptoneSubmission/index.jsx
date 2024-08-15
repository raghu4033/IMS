import moment from "moment/moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import Loader from "../../Common/Loader";
import { Table } from "../../Common/Table";
import { SubmissionForm } from "./SubmissionForm";

export const CapstoneSubmissions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentInquiries, setStudentInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudentSubmissions = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        ApiService.ApiURLs.getStudentSubmissions
      );
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

  const columns = () => [
    {
      label: "Student",
      key: "createdBy",
      renderValue: (value) => {
        return (
          [value?.firstName, value?.lastName].filter(Boolean).join(" ") || "N/A"
        );
      },
    },
    {
      label: "File",
      key: "fileUrl",
      renderValue: (value) => {
        return (
          <>
            <a href={value} download target="_blank">
              View
            </a>
          </>
        );
      },
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Submitted At",
      key: "submittedAt",
      renderValue: (value) => {
        return value && moment(value).isValid()
          ? moment(value).format("DD MMMM YYYY")
          : "N/A";
      },
    },
    {
      label: "Submission",
      key: "submission",
      renderValue: (value) => {
        return value?.title || "N/A";
      },
    },
  ];

  useEffect(() => {
    getStudentSubmissions();
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
          Add Submission
        </button>
      </div>
      {!loading ? (
        <Table
          columns={columns()}
          rows={studentInquiries}
          title="Submissions"
        />
      ) : (
        <Loader />
      )}
      {isOpen ? (
        <SubmissionForm
          getStudentSubmissions={getStudentSubmissions}
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
