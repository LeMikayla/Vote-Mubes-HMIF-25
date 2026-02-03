import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/protectedRoute";

import DashboardAdminLayout from "./layouts/dashboardAdminLayout.jsx";
import MainLayout from "./layouts/mainLayout.jsx";
import AuthLayout from "./layouts/authLayout.jsx";

import Login from "../features/auth/pages/login.jsx";
import DashboardAdmin from "../features/admin/pages/dashboardAdmin.jsx";
import Voting from "../features/voting/pages/voting.jsx";
import Result from "../features/results/pages/result.jsx";

export const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "votes", element: <Voting /> },
          { path: "results", element: <Result /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <DashboardAdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboardAdmin" replace />,
          },
          { path: "dashboardAdmin", element: <DashboardAdmin /> },
        ],
      },
    ],
  },

  { path: "*", element: <div>404 Not Found</div> },
]);
