"use client";
import { useState, useEffect } from "react";
import { electionService } from "../../voting/services/electionService";
import { voteService } from "../../voting/services/voteService";
import { Calendar, Save, Clock } from "lucide-react";
import Loader from "../../../shared/components/loader.jsx";
import { toast } from "sonner";

export default function ElectionSetting() {
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await electionService.getConfig();

        // Format Tanggal untuk Input HTML (YYYY-MM-DDTHH:mm)
        if (config.endDate) {
          const date = new Date(config.endDate);
          // Mengatasi perbedaan zona waktu (timezone offset) agar pas di input
          date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
          const formatted = date.toISOString().slice(0, 16);
          setDeadline(formatted);
        }

        if (config.status) setStatus(config.status);
      } catch (error) {
        console.error("Gagal load config:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    loadConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Kembalikan ke format ISO string (UTC) untuk Backend
      const isoDate = new Date(deadline).toISOString();

      await electionService.updateConfig({
        endDate: isoDate,
        status: status,
      });

      toast.success("Jadwal berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal update jadwal.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    // 1. Konfirmasi Awal (Biar gak kepencet)
    const isConfirmed = window.confirm(
      "⚠️ PERINGATAN KERAS!\n\nApakah Anda yakin ingin MENGHAPUS SEMUA SUARA dan MEMULAI ULANG pemilihan dari nol?\n\nTindakan ini tidak bisa dibatalkan!",
    );
    if (!isConfirmed) return;

    // 2. Konfirmasi Ganda (Safety Prompt)
    // Admin harus mengetik kata 'RESET' secara manual agar sadar
    const safetyCheck = window.prompt(
      "Ketik 'RESET' (huruf besar) untuk konfirmasi penghapusan database suara:",
    );

    if (safetyCheck !== "RESET") {
      return toast.error("Konfirmasi salah. Pembatalan dilakukan.");
    }

    // 3. Eksekusi ke Backend
    setLoading(true);
    try {
      await voteService.resetElection();

      toast.success("BERHASIL! Kotak suara telah dikosongkan.");

      // Opsional: Reload halaman biar fresh datanya
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Gagal melakukan reset.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <Clock className="w-5 h-5 text-[#9D1016]" />
        <h2 className="text-lg font-bold text-gray-800">Pengaturan Waktu</h2>
      </div>

      <div className="space-y-4">
        {/* Input Tanggal & Jam */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batas Akhir Voting (Deadline)
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9D1016] focus:border-transparent outline-none transition-all"
            />
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Countdown di halaman user akan otomatis mengikuti jam ini.
          </p>
        </div>

        {/* Status Pemilihan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status Sistem
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9D1016] outline-none"
          >
            <option value="active">🟢 Aktif (Bisa Vote)</option>
            <option value="closed">🔴 Ditutup (Tidak Bisa Vote)</option>
          </select>
        </div>

        {/* Tombol Simpan */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 mt-4 bg-[#9D1016] text-white py-2.5 px-4 rounded-lg hover:bg-[#7a0c11] disabled:opacity-70 disabled:cursor-not-allowed transition-colors font-medium shadow-md active:scale-[0.98]"
        >
          {loading ? (
            "Menyimpan..."
          ) : (
            <>
              <Save className="w-4 h-4" /> Simpan Perubahan
            </>
          )}
        </button>
      </div>
      {/* 🔥 ZONA BAHAYA (RESET) */}
      <div className="p-5 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Ikon Peringatan */}
          <div className="p-3 bg-red-100 rounded-full shrink-0 text-2xl">
            ☠️
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-red-800 text-lg">
              Zona Bahaya (Danger Zone)
            </h3>
            <p className="text-sm text-red-700 mt-1 mb-4 leading-relaxed">
              Tombol di bawah ini akan <b>menghapus seluruh data suara</b> yang
              sudah masuk ke database (`TRUNCATE votes`) dan mengembalikan
              status semua pemilih menjadi "Belum Memilih".
              <br />
              <br />
              Gunakan fitur ini hanya jika terjadi kesalahan fatal saat uji coba
              atau ingin memulai ulang pemilihan.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>🗑️</span> RESET SEMUA SUARA & DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
