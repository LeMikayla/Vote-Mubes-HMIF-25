import { useEffect } from "react";
import { socket } from "../../../lib/socket";

export default function DashboardAdminLayout({ children }) {
  useEffect(() => {
    socket.connect();

    const handleOnline = () => {
      socket.connect();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      socket.disconnect();
      window.removeEventListener("online", handleOnline);
    };
  }, []);
}
