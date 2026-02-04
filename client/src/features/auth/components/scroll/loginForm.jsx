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
      id="login-form"
      onSubmit={handleLogin}
      className="flex flex-col items-start gap-8 w-full mt-6"
    >
      {/* --- INPUT NPM --- */}
      <div className="flex flex-col items-start gap-1 w-full">
        <RomanInput
          iconSrc={Username}
          placeholder="Masukkan username kamu"
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
    </form>
  );
};

export default LoginForm;
