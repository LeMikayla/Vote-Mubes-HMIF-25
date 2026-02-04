import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { userServices } from "../../admin/services/userServices.js";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader.jsx";

const ProtectedRoute = ({ allowedRoles = [], requireVoting = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();
  const [hasVoted, setHasVoted] = useState(null);
  const [checkingVote, setCheckingVote] = useState(requireVoting);

  console.log({ user, token, loading });

  // ✅ Cek status voting jika diperlukan
  useEffect(() => {
    const checkVotingStatus = async () => {
      if (!requireVoting || !user?.username) {
        setCheckingVote(false);
        return;
      }

      try {
        const userData = await userServices.getUserByUsername(user.username);
        setHasVoted(userData.has_voted);
      } catch (error) {
        console.error("Error checking voting status:", error);
        setHasVoted(false);
      } finally {
        setCheckingVote(false);
      }
    };

    if (!loading && token && user) {
      checkVotingStatus();
    }
  }, [user, token, loading, requireVoting]);

  // Loading state
  if (loading || checkingVote) {
    return <Loader />;
  }

  // Auth check
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Voting check (hanya untuk route yang requireVoting=true)
  if (requireVoting && !hasVoted) {
    return <Navigate to="/votes" state={{ showWarning: true }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;