import { useEffect, useState } from "react";
import { userServices } from "../services/userServices";
import { Search, RotateCcw, UserCheck, UserX } from "lucide-react";

export default function DaftarPemilih() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

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

  // 3. Fungsi Reset
  const handleReset = () => {
    setSearchQuery("");
    fetchAllUsers();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
