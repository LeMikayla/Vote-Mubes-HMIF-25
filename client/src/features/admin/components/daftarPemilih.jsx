import { useEffect, useState } from "react";
import { userServices } from "../services/userServices";
import * as XLSX from "xlsx";
import { Search, RotateCcw, UserCheck, UserX } from "lucide-react";
import Loader from "../../../shared/components/loader.jsx";

export default function DaftarPemilih() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // 1. Load Semua Data (Default)
  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userServices.getAllUsers();
      setUsers(data);
      setIsSearching(false);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pemilih.");
    } finally {
      setLoading(false);
    }
  };

  // Panggil saat pertama kali buka
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // 2. Fungsi Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Jangan cari kalau kosong

    setLoading(true);
    setError(null);
    try {
      // Panggil Service getUserByUsername
      const result = await userServices.getUserByUsername(searchQuery);

      // Karena backend mengembalikan single object (bukan array), kita bungkus jadi array
      // supaya bisa di-map di tabel
      setUsers([result]);
      setIsSearching(true);
    } catch (err) {
      console.error(err);
      setUsers([]); // Kosongkan tabel
      // Cek apakah error 404 (Not Found)
      if (err.response && err.response.status === 404) {
        setError(`Username "${searchQuery}" tidak ditemukan.`);
      } else {
        setError("Terjadi kesalahan saat mencari.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Data dummy untuk contoh
    const templateData = [
      {
        Username: "fefesj",
        Email: "mhs1@unpad.ac.id",
        Password: "12345(Opsional)",
      },
      { Username: "fesed", Email: "mhs2@unpad.ac.id", Password: "" },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Template_DPT_HMIF.xlsx");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (evt) => {
      try {
        const binaryStr = evt.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // Ambil sheet pertama
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Konversi ke JSON
        const rawData = XLSX.utils.sheet_to_json(sheet);

        if (rawData.length === 0) {
          toast.error("File Excel kosong!");
          return;
        }

        // Mapping Data (Sesuaikan Header Excel -> Key Database)
        // Kita paksa formatnya biar sesuai backend
        const formattedData = rawData
          .map((row) => ({
            username: String(row.NPM || row.npm || row.Username || ""), // Handle berbagai case
            email: row.Email || row.email || null,
            password: String(row.Password || row.password || "12345"), // Default password
          }))
          .filter((user) => user.username !== ""); // Hapus baris kosong

        // Konfirmasi sebelum upload
        if (
          !window.confirm(
            `Ditemukan ${formattedData.length} data. Lanjut import?`,
          )
        )
          return;

        // Kirim ke Backend
        setLoading(true);
        await userService.importUsers(formattedData);

        toast.success(`Berhasil mengimport ${formattedData.length} pemilih!`);
        fetchUsers(); // Refresh tabel
      } catch (error) {
        console.error(error);
        toast.error("Gagal membaca file Excel. Pastikan format benar.");
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDeleteAll = async () => {
    // Safety Check 1
    if (
      !window.confirm(
        "⚠️ PERINGATAN: Anda yakin ingin MENGHAPUS SEMUA DATA PEMILIH?\n\nSemua akun mahasiswa akan hilang. Akun Admin tetap aman.",
      )
    ) {
      return;
    }

    // Safety Check 2 (Double Confirm)
    const text = window.prompt(
      "Ketik 'HAPUS' untuk mengonfirmasi pembersihan data DPT:",
    );
    if (text !== "HAPUS") return toast.error("Batal menghapus.");

    try {
      setLoading(true);
      await userServices.deleteAllUsers();

      toast.success("Database pemilih berhasil dibersihkan!");
      fetchAllUsers(); // Refresh tabel jadi kosong
    } catch (error) {
      toast.error("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Fungsi Reset
  const handleReset = () => {
    setSearchQuery("");
    fetchAllUsers();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Input File Tersembunyi */}
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {/* --- HEADER & SEARCH BAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Daftar Pemilih Tetap (DPT)
          </h2>
          <p className="text-sm text-gray-500">
            Kelola data pemilih dan status voting.
          </p>
        </div>

        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari Username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9D1016] outline-none w-full md:w-64"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#9D1016] text-white px-4 py-2 rounded-lg hover:bg-[#7a0c11] transition flex items-center gap-2"
          >
            <Search size={18} /> Cari
          </button>

          {/* Tombol Reset muncul kalau lagi mode search */}
          {isSearching && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
            >
              <RotateCcw size={18} /> Reset
            </button>
          )}
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Tombol Download Template */}
        <button
          onClick={handleDownloadTemplate}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium transition"
        >
          📥 Download Template
        </button>

        {/* Tombol Import (Trigger Input File) */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2 transition"
        >
          📂 Import Excel
        </button>

        {/* Tombol Hapus Massal */}
        {users.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 text-sm font-medium transition"
          >
            🗑️ Hapus Semua
          </button>
        )}
      </div>

      {/* --- TABEL DATA --- */}
      {error ? (
        <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Username</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status Voting</th>
                <th className="p-4 font-semibold">Waktu Vote</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    Data kosong.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-gray-600">#{user.id}</td>
                    <td className="p-4 font-medium text-gray-800">
                      {user.username}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.has_voted ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded w-fit text-sm font-medium">
                          <UserCheck size={16} /> Sudah Memilih
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400 bg-gray-100 px-2 py-1 rounded w-fit text-sm font-medium">
                          <UserX size={16} /> Belum Memilih
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {user.voted_at
                        ? new Date(user.voted_at).toLocaleString("id-ID")
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
