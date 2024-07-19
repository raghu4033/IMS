import { Route, Routes } from "react-router-dom";
import { FacultyMenu } from "../../../Utils/Constants/FacultyMenu";
import { Layout } from "../Common/Layout";
import { AnnouncementManagement } from "./AnnouncementManagement";

export const FacultyDashboard = () => {
  return (
    <Layout menu={FacultyMenu}>
      <Routes>
        <Route path="/notice-board" element={<AnnouncementManagement />} />
      </Routes>
    </Layout>
  );
};
