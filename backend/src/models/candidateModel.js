const db = require("../config/database");

class CandidateModel {
  // Get semua kandidat
  static async getAll() {
    try {
      // 🔥 Update Select Query
      const query =
        "SELECT id, npm, name, vision, mission, image_url FROM candidates ORDER BY id";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      // logger.error('Error getting candidates:', error);
      throw error;
    }
  }

  // Get kandidat by ID
  static async getById(id) {
    try {
      // 🔥 Update Select Query
      const query =
        "SELECT id, npm, name, vision, mission, image_url FROM candidates WHERE id = $1";
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Tambah kandidat
  static async create(npm, name, vision, mission, image_url) {
    try {
      // 🔥 Update Insert Query
      const query = `
        INSERT INTO candidates (npm, name, vision, mission, image_url) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
      `;
      const values = [npm, name, vision, mission, image_url];

      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CandidateModel;
