// src/controllers/authController.js
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
  static async login(req, res) {
    console.log('1. Request Login Masuk:', req.body); // <-- Cek Input

    const { username, password } = req.body;

    if (!username || !password) {
      console.log('2. Gagal: Input Kosong');
      return res.status(400).json({ message: 'Username/Password kosong' });
    }

    try {
      console.log('3. Mencari user di Database...');
      const user = await UserModel.findByUsername(username);
      console.log('4. Hasil Database:', user); // <-- Apakah user ketemu?

      if (!user) {
        console.log('5. Gagal: User tidak ditemukan');
        return res.status(401).json({ message: 'User tidak ditemukan' });
      }

      console.log('6. Cek Password...');
      if (user.password !== password) {
        console.log('7. Gagal: Password Salah');
        return res.status(401).json({ message: 'Password salah' });
      }

      console.log('8. User Valid, Membuat Token...');
      // Pastikan JWT_SECRET ada isinya
      if (!process.env.JWT_SECRET) {
        throw new Error('FATAL: JWT_SECRET belum di-set di .env!');
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      console.log('9. Berhasil! Masuk');
      return res.status(200).json({
        success: true,
        message: 'Login berhasil!',
        token: token,
        role: user.role
      });

    } catch (error) {
      console.error('ERROR PARAH DI LOGIN:', error); // <-- Lihat error aslinya
      return res.status(500).json({ message: 'Server Error: ' + error.message });
    }
  }
}

module.exports = AuthController;