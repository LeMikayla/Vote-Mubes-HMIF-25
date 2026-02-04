import ResultCard from "../../results/components/resultCard";
import { useLiveResult } from "../../results/hooks/useLiveResult";
import Loader from "../../../shared/components/loader";

export default function AdminGrafik() {
  const { results, stats, loading, isConnected } = useLiveResult();

  // Helper Format Data
  const formatChartData = (rawData) => {
    if (!rawData || rawData.length === 0) return [];
    return rawData.map((item) => ({
      name: item.name,
      value: parseInt(item.total_votes, 10) || 0,
      xLabel: parseInt(item.total_votes, 10) || 0,
      // ✅ Langsung pakai env variable
      avatar: item.image_url
        ? `${import.meta.env.VITE_STATIC_BASE_URL}${item.image_url}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`,
    }));
  };

  const chartData = formatChartData(results);

  if (loading) return <Loader />;

  return (
    <div
      className=" p-6 rounded-xl shadow-sm border border-gray-100 min-h-125"
      style={{
        background:
          "linear-gradient(135deg, #F0DEC1 0%, #F6E7D4 19%, #FAE1C8 63%, #F0CEB0 100%)",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Live Count Real-time
          </h2>
          <p className="text-sm text-gray-500">
            Status Koneksi:{" "}
            {isConnected ? (
              <span className="text-green-600 font-bold">● Live</span>
            ) : (
              <span className="text-red-500">● Disconnected</span>
            )}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#9D1016]">
            {stats.totalVotes} / {stats.totalDPT}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">
            Suara Masuk
          </div>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex justify-center items-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-500">Belum ada data kandidat atau suara.</p>
        </div>
      ) : (
        <div
          className="flex justify-center items-center py-10 bg-gray-50 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, #F0DEC1 0%, #F6E7D4 19%, #FAE1C8 63%, #F0CEB0 100%)",
          }}
        >
          <ResultCard chartData={chartData} />
        </div>
      )}
    </div>
  );
}
