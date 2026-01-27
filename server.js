const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- IMPORT ROUTES (JEMBATAN) ---
// Kita panggil file routes yang sudah kamu buat di folder routes/
const authRoutes = require('./src/routes/authRoutes'); // Untuk Login
const voteRoutes = require('./src/routes/voteRoutes'); // Untuk Voting & Recap

const app = express();
const PORT = process.env.PORT || 3000;

// MODE ATMIN CIK (MIDDLEWARE)
// ======================
app.use(cors({
  origin: '*',  // Allow semua origin untuk development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

// Middleware wajib agar bisa baca JSON dari request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- REGISTER ROUTES (PEMASANGAN KABEL) ---
// ======================

// 1. Health Check (Tetap pertahankan untuk cek server nyala/nggak)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server Voting Himpunan is running with PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// 2. Auth Routes (Login)
// Semua URL yang depannya /api/auth akan diurus oleh authRoutes
// Contoh: POST /api/auth/login
app.use('/api/auth', authRoutes);

// 3. Vote Routes (Voting)
// Semua URL yang depannya /api/votes akan diurus oleh voteRoutes
// Contoh: POST /api/votes/submit, GET /api/votes/recap
app.use('/api/votes', voteRoutes);


// --- ERROR HANDLING (OPSIONAL TAPI BAGUS) ---
// Kalau user akses URL yang ga ada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan!'
  });
});


// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`==================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`Login:  POST http://localhost:${PORT}/api/auth/login`);
  console.log(`Vote:   POST http://localhost:${PORT}/api/votes/submit`);
  console.log(`Recap:  GET  http://localhost:${PORT}/api/votes/recap`);
  console.log(`==================================`);
});

module.exports = app;