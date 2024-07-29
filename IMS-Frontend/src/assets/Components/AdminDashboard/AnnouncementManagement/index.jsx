import moment from "moment";
import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
import { AnnouncementForm } from "./AnnouncementForm";
import Loader from "../../Common/Loader"; 

const columns = [
  {
    label: "Subject",
    key: "subject",
  },
  {
    label: "Description",
    key: "description",
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
    label: "Announced By",
    key: "user",
    renderValue: (value) => {
      return [value?.firstName, value?.middleName].filter(Boolean).join(" ");
    },
  },
  {
    label: "Announced For",
    key: "course",
    renderValue: (value) => {
      return value?.name;
    },
  },
];

export const AnnouncementManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAnnouncements = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getAnnouncements);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setAnnouncements(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <div className="action-button">
        <button
          disabled={loading}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Announcement
        </button>
      </div>

      {isOpen ? (
        <AnnouncementForm
          getAnnouncements={getAnnouncements}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <></>
      )}

      {!loading ? (
        <Table columns={columns} rows={announcements} title="Announcements List"/>
      ) : (
        <Loader/>
      )}
    </>
  );
};
