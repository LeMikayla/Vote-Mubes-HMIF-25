import { useState, useEffect, useCallback } from "react";
// Gunakan Service yang sama dengan result.jsx sebelumnya
import { resultService } from "../services/resultService";
import { electionService } from "../../voting/services/electionService";
import { toast } from "sonner";

export const useStaticResult = () => {
  // State dipisah biar rapi
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ total: 0, participated: 0 });
  const [deadline, setDeadline] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refetching, setRefetching] = useState(false);

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setRefetching(true);

    try {
      // Fetch 3 API sekaligus (Parallel)
      const [configRes, resultsRes, statsRes] = await Promise.all([
        electionService.getConfig(),
        resultService.getVoteResults(),
        resultService.getStatistics(),
      ]);

      // 1. Set Deadline
      if (configRes.endDate) setDeadline(configRes.endDate);

      // 2. Set Results (Raw Data dari Backend)
      setResults(resultsRes.data || resultsRes);

      // 3. Set Stats
      if (statsRes.data) {
        setStats({
          participated: parseInt(
            statsRes.data.total_pemilih_berpartisipasi ||
              statsRes.data.total_suara_masuk ||
              0,
          ),
          total: parseInt(statsRes.data.total_daftar_pemilih_tetap || 0),
        });
      }

      if (isManual) toast.success("Data berhasil diperbaharui");
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      if (isManual) toast.error("Gagal memperbarui data");
    } finally {
      setLoading(false);
      setRefetching(false);
    }
  }, []);

  // Fetch otomatis saat pertama kali render
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return semua data yang dibutuhkan Result.jsx
  return {
    results,
    stats,
    deadline,
    loading,
    refetching,
    refetch: () => fetchData(true),
  };
};
