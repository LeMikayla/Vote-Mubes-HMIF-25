export default function AdminNavbar({ setPage, currentPage }) {
  return (
    <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-[18px] font-semibold">
        Admin Panel – Calon Ketua Himpunan
      </div>

      <div className="space-x-4 text-sm font-medium">
        <button
          onClick={() => setPage("list")}
          className={`px-3 py-2 rounded-md transition ${currentPage === "list" || currentPage === "form" ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
        >
          Data Kandidat
        </button>
        <button
          onClick={() => setPage("users")}
          className={`px-3 py-2 rounded-md transition ${currentPage === "users" ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
        >
          Data Pemilih
        </button>
      </div>
    </div>
  );
}
