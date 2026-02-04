const pool = require("../config/database");

class CandidateController {
  static async getAllCandidates(req, res) {
    try {
      const result = await pool.query(
        "SELECT id, npm, name, number, vision, mission, image_url FROM candidates ORDER BY id ASC",
      );

      res.status(200).json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data kandidat",
      });
    }
  }

  // 1. Tambah Kandidat (Create)
  static async addCandidate(req, res) {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    // 🔥 Ambil 'npm' dari body request
    const { npm, name, number, vision, mission } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      // Validasi sederhana
      if (!npm || !name) {
        return res
          .status(400)
          .json({ success: false, message: "NPM dan Nama wajib diisi!" });
      }

      const result = await pool.query(
        // 🔥 Tambahkan kolom npm di query INSERT
        "INSERT INTO candidates (npm, name, number, vision, mission, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [npm, name, number, vision, mission, image_url],
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
        message: "Kandidat berhasil ditambahkan",
      });
    } catch (error) {
      // Handle error jika NPM sudah terdaftar (Unique Constraint)
      if (error.code === "23505") {
        return res
          .status(400)
          .json({ success: false, message: "NPM kandidat sudah terdaftar!" });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateCandidate(req, res) {
    const { id } = req.params;
    const { npm, name, number, vision, mission } = req.body;

    try {
      // ✅ FIX: Get current candidate to keep old image if no new upload
      const current = await pool.query(
        "SELECT image_url FROM candidates WHERE id = $1",
        [id],
      );

      if (current.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Kandidat tidak ditemukan",
        });
      }

      // Use new uploaded file if exists, otherwise keep old image
      const image_url = req.file
        ? `/uploads/${req.file.filename}`
        : current.rows[0].image_url;

      await pool.query(
        "UPDATE candidates SET npm=$1, name=$2, number=$3, vision=$4, mission=$5, image_url=$6 WHERE id=$7",
        [npm, name, number, vision, mission, image_url, id],
      );

      res.json({
        success: true,
        message: "Data kandidat berhasil diupdate",
      });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({
          success: false,
          message: "NPM sudah digunakan kandidat lain!",
        });
      }
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // 3. Hapus Kandidat (Delete)
  static async deleteCandidate(req, res) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM candidates WHERE id = $1", [id]);
      res.json({ success: true, message: "Kandidat berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = CandidateController;
