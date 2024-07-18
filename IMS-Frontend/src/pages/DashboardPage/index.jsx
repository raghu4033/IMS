import { AdminDashboard } from "../../assets/Components/AdminDashboard";
import { FacultyDashboard } from "../../assets/Components/FacultyDashboard";
import { StudentDashboard } from "../../assets/Components/StudentDashboard";

export default function DashboardPage() {
  const authRole = localStorage.getItem("ims:auth:role");

  if (authRole === "ADMIN") {
    return <AdminDashboard></AdminDashboard>;
  } else if (authRole === "FACULTY") {
    return <FacultyDashboard></FacultyDashboard>;
  } else if (authRole === "STUDENT") {
    return <StudentDashboard></StudentDashboard>;
  } else {
    return <p>Not Found!</p>;
  }
}
