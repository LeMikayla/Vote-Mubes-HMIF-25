import { useState, useEffect, use } from "react";
import { userServices } from "../services/userServices";
import Loader from "../../../shared/components/Loader.jsx";

export default function DaftarPemilih() {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const result = await userServices.getAllUsers();
      const data = result.data || result;
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      // tambahkan toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Daftar Pemilih Tetap</h2>
        <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium">
          Total Pemilih: {users.length}
        </div>
      </div>

      {Loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Nama</th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  NPM/NIM
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Belum ada data pemilih.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.nama}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.npm}</td>
                    <td className="px-6 py-4">
                      {user.hasVoted ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          ✅ Sudah Memilih
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          ❌ Belum Memilih
                        </span>
                      )}
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
