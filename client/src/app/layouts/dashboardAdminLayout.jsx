"use client";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../../lib/socket";

export default function DashboardAdminLayout({}) {
  const hasConnected = React.useRef(false); // ✅ Track connection status

  useEffect(() => {
    // ✅ Prevent double connection in React Strict Mode
    if (hasConnected.current) {
      console.log("⏭️ Skip duplicate mount");
      return;
    }

    console.log("🔌 DashboardAdminLayout: Setting up socket");
    hasConnected.current = true;

    const token = localStorage.getItem("token");

    if (token) {
      socket.auth = { token };
      console.log("✅ Token set to socket");
    } else {
      console.warn("⚠️ No token found");
    }

    // Connect only if not already connected
    if (!socket.connected) {
      console.log("🔌 Connecting socket...");
      socket.connect();
    } else {
      console.log("✅ Socket already connected");
    }

    // Cleanup
    return () => {
      console.log("🧹 DashboardAdminLayout: Cleanup");
      hasConnected.current = false;

      // Only disconnect if no other components are using the socket
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
