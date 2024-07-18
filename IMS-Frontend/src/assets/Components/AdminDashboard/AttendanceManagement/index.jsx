import { useEffect, useState } from "react";
import ApiService from "../../../../Utils/ApiService";
import { Drawer } from "../../Common/Drawer";
import { AttendanceForm } from "./AttendanceForm";

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
