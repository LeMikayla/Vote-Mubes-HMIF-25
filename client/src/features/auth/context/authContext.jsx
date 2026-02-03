import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import Loader from "../../../shared/components/loader.jsx";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ FIX: Use getMe() to validate existing token
  const checkAuth = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      setIsInitialized(true);
      return;
    }

    try {
      // ✅ Call /auth/me to get user data
      const response = await authService.getMe();

      if (response.success && response.user) {
        setUser(response.user);
        setRole(response.user.role);
        setToken(storedToken);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Token invalid/expired:", error);
      toast.error("Sesi telah berakhir. Silakan login kembali.");
      logout();
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  // ✅ FIX: Handle backend response structure correctly
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await authService.login(username, password);

      // ✅ Backend now returns: { success, message, token, user }
      if (response.success && response.token && response.user) {
        const newToken = response.token;
        const userData = response.user;

        // Store everything
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(userData);
        setRole(userData.role);

        return {
          success: true,
          user: userData,
          role: userData.role,
        };
      } else {
        return {
          success: false,
          message: response.message || "Login gagal",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Login gagal",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading || !isInitialized) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, role, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
