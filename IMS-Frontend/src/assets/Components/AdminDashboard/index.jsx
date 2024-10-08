import { Route, Routes } from "react-router-dom";
import { AdminMenu } from "../../../Utils/Constants/AdminMenu";
import { Layout } from "../Common/Layout";
import { Dashboard } from "./Dashboard";
import { ManageStudent } from "./ManageStudent";
import { StudentInquiry } from "./StudentInquiry";
import { StudentAdmission } from "./StudentAdmission";
import { GenerateCertificate } from "./GenerateCertificate";
import { FacultyAdmission } from "./FacultyAdmission";
import { AttendanceManagement } from "./AttendanceManagement";
import { AnnouncementManagement } from "./AnnouncementManagement";
import { ClassSchedule } from "./ClassSchedule";
import { EventManagement } from "./EventManagement";
import { FeesManagement } from "./FeesManagement";
import { Submissions } from "./Submissions";

export const AdminDashboard = () => {
  return (
    <Layout menu={AdminMenu}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-student" element={<ManageStudent />} />
        <Route path="/student-inquiry" element={<StudentInquiry />} />
        <Route path="/student-admission" element={<StudentAdmission />} />
        <Route path="/faculty-admission" element={<ManageStudent />} />
        <Route path="/manage-student" element={<ManageStudent />} />
        <Route path="/manage-faculty" element={<FacultyAdmission />} />
        <Route path="/class-schedule" element={<ClassSchedule/>} />
        <Route path="/attandance-management" element={<AttendanceManagement />} />
        <Route path="/fees-management" element={<FeesManagement />} />
        <Route path="/generate-certificate" element={<GenerateCertificate />} />
        <Route path="/notice-management" element={<AnnouncementManagement />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
    </Layout>
  );
};
