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
        SELECT id, username, email, role, has_voted, voted_at 
        FROM voters 
        ORDER BY id ASC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async markAsVoted(id) {
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

  static async deleteAllVoters() {
    const query = "DELETE FROM voters WHERE role != 'admin'";
    await pool.query(query);
    return true;
  }

  // Menerima array: [{username, email, password}, ...]
  static async bulkCreate(users) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN"); // Mulai Transaksi

      for (const user of users) {
        // 1. Cek apakah username sudah ada? (Opsional, karena di DB biasanya sudah UNIQUE)
        // Kita gunakan "ON CONFLICT DO NOTHING" biar kalau ada yg kembar, dia skip aja dan gak error.

        const query = `
          INSERT INTO voters (username, email, password, role) 
          VALUES ($1, $2, $3, 'user')
          ON CONFLICT (username) DO NOTHING
        `;

        // Pastikan password masuk (default 12345 jika kosong di excel)
        const password = user.password || "12345";

        await client.query(query, [user.username, user.email, password]);
      }

      await client.query("COMMIT"); // Simpan Permanen
      return true;
    } catch (error) {
      await client.query("ROLLBACK"); // Batalkan jika ada error fatal
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = UserModel;
