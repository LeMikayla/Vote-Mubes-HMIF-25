require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

const runCleanup = async () => {
  // console.log("🕵️  Mulai investigasi folder uploads...");

  try {
    // KITA CEK DUA KEMUNGKINAN LOKASI FOLDER
    const possiblePaths = [
      path.join(__dirname, "../uploads"), // Kemungkinan 1: src/uploads
      path.join(__dirname, "../../uploads"), // Kemungkinan 2: backend/uploads (Root)
    ];

    // Ambil daftar file valid dari Database
    const { rows } = await pool.query(
      "SELECT image_url FROM candidates WHERE image_url IS NOT NULL",
    );

    // Ambil nama file bersih dari DB
    const validFiles = rows.map((row) => {
      if (!row.image_url) return "";
      return row.image_url.split("/").pop(); // Ambil "foto.png" dari "/uploads/foto.png"
    });

    let totalDeleted = 0;

    // LOOPING KE SETIAP FOLDER YANG MUNGKIN ADA
    possiblePaths.forEach((directory) => {
      if (fs.existsSync(directory)) {
        // console.log(`📂 Memeriksa folder: ${directory}`);
        const filesOnDisk = fs.readdirSync(directory);

        filesOnDisk.forEach((file) => {
          // Jangan hapus file sistem
          if (file === ".gitkeep" || file === ".DS_Store") return;

          // Jika file di folder TIDAK ADA di database -> HAPUS
          if (!validFiles.includes(file)) {
            const filePath = path.join(directory, file);
            try {
              fs.unlinkSync(filePath);
              console.log(
                `🗑️ SAMPAH DITEMUKAN & DIHAPUS: ${file} (di ${directory})`,
              );
              totalDeleted++;
            } catch (err) {
              console.error(`⚠️ Gagal hapus ${file}:`, err.message);
            }
          }
        });
      }
    });

    if (totalDeleted > 0) {
      console.log(
        `✅ BERHASIL! Total ${totalDeleted} file sampah dimusnahkan.`,
      );
    }
    // else { console.log("✨ Bersih. Tidak ada sampah ditemukan."); }
  } catch (error) {
    console.error("❌ Error Cleanup:", error.message);
  }
};

module.exports = runCleanup;
