const UserModel = require("../models/userModel");
const VoteModel = require("../models/voteModel");

class VoteController {
  // 1. Submit Vote
  static async submitVote(req, res) {
    // Ambil data dari Body (dikirim oleh Frontend)
    const userId = req.user.id;
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({
        success: false,
        message: "Kandidat harus dipilih!",
      });
    }

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      if (user.has_voted) {
        return res
          .status(400)
          .json({ message: "Anda sudah menggunakan hak suara." });
      }

      await VoteModel.createVote(userId, candidateId);
      await UserModel.markAsVoted(userId);

      const updatedResults = await VoteModel.getResults();
      const updatedStats = await VoteModel.getStatistics();

      req.io.emit("vote_update", {
        results: updatedResults,
        statistics: updatedStats,
      });

      return res.status(200).json({
        success: true,
        message: "Suara berhasil direkam",
      });
    } catch (error) {
      console.error("Vote Error:", error);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat menyimpan suara." });
    }
  }

  // 2. Cek status voting
  static async checkVoteStatus(req, res) {
    // Ambil ID dari URL
    const { id } = req.params;

    try {
      const data = await VoteModel.checkVoteStatus(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          hasVoted: data.has_voted,
          votedAt: data.voted_at, // Bisa null jika belum milih
        },
      });
    } catch (error) {
      console.error("Error checking status:", error);
      return res.status(500).json({
        success: false,
        message: "Gagal mengecek status pemilih",
      });
    }
  }

  // 3. Get Hasil Voting (Quick Count)
  static async getResults(req, res) {
    try {
      const results = await VoteModel.getResults();

      return res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.error("Error fetching results:", error);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data hasil voting",
      });
    }
  }

  // 4. Get Statistik
  static async getStatistics(req, res) {
    try {
      const stats = await VoteModel.getStatistics();

      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data statistik",
      });
    }
  }

  // 5. Get Candidates (Khusus List Kandidat)
  static async getCandidates(req, res) {
    try {
      const results = await VoteModel.getResults();

      // ingfo kandidat
      const candidatesOnly = results.map((item) => ({
        id: item.id,
        name: item.name,
        number: item.number,
        vision: item.vision,
      }));

      return res.status(200).json({
        success: true,
        data: candidatesOnly,
      });
    } catch (error) {
      return res.status(500).json({ message: "Gagal mengambil data kandidat" });
    }
  }

  static async resetElection(req, res) {
    try {
      await VoteModel.resetElection();
      
      // OPTIONAL: Kirim sinyal ke socket biar grafik real-time langsung jadi 0
      if (req.io) {
        req.io.emit("vote_update", {
          results: [], // Grafik kosong
          statistics: { total_suara_masuk: 0, total_daftar_pemilih_tetap: 0 } // Statistik 0
        });
      }

      res.json({ 
        success: true, 
        message: "Pemilihan berhasil di-reset! Semua suara telah dihapus dan pemilih dapat memilih kembali." 
      });

    } catch (error) {
      console.error("Reset Error:", error);
      res.status(500).json({ message: "Gagal me-reset pemilihan." });
    }
  }
}

module.exports = VoteController;
