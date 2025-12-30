const db = require('../config/database');
const logger = require('../config/logger');

class VoteModel {
  // Submit vote baru
  static async createVote(nis, candidateId, ipAddress = null) {
    try {
      const query = `
        INSERT INTO votes (nis, candidate_id, ip_address) 
        VALUES ($1, $2, $3) 
        RETURNING id, nis, candidate_id, voted_at
      `;
      const values = [nis, candidateId, ipAddress];
      
      const result = await db.query(query, values);
      logger.info(`Vote created: NIS=${nis}, Candidate=${candidateId}`);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('NIS sudah melakukan voting');
      }
      logger.error('Error creating vote:', error);
      throw error;
    }
  }

  // Cek apakah NIM sudah voting
  static async checkVote(nis) {
    try {
      const query = 'SELECT id, candidate_id, voted_at FROM votes WHERE nis = $1';
      const result = await db.query(query, [nis]);
      return result.rows[0];
    } catch (error) {
      logger.error('Error checking vote:', error);
      throw error;
    }
  }

  // Get hasil voting
  static async getResults() {
    try {
      const query = `
        SELECT 
          c.id,
          c.name,
          c.class,
          c.vision,
          COUNT(v.id) as total_votes,
          ROUND(
            COUNT(v.id) * 100.0 / NULLIF((SELECT COUNT(*) FROM votes), 0), 
            2
          ) as percentage
        FROM candidates c
        LEFT JOIN votes v ON c.id = v.candidate_id
        GROUP BY c.id, c.name, c.class, c.vision
        ORDER BY total_votes DESC, c.name
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      logger.error('Error getting results:', error);
      throw error;
    }
  }

  // Get statistik voting
  static async getStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total_votes,
          COUNT(DISTINCT nis) as unique_voters,
          MIN(voted_at) as first_vote,
          MAX(voted_at) as last_vote,
          COUNT(DISTINCT candidate_id) as candidates_voted
        FROM votes
      `;
      const result = await db.query(query);
      return result.rows[0];
    } catch (error) {
      logger.error('Error getting stats:', error);
      throw error;
    }
  }

  // Reset votes (hanya untuk testing/atmin lok ya)
  static async resetVotes() {
    try {
      await db.query('TRUNCATE votes RESTART IDENTITY');
      logger.warn('All votes have been reset');
      return { message: 'Votes reset successfully' };
    } catch (error) {
      logger.error('Error resetting votes:', error);
      throw error;
    }
  }
}

module.exports = VoteModel;