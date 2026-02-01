import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const response = await authService.getMe();
        setUser(response.user);
        setRole(response.user.role);
        setToken(storedToken);
      } catch (error) {
        console.error("Token invalid/expired:", error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await authService.login(username, password);
      const { token: newToken, user: userData } = response;

      setToken(newToken);
      setUser(userData);
      setRole(userData.role);
      localStorage.setItem("token", newToken);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login gagal",
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

  return (
    <AuthContext.Provider
      value={{ user, token, role, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
