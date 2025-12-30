const rateLimit = require('express-rate-limit');

// Rate limiting untuk endpoint vote
const voteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // 5 requests per 15 menit untuk voting
  message: {
    success: false,
    error: 'Terlalu banyak permintaan voting. Silakan tunggu 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  keyGenerator: (req) => {
    // Gunakan IP + NIS jika ada untuk lebih akurat
    return req.ip + (req.body?.nis || '');
  }
});

// Rate limiting untuk hasil voting
const resultsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 60, // 60 requests per menit
  message: {
    success: false,
    error: 'Terlalu banyak permintaan. Silakan tunggu sebentar.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting umum untuk API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // 100 requests per 15 menit
  message: {
    success: false,
    error: 'Terlalu banyak permintaan ke API.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  voteLimiter,
  resultsLimiter,
  apiLimiter
};