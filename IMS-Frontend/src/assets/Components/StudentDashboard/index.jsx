import { Route, Routes } from "react-router-dom";
import { StudentMenu } from "../../../Utils/Constants/StudentMenu";
import { Layout } from "../Common/Layout";
import { Dashboard } from "./Dashboard";
import { StudentProfile } from "./StudentProfile";
import { StudentAattandance } from "./StudentAattandance";
import { StudentClassSchedule } from "./StudentClassSchedule";
import { StudentEvents } from "./StudentEvents";
import { StudentAnnouncements } from "./StudentAnnouncements";
import { StudentFees } from "./StudentFees";
import { StudentGenerateCertificate } from "./StudentGenerateCertificate";

export const StudentDashboard = () => {
  return <Layout menu={StudentMenu}>
      <Routes>
        <Route path="dashboard/" element={<Dashboard />} />
        <Route path="student-profile/" element={<StudentProfile />} />
        <Route path="student-attandance/" element={<StudentAattandance />} />
        <Route path="student-class-schedule/" element={<StudentClassSchedule />} />
        <Route path="student-events/" element={<StudentEvents />} />
        <Route path="student-announcements/" element={<StudentAnnouncements />} />
        <Route path="student-fees/" element={<StudentFees />} />
        <Route path="student-generate-certificate/" element={<StudentGenerateCertificate />} />
      </Routes>
  </Layout>;
};
