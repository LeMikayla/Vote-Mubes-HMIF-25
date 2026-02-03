"use client";
import { useMemo } from "react"; // Tambah useMemo
import { useStaticResult } from "../hooks/useStaticResult";
import { useCountdown } from "../../../shared/hooks/useCountdown";

// Components
import ResultCard from "../components/resultCard";
import ResultHeader from "../components/resultHeader";
import InfoBar from "../components/infobar";
import ActionBar from "../components/actionBar";
import Loader from "../../../shared/components/loader";
import { toast } from "sonner"; // Import toast jika dipakai di action bar

function Result() {
  const { results, stats, deadline, loading, refetching, refetch } =
    useStaticResult();

  // 2. Countdown Logic
  const timeLeftObj = useCountdown(deadline);

  // 3. Format Data untuk Grafik (Gunakan useMemo agar tidak render ulang percuma)
  const chartData = useMemo(() => {
    if (!results || results.length === 0) return [];

    return results.map((item) => ({
      name: item.name,
      value: parseInt(item.total_votes || 0),
      xLabel: parseInt(item.total_votes || 0),
      avatar: item.image_url || `https://ui-avatars.com/api/?name=${item.name}`,
    }));
  }, [results]);

  // 4. Format Waktu Header
  const formatTimeText = () => {
    if (!timeLeftObj) return "DITUTUP";
    const { hours, minutes, seconds } = timeLeftObj;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // --- RENDER ---
  if (loading) return <Loader />;

  return (
    <>
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Header */}
        <ResultHeader
          timeLeftText={formatTimeText()}
          onRefresh={refetch} // 👈 Langsung pakai fungsi refetch dari hook
          isRefreshing={refetching} // Opsional: jika ResultHeader butuh loading state
        />

        {/* Grafik */}
        <div className="flex justify-center w-full my-6 animate-zoom-in">
          <ResultCard chartData={chartData} />
        </div>

        {/* Info Bar */}
        <InfoBar
          totalVotes={stats.participated}
          maxVotes={stats.total}
          lastUpdated={new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

        {/* Action Bar */}
        <ActionBar
          onShare={() => toast.info("Fitur Share akan segera hadir!")}
          onDownload={() => toast.info("Fitur Unduh akan segera hadir!")}
        />
      </main>

      <footer className="text-center text-[10px] text-gray-500 font-serif tracking-wider uppercase opacity-60 pb-2">
        © HMIF 2025 - Semua Hak Dilindungi
      </footer>
    </>
  );
}

export default Result;
