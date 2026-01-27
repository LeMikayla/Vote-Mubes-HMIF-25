const VoteModel = require('../models/voteModel');

class VoteController {

  // 1. Submit Vote
  static async submitVote(req, res) {
    // Ambil data dari Body (dikirim oleh Frontend)
    const { userId, candidateId } = req.body;

    // A. Validasi Input Dasar
    if (!userId || !candidateId) {
      return res.status(400).json({
        success: false,
        message: 'Data tidak lengkap! User ID dan Candidate ID diperlukan.'
      });
    }

    try {
      // B. Panggil Model
      await VoteModel.createVote(userId, candidateId);

      // C. Sukses
      return res.status(201).json({
        success: true,
        message: 'Suara Anda berhasil direkam!'
      });

    } catch (error) {
      // D. Error Handling Khusus (Menerjemahkan Error Model ke HTTP Code)

      // Kasus 1: User sudah pernah milih
      if (error.message.includes('Double Vote')) {
        return res.status(403).json({ // 403 = Forbidden
          success: false,
          message: 'Anda sudah menggunakan hak suara sebelumnya.'
        });
      }

      // Kasus 2: User ID ga ada di database
      if (error.message.includes('tidak ditemukan')) {
        return res.status(404).json({ // 404 = Not Found
          success: false,
          message: 'Data pemilih tidak valid.'
        });
      }

      // Kasus 3: Error Server Lainnya (Database mati, syntax error, dll)
      console.error('Error submitting vote:', error);
      return res.status(500).json({ // 500 = Internal Server Error
        success: false,
        message: 'Terjadi kesalahan pada server saat menyimpan suara.'
      });
    }
  }

  // 2. Cek Status (Apakah user ini sudah milih?)
  static async checkVoteStatus(req, res) {
    // Ambil ID dari URL (misal: /api/votes/check/1)
    const { id } = req.params;

    try {
      const data = await VoteModel.checkVoteStatus(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'User tidak ditemukan'
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          hasVoted: data.has_voted,
          votedAt: data.voted_at // Bisa null jika belum milih
        }
      });

    } catch (error) {
      console.error('Error checking status:', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengecek status pemilih'
      });
    }
  }

  // 3. Get Hasil Voting (Quick Count)
  static async getResults(req, res) {
    try {
      const results = await VoteModel.getResults();

      return res.status(200).json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error('Error fetching results:', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data hasil voting'
      });
    }
  }

  // 4. Get Statistik
  static async getStatistics(req, res) {
    try {
      const stats = await VoteModel.getStatistics();

      return res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data statistik'
      });
    }
  }

  // 5. Get Candidates (Khusus List Kandidat)
  // *Catatan: Di routes kamu ada 'getCandidates', tapi di Model BELUM ADA.
  // Kita bisa pakai 'getResults' tapi kita buang data jumlah suaranya (biar rahasia sebelum selesai)
  static async getCandidates(req, res) {
    try {
      const results = await VoteModel.getResults();

      // Mapping: Kita cuma ambil info kandidat, HAPUS jumlah suaranya agar tidak bocor ke publik
      const candidatesOnly = results.map(item => ({
        id: item.id,
        name: item.name,
        vision: item.vision,
        // total_votes: item.total_votes // <-- JANGAN dikirim kalau mau rahasia
      }));

      return res.status(200).json({
        success: true,
        data: candidatesOnly
      });
    } catch (error) {
      return res.status(500).json({ message: 'Gagal mengambil data kandidat' });
    }
  }

}

module.exports = VoteController;