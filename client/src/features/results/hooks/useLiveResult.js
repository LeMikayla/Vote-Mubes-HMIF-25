import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import { resultService } from "../services/resultService";

export const useLiveResult = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      const initial = await resultService.getVoteResults();
      setData(initial);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();

    socket.on("vote_update", (newData) => {
      console.log("Update masuk via socket!", newData);
      setData(newData);
    });

    return () => {
      socket.off("vote_update");
    };
  }, []);

  return { data, loading };
};
