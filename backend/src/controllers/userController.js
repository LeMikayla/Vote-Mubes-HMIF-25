const UserModel = require("../models/userModel");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data pemilih",
      });
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User tidak ditemukan" });
      }

      // Hapus password sebelum dikirim ke frontend biar aman
      delete user.password;

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUserByUsername(req, res) {
    const { username } = req.params; // Kita ambil dari URL parameter

    try {
      const user = await UserModel.findByUsername(username);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Username tidak ditemukan" });
      }

      // Hapus password agar aman
      delete user.password;

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await UserModel.deleteAllVoters();

      res.json({
        success: true,
        message:
          "Semua data pemilih (DPT) berhasil dihapus. Database bersih & siap import ulang.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menghapus data pemilih." });
    }
  }

  static async importUsers(req, res) {
    const { users } = req.body; // Menerima { users: [...] }

    // Validasi data masuk
    if (!users || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({
        message:
          "Data tidak valid. Pastikan format Excel benar dan tidak kosong.",
      });
    }

    try {
      console.log(`📥 Memproses import ${users.length} data...`);

      await UserModel.bulkCreate(users);

      res.status(201).json({
        success: true,
        message: `Berhasil memproses ${users.length} data pemilih.`,
      });
    } catch (error) {
      console.error("Import Error:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat import data ke database.",
      });
    }
  }
}

module.exports = UserController;
