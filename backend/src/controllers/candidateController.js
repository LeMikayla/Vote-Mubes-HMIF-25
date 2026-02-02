const pool = require('../config/database');

class CandidateController {

  // 1. Tambah Kandidat (Create)
  static async addCandidate(req, res) {
    const { name, vision, mission, image_url } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO candidates (name, vision, mission, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, vision, mission, image_url]
      );
      res.status(201).json({ success: true, data: result.rows[0], message: 'Kandidat berhasil ditambahkan' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // 2. Edit Kandidat (Update)
  static async updateCandidate(req, res) {
    const { id } = req.params;
    const { name, vision, mission, image_url } = req.body;

    try {
      await pool.query(
        'UPDATE candidates SET name=$1, vision=$2, mission=$3, image_url=$4 WHERE id=$5',
        [name, vision, mission, image_url, id]
      );
      res.json({ success: true, message: 'Data kandidat berhasil diupdate' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // 3. Hapus Kandidat (Delete)
  static async deleteCandidate(req, res) {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM candidates WHERE id = $1', [id]);
      res.json({ success: true, message: 'Kandidat berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = CandidateController;