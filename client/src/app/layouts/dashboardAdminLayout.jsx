"use client";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../../lib/socket";
import AdminNavbar from "../../features/admin/components/adminNavbar";

export default function DashboardAdminLayout({}) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      socket.auth = { token };
    }

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

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}
