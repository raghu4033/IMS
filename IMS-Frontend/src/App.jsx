import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <LoginPage />,
    
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
