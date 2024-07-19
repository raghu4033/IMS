import { useEffect, useState } from "react";
import { EventManagementForm } from "./EventManagementForm";
import ApiService from "../../../../Utils/ApiService";
import { Table } from "../../Common/Table";
import moment from "moment";

const columns = [
  {
    label: "Event Name",
    key: "name",
  },
  {
    label: "Event Place",
    key: "place",
  },
  {
    label: "Event Date",
    key: "date",
    renderValue: (value) => {
      return value && moment(value).isValid()
        ? moment(value).format("DD MMMM YYYY")
        : "N/A";
    },
  },
  {
    label: "Organized By",
    key: "user",
    renderValue: (value) => {
      return [value?.firstName, value?.middleName].filter(Boolean).join(" ");
    },
  },
];

export const EventManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(ApiService.ApiURLs.getEvents);
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setEvents(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
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
          Add Event
        </button>
      </div>

      {!loading ? <Table columns={columns} rows={events} /> : <p>Loading...</p>}

      {isOpen ? (
        <EventManagementForm
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          getEvents={getEvents}
        />
      ) : (
        <></>
      )}
    </>
  );
};
