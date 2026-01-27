import { useState, useEffect, useCallback, use } from "react";
import { resultService } from "../services/resultService";
// tambahin toast

export const useStaticResult = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetching, setRefetching] = useState(false);

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setRefetching(true);

    try {
      const result = await resultService.getVoteResults();
      setData(result);
      if (isManual) console.log("Data berhasil diperbaharui"); //ganti toast
    } catch (error) {
      console.log("Gagal mengambil data"); // ganti toast
    } finally {
      setLoading(false);
      setRefetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetching, refetch: () => fetchData(true) };
};
