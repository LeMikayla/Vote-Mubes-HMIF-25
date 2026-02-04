import { useEffect, useState, useRef } from "react";
import { socket } from "../../../lib/socket";
import { resultService } from "../services/resultService";

export const useLiveResult = () => {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ totalVotes: 0, totalDPT: 0 });
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const listenersRegistered = useRef(false); // ✅ Prevent duplicate listeners

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [resData, statsData] = await Promise.all([
        resultService.getVoteResults(),
        resultService.getStatistics(),
      ]);

      console.log("📊 Initial Results:", resData);
      console.log("📈 Initial Stats:", statsData);

      setResults(resData.data || resData);

      if (statsData.data) {
        setStats({
          totalVotes: parseInt(statsData.data.total_suara_masuk, 10) || 0,
          totalDPT:
            parseInt(statsData.data.total_daftar_pemilih_tetap, 10) || 0,
        });
      }
    } catch (error) {
      console.error("❌ Gagal load initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Prevent duplicate registration
    if (listenersRegistered.current) {
      console.log("⏭️ Listeners already registered");
      return;
    }

    console.log("🎯 useLiveResult: Setting up listeners");
    listenersRegistered.current = true;

    fetchInitialData();

    const onConnect = () => {
      console.log("✅ Socket connected in useLiveResult");
      setIsConnected(true);
    };

    const onDisconnect = (reason) => {
      console.log("❌ Socket disconnected in useLiveResult. Reason:", reason);
      setIsConnected(false);
    };

    const onConnectError = (error) => {
      console.error("❌ Connection error:", error.message);
      setIsConnected(false);
    };

    const onVoteUpdate = (newData) => {
      console.log("⚡ Vote update received:", newData);

      if (newData.results) {
        setResults(newData.results);
      }

      if (newData.statistics) {
        setStats({
          totalVotes: parseInt(newData.statistics.total_suara_masuk, 10) || 0,
          totalDPT:
            parseInt(newData.statistics.total_daftar_pemilih_tetap, 10) || 0,
        });
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("vote_update", onVoteUpdate);

    // Check current connection status
    setIsConnected(socket.connected);

    return () => {
      console.log("🧹 useLiveResult: Cleaning up listeners");
      listenersRegistered.current = false;

      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("vote_update", onVoteUpdate);
    };
  }, []);

  return { results, stats, loading, isConnected };
};
