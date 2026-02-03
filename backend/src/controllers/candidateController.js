const pool = require("../config/database");

class CandidateController {
  // 1. Tambah Kandidat (Create)
  static async addCandidate(req, res) {
    // 🔥 Ambil 'npm' dari body request
    const { npm, name, vision, mission, image_url } = req.body;

    try {
      // Validasi sederhana
      if (!npm || !name) {
        return res
          .status(400)
          .json({ success: false, message: "NPM dan Nama wajib diisi!" });
      }

      const result = await pool.query(
        // 🔥 Tambahkan kolom npm di query INSERT
        "INSERT INTO candidates (npm, name, vision, mission, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [npm, name, vision, mission, image_url],
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

  // 2. Edit Kandidat (Update)
  static async updateCandidate(req, res) {
    const { id } = req.params;
    // 🔥 Ambil 'npm' juga untuk diupdate
    const { npm, name, vision, mission, image_url } = req.body;

    try {
      await pool.query(
        // 🔥 Tambahkan npm di query UPDATE
        "UPDATE candidates SET npm=$1, name=$2, vision=$3, mission=$4, image_url=$5 WHERE id=$6",
        [npm, name, vision, mission, image_url, id],
      );
      res.json({ success: true, message: "Data kandidat berhasil diupdate" });
    } catch (error) {
      if (error.code === "23505") {
        return res
          .status(400)
          .json({
            success: false,
            message: "NPM sudah digunakan kandidat lain!",
          });
      }
      res.status(500).json({ success: false, message: error.message });
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
