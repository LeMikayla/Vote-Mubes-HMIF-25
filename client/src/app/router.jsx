import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/protectedRoute";

import DashboardAdminLayout from "./layouts/DashboardAdmin.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

import Login from "../features/auth/pages/login.jsx";
import DashboardAdmin from "../features/admin/pages/dashboardAdmin.jsx";
import Voting from "../features/voting/pages/voting.jsx";
import Result from "../features/results/pages/result.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },

  {
    element: <ProtectedRoute allowedRoles={["voter"]} />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "vote", element: <Voting /> },
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
        children: [{ path: "dashboardAdmin", element: <DashboardAdmin /> }],
      },
    ],
  },

  { path: "*", element: <div>404 Not Found</div> },
]);
