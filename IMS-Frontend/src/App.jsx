import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./assets/Components/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import FacultyDashboardPage from "./pages/FacultyDashboardPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="student-dashboard/*"
          element={
            <ProtectedRoute>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="faculty-dashboard/*"
          element={
            <ProtectedRoute>
              <FacultyDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
