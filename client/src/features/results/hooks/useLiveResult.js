import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import { resultService } from "../services/resultService"; 
import { voteService } from "../../voting/services/voteService";

export const useLiveResult = () => {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ totalVotes: 0, totalDPT: 0 });
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // 1. Fetch Data Awal (HTTP)
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Ambil Results & Stats bebarengan
      const [resData, statsData] = await Promise.all([
        resultService.getVoteResults(), // Pastikan service ini benar
        voteService.getStatistics(), // Pastikan service ini benar
      ]);

      setResults(resData.data || resData); // Handle jika response dibungkus .data

      if (statsData.data) {
        setStats({
          totalVotes: parseInt(statsData.data.total_suara_masuk, 10),
          totalDPT: parseInt(statsData.data.total_daftar_pemilih_tetap, 10),
        });
      }
    } catch (error) {
      console.error("Gagal load initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();

    // 2. Setup Socket
    socket.connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    // 3. Dengarkan Event "vote_update"
    const onVoteUpdate = (newData) => {
      console.log("⚡ Update Socket:", newData);

      // Update Results
      if (newData.results) {
        setResults(newData.results);
      }

      // Update Stats
      if (newData.statistics) {
        setStats({
          totalVotes: parseInt(newData.statistics.total_suara_masuk, 10),
          totalDPT: parseInt(newData.statistics.total_daftar_pemilih_tetap, 10),
        });
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("vote_update", onVoteUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("vote_update", onVoteUpdate);
      socket.disconnect();
    };
  }, []);

  return { results, stats, loading, isConnected };
};
