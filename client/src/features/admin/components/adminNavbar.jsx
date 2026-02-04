import {
  LogOut,
  PieChart,
  Users,
  FileText,
  Settings,
  Minimize2,
  Maximize2,
} from "lucide-react";

export default function AdminNavbar({
  setPage,
  currentPage,
  onToggleNavbar,
  isNavbarVisible,
}) {
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const getNavClass = (targetPage) => {
    const isActive = currentPage === targetPage;
    const base =
      "flex items-center gap-2 px-3 py-2 rounded-md transition text-sm font-medium transition-all duration-200";

    const status = isActive
      ? "bg-[#9D1016] text-white shadow-md transform scale-105"
      : "text-slate-300 hover:text-white hover:bg-white/10";

    return `${base} ${status}`;
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* KIRI: Logo / Judul */}
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold tracking-wider text-[#F4AB39]">
              ADMIN PANEL
            </div>

            {/* TENGAH: Menu Navigasi */}
            <div className="hidden md:flex space-x-2 ml-8 bg-slate-800/50 p-1 rounded-lg">
              <button
                onClick={() => setPage("list")}
                className={getNavClass("list")}
              >
                <FileText size={16} /> Data Kandidat
              </button>

              <button
                onClick={() => setPage("users")}
                className={getNavClass("users")}
              >
                <Users size={16} /> Data Pemilih
              </button>

              <button
                onClick={() => setPage("grafik")}
                className={getNavClass("grafik")}
              >
                <PieChart size={16} /> Grafik
              </button>

              <button
                onClick={() => setPage("settings")}
                className={getNavClass("settings")}
              >
                <Settings size={16} /> Pengaturan
              </button>
            </div>
          </div>

          {/* KANAN: Toggle Navbar + Logout */}
          <div className="flex items-center gap-2">
            {/* ✅ TOMBOL HIDE/SHOW NAVBAR */}
            {currentPage === "grafik" && (
              <button
                onClick={onToggleNavbar}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-yellow-900/20 transition"
                title={
                  isNavbarVisible
                    ? "Hide Navbar (Presentation Mode)"
                    : "Show Navbar"
                }
              >
                {isNavbarVisible ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
                <span className="hidden lg:inline">
                  {isNavbarVisible ? "Presentation Mode" : "Show Controls"}
                </span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-red-900/20 transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
