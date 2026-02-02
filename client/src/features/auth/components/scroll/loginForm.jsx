import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import RomanInput from "./romanInput.jsx"; // Import komponen pecahan tadi
import { useAuth } from "../../hooks/useAuth.js";

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
      //tambahin toast
      return;
    }
    const result = await login(formData.npm, formData.password);

    if (result.success) {
      const userRole = result.user?.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/vote");
      }
    } else {
      //tambahin toast
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
          iconSrc="/images/NPM.png"
          placeholder="Masukkan NPM kamu"
          // Props penting agar bisa diketik:
          name="npm"
          value={formData.npm}
          onChange={handleChange}
          disabled={loading} // Matikan input saat loading
        />
      </div>

      {/* --- INPUT PASSWORD --- */}
      <div className="flex flex-col items-start gap-1 w-full">
        <RomanInput
          iconSrc="/images/PW.png"
          placeholder="Masukkan kata sandi"
          // Props penting agar bisa diketik:
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          type={showPassword ? "text" : "password"} // Toggle text/password
          // Tombol Mata (Show/Hide)
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

        {/* Link Lupa Password (Hanya hiasan UI) */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="text-[11px] text-[#9D1016] hover:underline"
          >
            Kirim Ulang Kata Sandi
          </button>
        </div>
      </div>

      {/* --- TOMBOL LOGIN --- */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button
          type="submit"
          disabled={loading} // Cegah klik ganda
          className="relative w-19.5 h-19.5 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: "#9D1016",
            boxShadow: "0 6px 0 #762125, 0 8px 12px rgba(0,0,0,0.3)",
          }}
        >
          {/* Hiasan Shine pada tombol */}
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

          {/* Teks Tombol (Berubah jadi '...' saat loading) */}
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
