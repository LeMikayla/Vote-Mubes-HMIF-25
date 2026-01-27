import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
  transports: ["polling", "websocket"],

  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Socket terhubung! ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Socket terputus.");
});

socket.on("connect_error", (err) => {
  console.log("Socket error:", err.message);
});
