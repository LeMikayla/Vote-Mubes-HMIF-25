const pool = require("../config/database"); // Sesuaikan path database kamu

class UserModel {
  // Cari user berdasarkan username
  static async findByUsername(username) {
    try {
      const query = "SELECT * FROM voters WHERE username = $1";
      const result = await pool.query(query, [username]);
      return result.rows[0]; // Mengembalikan object user atau undefined
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM voters WHERE id = $1";
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const query = `
        SELECT id, username, role, has_voted, voted_at 
        FROM voters 
        ORDER BY id ASC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async markAsVoted(userId) {
    try {
      const query = `
        UPDATE voters 
        SET has_voted = TRUE, voted_at = NOW() 
        WHERE id = $1
        RETURNING *
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
