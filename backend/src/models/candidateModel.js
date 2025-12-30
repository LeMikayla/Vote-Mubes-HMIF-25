const db = require('../config/database');
const logger = require('../config/logger');

class CandidateModel {
  // Get semua kandidat
  static async getAll() {
    try {
      const query = 'SELECT id, name, class, vision FROM candidates ORDER BY id';
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      logger.error('Error getting candidates:', error);
      throw error;
    }
  }

  // Get kandidat by ID
  static async getById(id) {
    try {
      const query = 'SELECT id, name, class, vision FROM candidates WHERE id = $1';
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      logger.error('Error getting candidate:', error);
      throw error;
    }
  }

  // Tambah kandidat (atmin only lok ya)
  static async create(name, classRoom, vision) {
    try {
      const query = `
        INSERT INTO candidates (name, class, vision) 
        VALUES ($1, $2, $3) 
        RETURNING id, name, class, vision
      `;
      const values = [name, classRoom, vision];
      
      const result = await db.query(query, values);
      logger.info(`Candidate created: ${name}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating candidate:', error);
      throw error;
    }
  }
}

module.exports = CandidateModel;