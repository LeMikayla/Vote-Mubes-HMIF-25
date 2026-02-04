import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { userServices } from "../../admin/services/userServices.js";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader.jsx";

const ProtectedRoute = ({ allowedRoles = [], requireVoting = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();
  const [hasVoted, setHasVoted] = useState(null);

  const isVotingCheckPending = requireVoting && hasVoted === null;

  useEffect(() => {
    if (loading) return;

    const checkVotingStatus = async () => {
      // Validasi ketat: jika tidak ada user.username, anggap false biar gak loading selamanya
      if (!requireVoting || !user?.username) {
        if (requireVoting && !user?.username) setHasVoted(false); // Fallback
        return;
      }

      try {
        const userData = await userServices.getUserByUsername(user.username);
        setHasVoted(!!userData.has_voted);
      } catch (error) {
        console.error("Error checking voting status:", error);
        setHasVoted(false);
      }
    };

    if (token && user) {
      checkVotingStatus();
    }
  }, [user, token, loading, requireVoting]);

  // 1. LOADING AUTH (Paling Pertama)
  if (loading) {
    return <Loader />;
  }

  // 2. CEK TOKEN (Belum Login)
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. 🔥 CEK ROLE DULUAN (Pindahkan ke Sini) 🔥
  // Kalau role salah, langsung tendang. Jangan pedulikan loading voting.
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Pastikan diarahkan ke halaman PUBLIC atau UNAUTHORIZED agar tidak loop
    return <Navigate to="/login" replace />; 
  }

  // 4. BARU CEK LOADING VOTING
  // Jika role sudah benar, baru kita tunggu proses cek voting
  if (isVotingCheckPending) {
    return <Loader />;
  }

  // 5. CEK STATUS VOTING
  if (requireVoting && hasVoted === false) {
    return <Navigate to="/votes" state={{ showWarning: true }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;