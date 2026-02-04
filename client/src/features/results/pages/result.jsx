import { useMemo } from "react";
import { useStaticResult } from "../hooks/useStaticResult";
import { useCountdown } from "../../../shared/hooks/useCountdown";

import ResultCard from "../components/resultCard";
import ResultHeader from "../components/resultHeader";
import InfoBar from "../components/infobar";
import ActionBar from "../components/actionBar";
import Loader from "../../../shared/components/loader";
import { toast } from "sonner";

function Result() {
  const { results, stats, deadline, loading, refetching, refetch } =
    useStaticResult();

  const timeLeftObj = useCountdown(deadline);

  const chartData = useMemo(() => {
    if (!results || results.length === 0) return [];

    return results.map((item) => ({
      name: item.name,
      value: parseInt(item.total_votes || 0),
      xLabel: parseInt(item.total_votes || 0),
      // ✅ Langsung pakai env variable
      avatar: item.image_url
        ? `${import.meta.env.VITE_STATIC_BASE_URL}${item.image_url}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`,
    }));
  }, [results]);

  const formatTimeText = () => {
    if (!timeLeftObj) return "DITUTUP";
    const { hours, minutes, seconds } = timeLeftObj;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (loading) return <Loader />;

  return (
    <>
      <main className="flex-1 flex flex-col items-center w-full">
        <ResultHeader
          timeLeftText={formatTimeText()}
          onRefresh={refetch}
          isRefreshing={refetching}
        />

        <div className="flex justify-center w-full my-6 animate-zoom-in">
          <ResultCard chartData={chartData} />
        </div>

        <InfoBar
          totalVotes={stats.participated}
          maxVotes={stats.total}
          lastUpdated={new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

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
