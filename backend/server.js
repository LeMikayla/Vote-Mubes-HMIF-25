const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const path = require("path");

const ConfigModel = require("./src/models/configModel");

const authRoutes = require("./src/routes/authRoutes");
const voteRoutes = require("./src/routes/voteRoutes");
const candidateRoutes = require("./src/routes/candidateRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// ✅ SIMPLIFY Socket.IO config
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  // ✅ Tambahkan ini
  allowEIO3: true,
  transports: ["websocket", "polling"],
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// ❌ COMMENT ATAU HAPUS AUTH MIDDLEWARE INI DULU
/*
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    next();
  } else {
    next(new Error("Authentication error"));
  }
});
*/

// ✅ LANGSUNG KE CONNECTION HANDLER
io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Log auth info if available
  if (socket.handshake.auth && socket.handshake.auth.token) {
    console.log(
      `🔑 Token received: ${socket.handshake.auth.token.substring(0, 10)}...`,
    );
  }

  socket.on("disconnect", (reason) => {
    console.log(`❌ Client disconnected: ${socket.id}, Reason: ${reason}`);
  });

  // Test emit
  socket.emit("test", { message: "Connection successful!" });
});

// Export function untuk broadcast
global.broadcastVoteUpdate = (results, statistics) => {
  console.log("📡 Broadcasting vote update to all clients");
  io.emit("vote_update", { results, statistics });
};

// Routes
app.get("/api/election/config", async (req, res) => {
  try {
    const config = await ConfigModel.getConfig();
    res.json(config);
  } catch (error) {
    console.error("Error Get Config:", error);
    res.status(500).json({ message: "Gagal mengambil konfigurasi" });
  }
});

app.put("/api/election/config", async (req, res) => {
  try {
    const updatedConfig = await ConfigModel.updateConfig(req.body);
    io.emit("config_updated", updatedConfig);
    console.log("✅ Config updated & broadcasted:", updatedConfig);

    res.json({
      success: true,
      message: "Konfigurasi berhasil diperbarui",
      data: updatedConfig,
    });
  } catch (error) {
    console.error("Error Update Config:", error);
    res.status(500).json({ message: "Gagal menyimpan konfigurasi" });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server Voting Himpunan is running with PostgreSQL",
    timestamp: new Date().toISOString(),
    socketConnections: io.engine.clientsCount,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan! Cek kembali URL Anda.",
  });
});

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal pada server.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

server.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.io ready at ws://localhost:${PORT}`);
  console.log(`------------------------------------------`);
  console.log(`Health: GET http://localhost:${PORT}/health`);
  console.log(`==========================================`);
});

module.exports = app;
