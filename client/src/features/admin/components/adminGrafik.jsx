import ResultCard from "../../results/components/resultCard";
import { useLiveResult } from "../../results/hooks/useLiveResult";
import Loader from "../../../shared/components/loader";

export default function AdminGrafik() {
  const { results, stats, loading, isConnected } = useLiveResult();

  const formatChartData = (rawData) => {
    if (!rawData || rawData.length === 0) return [];
    return rawData.map((item) => ({
      name: item.name,
      value: parseInt(item.total_votes, 10) || 0,
      xLabel: parseInt(item.total_votes, 10) || 0,
      avatar: item.image_url
        ? `${import.meta.env.VITE_STATIC_BASE_URL}${item.image_url}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`,
    }));
  };

  const chartData = formatChartData(results);

  if (loading) return <Loader />;

  return (
    // === WRAPPER UTAMA (Agar di tengah layar) ===
    // Kita gunakan flex center untuk menaruh kotak di tengah halaman
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8">
      
      {/* === KOTAK GRAFIK (Yang akan kita buat persegi) === */}
      <div
        // UBAH DI SINI:
        // 1. w-full max-w-4xl: Lebar penuh tapi dibatasi maksimal 4xl (sekitar 896px)
        // 2. aspect-[5/4]: KUNCI UTAMA. Ini membuat rasio lebar:tinggi = 5:4.
        //    - Coba ganti jadi 'aspect-square' untuk kotak sempurna 1:1.
        //    - Coba ganti jadi 'aspect-[4/3]' untuk sedikit lebih tinggi.
        // 3. max-h-[85vh]: Penjaga agar kotak tidak pernah melebihi 85% tinggi layar.
        className="w-full max-w-4xl aspect-[5/4] max-h-[85vh] p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #F0DEC1 0%, #F6E7D4 19%, #FAE1C8 63%, #F0CEB0 100%)",
        }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 shrink-0">
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

        {/* Chart Section */}
        {/* flex-1 memastikan dia mengisi sisa ruang di dalam kotak persegi tadi */}
        <div className="flex-1 w-full min-h-0 bg-white/30 rounded-lg p-4 border border-white/50 relative overflow-hidden shadow-inner">
          {chartData.length === 0 ? (
            <div className="flex h-full w-full justify-center items-center">
              <p className="text-gray-500 font-medium">
                Belum ada data kandidat atau suara.
              </p>
            </div>
          ) : (
            <div className="w-full h-full">
              <ResultCard chartData={chartData} isFullSize={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}