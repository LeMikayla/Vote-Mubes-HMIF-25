const pool = require('../config/database'); // Sesuaikan path database kamu

class UserModel {
  // Cari user berdasarkan username
  static async findByUsername(username) {
    try {
      const query = 'SELECT * FROM voters WHERE username = $1';
      const result = await pool.query(query, [username]);
      return result.rows[0]; // Mengembalikan object user atau undefined
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;