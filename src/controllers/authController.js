const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
  
  static async login(req, res) {
    // 1. Ambil input dari body
    const { username, password } = req.body;

    // 2. Validasi input kosong
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan Password wajib diisi!'
      });
    }

    try {
      // 3. Panggil Model: Cari user di DB
      const user = await UserModel.findByUsername(username);

      // 4. Cek apakah user ditemukan?
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Username tidak ditemukan.'
        });
      }

      // 5. Cek Password (Plain Text)
      // *Ingat: user.password adalah kolom di database
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Password salah.'
        });
      }

      // 6. Cek apakah sudah voting? (Opsional, tapi bagus buat UX)
      if (user.has_voted) {
        // Kita tetap izinkan login, tapi kasih info di data
        // Atau bisa juga ditolak loginnya kalau mau strict
      }

      // 7. Login Sukses!
        // GENERATE JWT
        const token = jwt.sign(
            { id: user.id, username: user.username }, // 
            'KUNCI_RAHASIA_NEGARA',                   // Secret Key 
            { expiresIn: '1h' }                       // Token hangus dalam 1 jam
        );

        return res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            token: token, // Kirim token ke frontend
            // Kita tidak perlu kirim ID lagi karena sudah ada di dalam token
        });

    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server.'
      });
    }
  }
}

module.exports = AuthController;