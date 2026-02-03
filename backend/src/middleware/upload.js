const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan folder 'uploads' ada di root project backend Anda
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Ganti nama file biar unik
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// PENTING: Pakai export default untuk ESM
module.exports = upload;
