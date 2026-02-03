const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const ConfigModel = require("./src/models/configModel");

// --- LIST ROUTES ---
const authRoutes = require("./src/routes/authRoutes"); // Untuk Login
const voteRoutes = require("./src/routes/voteRoutes"); // Untuk Voting & Recap
const candidateRoutes = require("./src/routes/candidateRoutes"); // Untuk Admin CRUD Kandidat
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// 3. BUNGKUS EXPRESS DENGAN HTTP SERVER
// (Ini wajib dilakukan agar WebSocket bisa berjalan di port yang sama)
const server = http.createServer(app);

// 4. INISIALISASI SOCKET.IO
const io = new Server(server, {
  cors: {
    // Sesuaikan URL frontend kamu (Vite biasanya di port 5173)
    origin: process.env.CLIENT_URL || "http://103.150.227.78:5173",
    methods: ["GET", "POST"],
  },
});

// --- MIDDLEWARE ---
// ======================
app.use(
  cors({
    origin: "*", // Allow semua origin (matikan ini di production jika perlu strict)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

// Handle preflight requests
app.options("*", cors());
// Parsing JSON & URL Encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log(`🔌 Client Terhubung: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client Terputus: ${socket.id}`);
  });
});

// --- REGISTER ROUTES (PEMASANGAN KABEL) ---
// ======================

// GET: Dipanggil oleh VotingPage.jsx & Admin Dashboard
app.get("/api/election/config", async (req, res) => {
  try {
    const config = await ConfigModel.getConfig(); // Ambil dari DB
    res.json(config);
  } catch (error) {
    console.error("Error Get Config:", error);
    res.status(500).json({ message: "Gagal mengambil konfigurasi" });
  }
});

// PUT: Dipanggil oleh Admin untuk ubah jadwal
app.put("/api/election/config", async (req, res) => {
  try {
    const updatedConfig = await ConfigModel.updateConfig(req.body); // Simpan ke DB
    io.emit("config_update", updatedConfig);
    console.log("✅ Jadwal Updated di DB:", updatedConfig);

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

// 1. Health Check (Cek denyut nadi server)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server Voting Himpunan is running with PostgreSQL",
    timestamp: new Date().toISOString(),
  });
});

// 2. Auth Routes (Login)
app.use("/api/auth", authRoutes);

// 3. Vote Routes (Voting & Hasil)
app.use("/api/votes", voteRoutes);

// 4. Candidate Routes (Admin Only)
// PERBAIKAN: Baris ini harus ditaruh SEBELUM Error Handling 404
app.use("/api/candidates", candidateRoutes);

// 5. User Routes (Admin Only)
app.use("/api/users", userRoutes);

// --- ERROR HANDLING (SATPOL PP) ---
// ======================

// 1. Handler 404 (Route Tidak Ditemukan)
// Ini menangkap semua request yang URL-nya tidak cocok dengan route di atas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan! Cek kembali URL Anda.",
  });
});

// 2. Global Error Handler (Handler 500)
// Ini menangkap error coding (misal: variable not defined) biar server gak crash/mati
app.use((err, req, res, next) => {
  console.error("🔥 TERJADI ERROR DI SERVER:", err.stack);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal pada server.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// --- START SERVER ---
// ======================
server.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.io active`);
  console.log(`------------------------------------------`);
  console.log(`Health Check: GET  http://localhost:${PORT}/health`);
  console.log(
    `Config:       GET  http://localhost:${PORT}/api/election/config`,
  );
  console.log(`Login:        POST http://localhost:${PORT}/api/auth/login`);
  console.log(`Candidates:   GET  http://localhost:${PORT}/api/candidates`);
  console.log(`Voting:       POST http://localhost:${PORT}/api/votes/submit`);
  console.log(`==========================================`);
});

module.exports = app;
