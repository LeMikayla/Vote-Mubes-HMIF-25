import { useState, useEffect } from "react";
import { voteService } from "../../features/voting/services/voteService";

export const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);

      // Check if user has voted (only if logged in)
      if (token) {
        try {
          const voteStatus = await voteService.checkVoteStatus();
          setHasVoted(voteStatus.hasVoted || false);
        } catch (error) {
          console.error("Error checking vote status:", error);
          setHasVoted(false);
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      setHasVoted(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAuthenticated, hasVoted, loading, recheckStatus: checkStatus };
};