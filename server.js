const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- LIST ROUTES ---
const authRoutes = require('./src/routes/authRoutes');           // Untuk Login
const voteRoutes = require('./src/routes/voteRoutes');           // Untuk Voting & Recap
const candidateRoutes = require('./src/routes/candidateRoutes'); // Untuk Admin CRUD Kandidat

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---
// ======================
app.use(cors({
  origin: '*',  // Allow semua origin (matikan ini di production jika perlu strict)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

// Parsing JSON & URL Encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- REGISTER ROUTES (PEMASANGAN KABEL) ---
// ======================

// 1. Health Check (Cek denyut nadi server)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server Voting Himpunan is running with PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// 2. Auth Routes (Login)
app.use('/api/auth', authRoutes);

// 3. Vote Routes (Voting & Hasil)
app.use('/api/votes', voteRoutes);

// 4. Candidate Routes (Admin Only)
// PERBAIKAN: Baris ini harus ditaruh SEBELUM Error Handling 404
app.use('/api/candidates', candidateRoutes);


// --- ERROR HANDLING (SATPOL PP) ---
// ======================

// 1. Handler 404 (Route Tidak Ditemukan)
// Ini menangkap semua request yang URL-nya tidak cocok dengan route di atas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan! Cek kembali URL Anda.'
  });
});

// 2. Global Error Handler (Handler 500)
// Ini menangkap error coding (misal: variable not defined) biar server gak crash/mati
app.use((err, req, res, next) => {
  console.error('🔥 TERJADI ERROR DI SERVER:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


// --- START SERVER ---
// ======================
app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`------------------------------------------`);
  console.log(`Health Check: GET  http://localhost:${PORT}/health`);
  console.log(`Login:        POST http://localhost:${PORT}/api/auth/login`);
  console.log(`Voting:       POST http://localhost:${PORT}/api/votes/submit`);
  console.log(`Candidates:   GET  http://localhost:${PORT}/api/candidates`);
  console.log(`==========================================`);
});

module.exports = app;