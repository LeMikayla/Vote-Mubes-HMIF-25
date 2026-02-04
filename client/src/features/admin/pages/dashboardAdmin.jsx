"use client";
import { useState } from "react";
import AdminNavbar from "../components/adminNavbar";
import DaftarCalon from "../components/daftarCalon";
import FormCalon from "../components/formCalon";
import DaftarPemilih from "../components/daftarPemilih";
import ElectionSetting from "../components/electionSetting.jsx";
import AdminGrafik from "../components/adminGrafik";

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedCalon, setSelectedCalon] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // ✅ STATE BARU

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ✅ Navbar dengan conditional rendering */}
      {isNavbarVisible && (
        <AdminNavbar
          setPage={setPage}
          currentPage={page}
          onToggleNavbar={() => setIsNavbarVisible(!isNavbarVisible)}
          isNavbarVisible={isNavbarVisible}
        />
      )}

      {/* ✅ Floating button untuk show navbar saat hidden */}
      {!isNavbarVisible && (
        <button
          onClick={() => setIsNavbarVisible(true)}
          className="fixed top-4 right-4 z-50 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all hover:scale-110"
          title="Show Controls"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}

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
