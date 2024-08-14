import { Route, Routes } from "react-router-dom";
import { StudentMenu } from "../../../Utils/Constants/StudentMenu";
import { Layout } from "../Common/Layout";
import { CapstoneSubmissions } from "./CaptoneSubmission";
import { Dashboard } from "./Dashboard";
import { StudentAattandance } from "./StudentAattandance";
import { StudentClasses } from "./StudentClasses";
import { StudentEvents } from "./StudentEvents";
import { StudentFees } from "./StudentFees";
import { StudentGenerateCertificate } from "./StudentGenerateCertificate";
import { StudentNotice } from "./StudentNotice";
import { StudentProfile } from "./StudentProfile";

export const StudentDashboard = () => {
  return (
    <Layout menu={StudentMenu}>
      <Routes>
        <Route path="student-profile/" element={<StudentProfile />} />
        <Route path="dashboard/" element={<Dashboard />} />
        <Route path="student-attandance/" element={<StudentAattandance />} />
        <Route path="student-fees/" element={<StudentFees />} />
        <Route path="student-events/" element={<StudentEvents />} />
        <Route path="student-announcements/" element={<StudentNotice />} />
        <Route path="student-class-schedule/" element={<StudentClasses />} />
        <Route path="student-generate-certificate/" element={<StudentGenerateCertificate />} />
        <Route path="capstone-submission/" element={<CapstoneSubmissions />} />
      </Routes>
    </Layout>
  );
};
