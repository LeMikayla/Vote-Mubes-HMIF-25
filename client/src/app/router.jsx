import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/protectedRoute";

import dashboardAdminLayout from "./layouts/dashboardAdmin.jsx";
import mainLayout from "./layouts/mainLayout.jsx";
import authLayout from "./layouts/authLayout.jsx";

import login from "../features/auth/pages/login.jsx";
import dashboardAdmin from "../features/admin/pages/dashboardAdmin.jsx";
import voting from "../features/voting/pages/voting.jsx";
import result from "../features/results/pages/result.jsx";
import voterAdmin from "../features/admin/pages/voterAdmin.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <authLayout />,
    children: [{ path: "login", element: <login /> }],
  },

  {
    element: <ProtectedRoute allowedRoles={["voter"]} />,
    children: [
      {
        path: "/",
        element: <mainLayout />,
        children: [
          { path: "vote", element: <voting /> },
          { path: "results", element: <result /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <dashboardAdminLayout />,
        children: [
          { path: "dashboardAdmin", element: <dashboardAdmin /> },
          { path: "voterAdmin", element: <voterAdmin /> },
        ],
      },
    ],
  },

  { path: "*", element: <div>404 Not Found</div> },
]);
