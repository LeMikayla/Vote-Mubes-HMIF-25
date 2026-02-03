import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.getMe();
      if (response?.user) {
        setUser(response.user);
        setRole(response.user.role);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    // Jangan set loading true di sini agar tidak memicu Loader global 
    // Ini pelakunya cik
    try {
      const response = await authService.login(username, password);
      const { token: newToken, user: userData } = response;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      setRole(userData.role);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login gagal",
      };
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

  return (
    <AuthContext.Provider
      value={{ user, token, role, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};