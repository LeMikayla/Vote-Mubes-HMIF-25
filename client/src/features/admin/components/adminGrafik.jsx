import ResultCard from "../../results/components/resultCard";
import { useLiveResult } from "../../results/hooks/useLiveResult";
import Loader from "../../../shared/components/loader";

export default function AdminGrafik() {
  const { results, stats, loading, isConnected } = useLiveResult();

  // Helper Format Data (Tetap dibutuhkan untuk UI)
  const formatChartData = (rawData) => {
    if (!rawData) return [];
    return rawData.map((item) => ({
      name: item.name,
      value: parseInt(item.total_votes, 10),
      xLabel: parseInt(item.total_votes, 10),
      avatar: item.image_url || `https://ui-avatars.com/api/?name=${item.name}`,
    }));
  };

  const chartData = formatChartData(results);

  // Jika loading awal, tampilkan loader (Opsional, atau biarkan render kosong dulu)
  if (loading) return <Loader />;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-125">
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

      {/* Render Grafik */}
      <div className="flex justify-center items-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <ResultCard chartData={chartData} />
      </div>
    </div>
  );
}
