import { useState } from "react";
import AdminNavbar from "./components/adminNavbar";
import DaftarCalon from "./components/daftarCalon";
import FormCalon from "./components/formCalon";
import DaftarPemilih from "./components/DaftarPemilih";

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedCalon, setSelectedCalon] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar setPage={setPage} currentPage={page} />

      <div style={{ padding: 20 }}>
        {page === "list" && (
          <DaftarCalon
            onTambah={() => {
              setSelectedCalon(null);
              setPage("form");
            }}
            onEdit={(calon) => {
              setSelectedCalon(calon);
              setPage("form");
            }}
          />
        )}

        {page === "form" && (
          <FormCalon calon={selectedCalon} onBack={() => setPage("list")} />
        )}

        {page === "users" && <DaftarPemilih />}
      </div>
    </div>
  );
}
