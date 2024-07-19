import { Route, Routes } from "react-router-dom";
import { FacultyMenu } from "../../../Utils/Constants/FacultyMenu";
import { Layout } from "../Common/Layout";
import { AnnouncementManagement } from "./AnnouncementManagement";
import { AttendanceManagement } from "./AttendanceManagement";
import { FacultyProfile } from "./FacultyProfile";

export const FacultyDashboard = () => {
  return (
    <Layout menu={FacultyMenu}>
      <Routes>
        <Route path="/notice-board" element={<AnnouncementManagement />} />
        <Route path="/attendances" element={<AttendanceManagement />} />
        <Route path="/view-profile" element={<FacultyProfile />} />
      </Routes>
    </Layout>
  );
};
