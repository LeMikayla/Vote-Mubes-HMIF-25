import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import { Providers } from "./app/providers.jsx";
import "./assets/styles/index.css";

createRoot(document.getElementById("root")).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);
