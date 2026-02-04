import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

console.log("🔧 Initializing socket with URL:", URL);

const token = localStorage.getItem("token");

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  auth: token ? { token } : {},
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  timeout: 20000,
});

socket.on("connect", () => {
  console.log("✅ Socket CONNECTED! ID:", socket.id);
});

socket.on("test", (data) => {
  console.log("🧪 Test event received:", data);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket DISCONNECTED. Reason:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
  console.error("Full error:", err);
});

socket.io.on("error", (error) => {
  console.error("❌ Socket.io engine error:", error);
});

socket.io.on("reconnect_attempt", (attempt) => {
  console.log(`🔄 Reconnect attempt ${attempt}`);
});

socket.io.on("reconnect", (attempt) => {
  console.log(`✅ Reconnected after ${attempt} attempts`);
});