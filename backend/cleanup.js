// 1. TAMBAHKAN INI DI PALING ATAS
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const pool = require("./src/config/database");

const directory = path.join(__dirname, "uploads");

const cleanupImages = async () => {
  console.log("🔄 Memulai pembersihan file sampah...");

  try {
    // 2. Ambil semua nama file yang ada di folder 'uploads'
    const filesOnDisk = fs.readdirSync(directory);

    // 3. Ambil semua data 'image_url' yang tercatat di Database
    const { rows } = await pool.query(
      "SELECT image_url FROM candidates WHERE image_url IS NOT NULL",
    );

    // Ambil nama filenya saja (buang '/uploads/')
    const validFiles = rows.map((row) => row.image_url.split("/").pop());

    let deletedCount = 0;

    // 4. Bandingkan!
    filesOnDisk.forEach((file) => {
      // Abaikan file .gitkeep atau file sistem lain jika ada
      if (file === ".gitkeep") return;

      // Jika file di folder TIDAK ADA di daftar database
      if (!validFiles.includes(file)) {
        const filePath = path.join(directory, file);

        // Hapus file tersebut
        try {
          fs.unlinkSync(filePath);
          console.log(`🗑️ Menghapus file sampah: ${file}`);
          deletedCount++;
        } catch (err) {
          console.error(`⚠️ Gagal menghapus ${file}: ${err.message}`);
        }
      }
    });

    console.log(`✅ Selesai! Total ${deletedCount} file sampah telah dihapus.`);
    process.exit();
  } catch (error) {
    console.error("❌ Terjadi kesalahan:", error.message);
    process.exit(1);
  }
};

cleanupImages();
