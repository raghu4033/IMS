import { Route, Routes } from "react-router-dom";
import { AdminMenu } from "../../../Utils/Constants/AdminMenu";
import { Layout } from "../Common/Layout";
import { Dashboard } from "./Dashboard";
import { ManageStudent } from "./ManageStudent";
import { StudentInquiry } from "./StudentInquiry";
import { StudentAdmission } from "./StudentAdmission";

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
        <Route path="/manage-faculty" element={<ManageStudent />} />
        <Route path="/class-schedule" element={<ManageStudent />} />
        <Route path="/attandance-management" element={<ManageStudent />} />
        <Route path="/fees-management" element={<ManageStudent />} />
        <Route path="/generate-certificate" element={<ManageStudent />} />
        <Route path="/notice-management" element={<ManageStudent />} />
        <Route path="/event-management" element={<ManageStudent />} />
      </Routes>
    </Layout>
  );
};
