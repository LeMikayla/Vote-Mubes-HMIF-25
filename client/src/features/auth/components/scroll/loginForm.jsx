import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import RomanInput from "./romanInput.jsx";
import Username from "../../../../assets/images/username.png";
import Password from "../../../../assets/images/password.png";
import { useAuth } from "../../hooks/useAuth.js";
import { toast } from "sonner";

const LoginForm = () => {
  const [formData, setFormData] = useState({ npm: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.npm || !formData.password) {
      toast.error("NPM dan kata sandi wajib diisi.");
      return;
    }

    const result = await login(formData.npm, formData.password);

    if (result.success) {
      // ✅ FIX: Use result.role instead of result.user?.role
      const userRole = result.role;

      if (userRole === "admin") {
        toast.success("Login berhasil! Selamat datang Admin.");
        navigate("/admin/dashboardAdmin");
      } else {
        toast.success(`Login berhasil! Selamat datang ${formData.npm}.`);
        navigate("/votes");
      }
    } else {
      // ✅ FIX: Show the actual error message from backend
      toast.error(result.message || "Gagal login. Silakan coba lagi.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-start gap-10 w-full mt-8"
    >
      {/* --- INPUT NPM --- */}
      <div className="flex flex-col items-start gap-1 w-full">
        <RomanInput
          iconSrc={Username}
          placeholder="Masukkan NPM kamu"
          name="npm"
          value={formData.npm}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* --- INPUT PASSWORD --- */}
      <div className="flex flex-col items-start gap-1 w-full">
        <RomanInput
          iconSrc={Password}
          placeholder="Masukkan kata sandi"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          type={showPassword ? "text" : "password"}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
      </div>

      {/* --- TOMBOL LOGIN --- */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30">
        <button
          type="submit"
          disabled={loading}
          className="relative w-19.5 h-19.5 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: "#9D1016",
            boxShadow: "0 6px 0 #762125, 0 8px 12px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="absolute inset-1 rounded-full pointer-events-none"
            style={{
              background: "transparent",
              border: "3px solid transparent",
              borderTopColor: "transparent",
              borderRightColor: "#B6474C",
              transform: "rotate(225deg)",
            }}
          />

          <span
            className="absolute inset-0 flex items-center justify-center text-white font-serif text-sm tracking-wider"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
          >
            {loading ? "..." : "LOGIN"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
