const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil bagian tokennya saja

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak! Token tidak ada.' });
  }

  // 2. Verifikasi Token
  jwt.verify(token, 'KUNCI_RAHASIA_NEGARA', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid atau kadaluarsa.' });
    }

    req.user = decoded; 
    next(); // Lanjut ke Controller
  });
};

module.exports = verifyToken;