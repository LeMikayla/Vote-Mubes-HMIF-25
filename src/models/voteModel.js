const pool = require('../config/database')
// const logger = require('../config/logger');  Nyalakan jika sudah ada setup logger

class VoteModel {

  // Submit Vote
  static async createVote(voterId, candidateId) {
    const client = await pool.connect(); 

    try {
      await client.query('BEGIN'); 

      // Cek apakah user sudah voting 
      const checkVoter = await client.query(
        'SELECT has_voted FROM voters WHERE id = $1 FOR UPDATE',
        [voterId]
      );

      if (checkVoter.rows.length === 0) {
        throw new Error('Voter tidak ditemukan');
      }

      if (checkVoter.rows[0].has_voted) {
        throw new Error('Anda sudah menggunakan hak suara (Double Vote Detected)');
      }

      // Masukkan Suara 
      await client.query(
        'INSERT INTO votes (candidate_id) VALUES ($1)',
        [candidateId]
      );

      // Update status 
      await client.query(
        'UPDATE voters SET has_voted = TRUE, voted_at = NOW() WHERE id = $1',
        [voterId]
      );

      await client.query('COMMIT'); 

     
      return { success: true };

    } catch (error) {
      await client.query('ROLLBACK'); // Batalkan semua jika ada error
      
      throw error;
    } finally {
      client.release(); 
    }
  }

  // Cek status vting user
  static async checkVoteStatus(voterId) {
    try {
      const query = 'SELECT has_voted, voted_at FROM voters WHERE id = $1';
      const result = await pool.query(query, [voterId]);
      return result.rows[0];
    } catch (error) {
    
      throw error;
    }
  }

  // Get Hasil
  static async getResults() {
    try {
      const query = `
        SELECT 
          c.id,
          c.name,
          c.vision,
          COUNT(v.id) as total_votes,
          ROUND(
            COUNT(v.id) * 100.0 / NULLIF((SELECT COUNT(*) FROM votes), 0), 
            2
          ) as percentage
        FROM candidates c
        LEFT JOIN votes v ON c.id = v.candidate_id
        GROUP BY c.id, c.name, c.vision
        ORDER BY total_votes DESC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      // logger.error('Error getting results:', error);
      throw error;
    }
  }

  // Get Statisti
  static async getStatistics() {
    try {
     
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM votes) as total_suara_masuk,
          (SELECT COUNT(*) FROM voters WHERE has_voted = TRUE) as total_pemilih_berpartisipasi,
          (SELECT COUNT(*) FROM voters) as total_daftar_pemilih_tetap
        `;
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      
      throw error;
    }
  }
}

module.exports = VoteModel;