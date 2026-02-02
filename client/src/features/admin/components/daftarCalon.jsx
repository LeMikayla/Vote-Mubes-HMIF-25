import { useEffect, useState } from "react";
import { candidateService } from "../../voting/services/candidateService";
import { adminService } from "../services/adminService";
import Loader from "../../../shared/components/loader.jsx";

export default function DaftarCalon({ onTambah, onEdit }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responses = await candidateService.getAllCandidates();
      setData(responses.data || responses);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      // tambahkan toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUiAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
  };

  const hapus = async (id) => {
    if (!confirm("Yakin ingin menghapus calon ini?")) return;

    try {
      await adminService.deleteCandidate(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      // tambahkan toast
    }
  };

  const handleImageError = (e, name) => {
    e.targeet.oneerror = null;
    e.target.src = getUiAvatar(name);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Daftar Calon Ketua</h2>

      <button
        onClick={onTambah}
        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
      >
        + Tambah Calon
      </button>

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6 space-y-4">
          {data.length === 0 && (
            <p className="text-gray-500">Belum ada calon.</p>
          )}

          {data.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl p-4 shadow-lg flex gap-4"
            >
              {c.foto && (
                <img
                  src={c.foto ? c.foto : getUiAvatar(c.nama)}
                  alt={c.nama}
                  onError={(e) => handleImageError(e, c.nama)}
                  className="w-22.5 h-22.5 rounded-full object-cover border-2 border-gray-200"
                />
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{c.nama}</h3>
                <small className="text-gray-500">NPM: {c.npm}</small>
                <p className="mt-2 line-clamp-2">
                  <b>Visi:</b> {c.visi}
                </p>

                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => hapus(c.id)}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
