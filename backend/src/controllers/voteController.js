const VoteModel = require('../models/voteModel');
const CandidateModel = require('../models/candidateModel');
const logger = require('../config/logger');

class VoteController {
  // Submit vote
  static async submitVote(req, res) {
    try {
      const { nis, candidateId } = req.body;
      const ipAddress = req.ip;

      // Validasi input
      if (!nis || !candidateId) {
        return res.status(400).json({
          success: false,
          error: 'NIM dan ID kandidat harus diisi'
        });
      }

      // Validasi format NIM (minimal 5 digit)
      if (!/^\d{5,}$/.test(nis)) {
        return res.status(400).json({
          success: false,
          error: 'Format NIM tidak valid (minimal 5 digit angka)'
        });
      }

      // Cek apakah kandidat valid
      const candidate = await CandidateModel.getById(candidateId);
      if (!candidate) {
        return res.status(400).json({
          success: false,
          error: 'Kandidat tidak ditemukan'
        });
      }

      // Submit vote
      const vote = await VoteModel.createVote(nis, candidateId, ipAddress);
      
      logger.info(`Vote submitted successfully: NIM=${nis}`);
      
      return res.status(201).json({
        success: true,
        message: 'Vote berhasil disimpan!',
        data: {
          voteId: vote.id,
          nis: vote.nis,
          candidateId: vote.candidate_id,
          votedAt: vote.voted_at
        }
      });
      
    } catch (error) {
      logger.error('Submit vote error:', error);
      
      if (error.message === 'NIM ini sudah melakukan voting') {
        return res.status(409).json({
          success: false,
          error: 'NIM ini sudah melakukan voting sebelumnya'
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server. Silakan coba lagi.'
      });
    }
  }

  // Get hasil voting
  static async getResults(req, res) {
    try {
      const results = await VoteModel.getResults();
      const stats = await VoteModel.getStats();
      
      return res.json({
        success: true,
        data: {
          results,
          statistics: stats
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Get results error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil hasil voting'
      });
    }
  }

  // Get statistik
  static async getStatistics(req, res) {
    try {
      const stats = await VoteModel.getStats();
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error('Get statistics error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil statistik'
      });
    }
  }

  // Check vote status by NIS
  static async checkVoteStatus(req, res) {
    try {
      const { nis } = req.params;
      
      if (!nis) {
        return res.status(400).json({
          success: false,
          error: 'NIM harus disertakan'
        });
      }

      const vote = await VoteModel.checkVote(nis);
      
      return res.json({
        success: true,
        data: {
          hasVoted: !!vote,
          voteDetails: vote || null
        }
      });
    } catch (error) {
      logger.error('Check vote status error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal memeriksa status voting'
      });
    }
  }

  // Get semua kandidat
  static async getCandidates(req, res) {
    try {
      const candidates = await CandidateModel.getAll();
      return res.json({
        success: true,
        data: candidates
      });
    } catch (error) {
      logger.error('Get candidates error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil data kandidat'
      });
    }
  }
}

module.exports = VoteController;