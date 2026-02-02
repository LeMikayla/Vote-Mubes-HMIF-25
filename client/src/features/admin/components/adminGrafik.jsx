import React, { useEffect, useState } from "react";
import ResultCard from "../../voting/components/ResultCard"; // Gunakan komponen grafik yang sudah ada
import { voteService } from "../../voting/services/voteService";
import { socket } from "../../../lib/socket"; // Import socket client

export default function AdminGrafik() {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({ totalVotes: 0, totalDPT: 0 });
  const [isConnected, setIsConnected] = useState(false);

  // Helper Format Data (Sama kayak di ResultPage)
  const formatChartData = (rawData) => {
    return rawData.map((item) => ({
      name: item.name,
      value: parseInt(item.total_votes, 10),
      xLabel: parseInt(item.total_votes, 10),
      avatar: item.image_url || `https://ui-avatars.com/api/?name=${item.name}`,
    }));
  };

  // 1. Fetch Data Awal (HTTP)
  const fetchInitialData = async () => {
    try {
      const [resultsRes, statsRes] = await Promise.all([
        voteService.getResults(),
        voteService.getStatistics(),
      ]);

      setChartData(formatChartData(resultsRes.data));

      if (statsRes.data) {
        setStats({
          totalVotes: parseInt(statsRes.data.total_suara_masuk, 10),
          totalDPT: parseInt(statsRes.data.total_daftar_pemilih_tetap, 10),
        });
      }
    } catch (error) {
      console.error("Gagal load data awal:", error);
    }
  };

  useEffect(() => {
    // Load data HTTP biasa dulu
    fetchInitialData();

    // 2. Setup Socket
    socket.connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    // 🔥 3. DENGARKAN EVENT DARI BACKEND
    const onVoteUpdate = (data) => {
      console.log("⚡ Update Real-time diterima!", data);

      // Update State langsung tanpa refresh halaman
      if (data.results) {
        setChartData(formatChartData(data.results));
      }
      if (data.statistics) {
        setStats({
          totalVotes: parseInt(data.statistics.total_suara_masuk, 10),
          totalDPT: parseInt(data.statistics.total_daftar_pemilih_tetap, 10),
        });
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("vote_update", onVoteUpdate); // Nama event harus sama dgn Controller

    // Cleanup
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("vote_update", onVoteUpdate);
      socket.disconnect();
    };
  }, []);

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
