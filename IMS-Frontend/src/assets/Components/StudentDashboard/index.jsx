import { Route, Routes } from "react-router-dom";
import { StudentMenu } from "../../../Utils/Constants/StudentMenu";
import { Layout } from "../Common/Layout";
import { Dashboard } from "./Dashboard";
import { StudentAattandance } from "./StudentAattandance";

export const StudentDashboard = () => {
  return <Layout menu={StudentMenu}>
      <Routes>
        <Route path="dashboard/" element={<Dashboard />} />
        <Route path="student-attandance/" element={<StudentAattandance />} />
      </Routes>
  </Layout>;
};
