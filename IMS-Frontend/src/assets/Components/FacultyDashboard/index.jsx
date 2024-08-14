import { Route, Routes } from "react-router-dom";
import { FacultyMenu } from "../../../Utils/Constants/FacultyMenu";
import { Layout } from "../Common/Layout";
import { Dashboard } from "../FacultyDashboard/Dashboard";
import { StudentInformation } from "../FacultyDashboard/StudentInformation";
import { StudentInquiry } from "../FacultyDashboard/StudentInquiry";
import { AnnouncementManagement } from "./AnnouncementManagement";
import { AttendanceManagement } from "./AttendanceManagement";
import { CapstoneSubmissions } from "./CaptoneSubmission";
import { FacultyProfile } from "./FacultyProfile";

export const FacultyDashboard = () => {
  return (
    <Layout menu={FacultyMenu}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notice-board" element={<AnnouncementManagement />} />
        <Route path="/attendances" element={<AttendanceManagement />} />
        <Route path="/student-information" element={<StudentInformation />} />
        <Route path="/view-profile" element={<FacultyProfile />} />
        <Route path="/submissions" element={<CapstoneSubmissions />} />
        <Route path="/student-inquiry" element={<StudentInquiry />} />
      </Routes>
    </Layout>
  );
};
