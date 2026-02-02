const db = require("../config/database");

class ConfigModel {
  static async getConfig() {
    try {
      // Kita ambil baris pertama (ID 1)
      const query = "SELECT * FROM election_settings WHERE id = 1";
      const result = await db.query(query);

      // Jika kosong (belum di-seed), return object default
      if (result.rows.length === 0) {
        return {
          eventName: "Pemilihan Default",
          endDate: new Date().toISOString(),
          status: "closed",
        };
      }

      // Mapping dari database (snake_case) ke frontend (camelCase)
      const row = result.rows[0];
      return {
        eventName: row.event_name,
        endDate: row.end_date, // Frontend butuh ini untuk Countdown
        status: row.status,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateConfig(data) {
    const { eventName, endDate, status } = data;

    // COALESCE artinya: kalau input null/kosong, pakai data lama yang ada di DB
    const query = `
      UPDATE election_settings
      SET 
        event_name = COALESCE($1, event_name),
        end_date   = COALESCE($2, end_date),
        status     = COALESCE($3, status),
        updated_at = NOW()
      WHERE id = 1
      RETURNING *
    `;

    try {
      const result = await db.query(query, [eventName, endDate, status]);
      const row = result.rows[0];
      return {
        eventName: row.event_name,
        endDate: row.end_date,
        status: row.status,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConfigModel;
