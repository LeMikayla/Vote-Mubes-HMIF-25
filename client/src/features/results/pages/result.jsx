"use client";
import { useState, useEffect } from "react";
// Services
import { electionService } from "../services/electionService";
import { voteService } from "../services/voteService"; // Import service yang baru diupdate
import { useCountdown } from "../../../shared/hooks/useCountdown";

// Components
import ResultCard from "../components/resultCard";
import ResultHeader from "../components/resultHeader";
import InfoBar from "../components/infobar";
import ActionBar from "../components/actionBar";
import Loader from "../../../shared/components/loader"; // Opsional: Pakai loader

function Result() {
  // --- STATE ---
  const [deadline, setDeadline] = useState(null);
  const [chartData, setChartData] = useState([]); // Data untuk Grafik
  const [stats, setStats] = useState({ total: 0, participated: 0 }); // Data Statistik
  const [loading, setLoading] = useState(true);

  const timeLeftObj = useCountdown(deadline);

  // --- FETCH DATA ---
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Panggil 3 API Sekaligus: Config, Hasil Vote, Statistik
      const [configRes, resultsRes, statsRes] = await Promise.all([
        electionService.getConfig(),
        voteService.getResults(),
        voteService.getStatistics(),
      ]);

      // 1. Set Config Deadline
      if (configRes.endDate) setDeadline(configRes.endDate);

      // 2. Set Data Grafik
      // Kita perlu mapping data dari Backend supaya cocok dengan format Chart UI
      // Backend: { name, total_votes, percentage, image_url }
      // Frontend Chart butuh: { name, value, xLabel, avatar }
      const formattedChartData = resultsRes.data.map((item) => ({
        name: item.name,
        value: parseInt(item.total_votes), // Tinggi pilar
        xLabel: parseInt(item.total_votes), // Angka di bawah pilar
        avatar:
          item.image_url || `https://ui-avatars.com/api/?name=${item.name}`, // Fallback avatar jika null
      }));
      setChartData(formattedChartData);

      // 3. Set Statistik
      if (statsRes.data) {
        setStats({
          participated: parseInt(statsRes.data.total_pemilih_berpartisipasi),
          total: parseInt(statsRes.data.total_daftar_pemilih_tetap),
        });
      }
    } catch (error) {
      console.error("Gagal memuat hasil voting:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load saat pertama kali buka
  useEffect(() => {
    fetchAllData();
  }, []);

  // --- LOGIC LAIN ---
  const formatTimeText = () => {
    if (!timeLeftObj) return "DITUTUP";
    const { hours, minutes, seconds } = timeLeftObj;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleRefresh = () => {
    fetchAllData(); // Panggil ulang API saat tombol refresh ditekan
  };

  if (loading) return <Loader />;

  return (
    <>
      <main className="flex-1 flex flex-col items-center w-full">
        {/* 1. Header */}
        <ResultHeader
          timeLeftText={formatTimeText()}
          onRefresh={handleRefresh}
        />

        {/* 2. Grafik (Kirim Data Real) */}
        <div className="flex justify-center w-full my-6 animate-zoom-in">
          <ResultCard chartData={chartData} />
        </div>

        {/* 3. Info Bar (Kirim Statistik Real) */}
        <InfoBar
          totalVotes={stats.participated}
          maxVotes={stats.total}
          lastUpdated={new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

        {/* 4. Action Bar */}
        <ActionBar
          onShare={() => alert("Fitur Share segera hadir!")}
          onDownload={() => alert("Fitur Unduh segera hadir!")}
        />
      </main>

      <footer className="text-center text-[10px] text-gray-500 font-serif tracking-wider uppercase opacity-60 pb-2">
        © HMIF 2025 - Semua Hak Dilindungi
      </footer>
    </>
  );
}

export default Result;
