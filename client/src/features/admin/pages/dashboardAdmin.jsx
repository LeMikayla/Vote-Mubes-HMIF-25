"use client";
import { useState } from "react";
import AdminNavbar from "./components/adminNavbar";
import DaftarCalon from "./components/daftarCalon";
import FormCalon from "./components/formCalon";
import DaftarPemilih from "./components/DaftarPemilih";
import ElectionSetting from "./components/electionSetting.jsx";
import AdminGrafik from "./components/adminGrafik";

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedCalon, setSelectedCalon] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar menerima fungsi pengubah halaman */}
      <AdminNavbar setPage={setPage} currentPage={page} />

      <main className="max-w-7xl mx-auto p-6">
        {/* 1. DATA KANDIDAT (Default) */}
        {page === "list" && (
          <div className="animate-fade-in">
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
          </div>
        )}

        {/* 2. FORM TAMBAH/EDIT */}
        {page === "form" && (
          <div className="animate-fade-in">
            <FormCalon calon={selectedCalon} onBack={() => setPage("list")} />
          </div>
        )}

        {/* 3. DATA PEMILIH */}
        {page === "users" && (
          <div className="animate-fade-in">
            <DaftarPemilih />
          </div>
        )}

        {/* 4. GRAFIK (Placeholder Socket) */}
        {page === "grafik" && <AdminGrafik />}

        {/* 5. PENGATURAN */}
        {page === "settings" && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Pengaturan Pemilihan
              </h1>
              <p className="text-gray-500 text-sm">
                Kelola jadwal deadline dan status sistem voting.
              </p>
            </div>
            <ElectionSetting />
          </div>
        )}
      </main>
    </div>
  );
}
