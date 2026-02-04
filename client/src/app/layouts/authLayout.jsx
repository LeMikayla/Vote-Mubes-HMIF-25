import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DekorasiScroll from "../../features/auth/components/scroll/dekorasiScroll.jsx";
import Paper from "../../assets/images/paper.png";
import Navbar from "../../shared/components/navbar/navbar.jsx";
import RomanFace from "../../assets/images/roman-face.png";
import { LoginWarningContent } from "../../shared/components/modal/content"; // ✅ IMPORT INI

const AuthLayout = () => {
  const location = useLocation();
  const [modal, setModal] = useState(null);

  // ✅ Cek apakah ada warning dari redirect
  useEffect(() => {
    if (location.state?.showLoginWarning) {
      setModal("login-warning");
      // Clear state setelah ditampilkan
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <div
        className="w-full max-w-110 h-dvh flex flex-col font-sans mx-auto overflow-hidden px-4 pb-4 gap-4"
        style={{
          background:
            "linear-gradient(135deg, #F0DEC1 0%, #F6E7D4 19%, #FAE1C8 63%, #F0CEB0 100%)",
        }}
      >
        {/* Header - Navbar */}
        <Navbar />

        {/* Main Content - Centered scroll */}
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center relative">
            {/* 1. UPPER SCROLL BAR */}
            <div className="relative z-20 -mb-2 filter drop-shadow-md">
              <DekorasiScroll />
            </div>

            {/* 2. PAPER CONTAINER */}
            <div
              className="w-75 min-h-95 relative z-10 drop-shadow-md pb-12"
              style={{
                backgroundImage: `url('${Paper}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full flex flex-col items-center pt-4 px-4">
                {/* A. HEADER SECTION (Badge & Text) */}
                <div className="flex items-center gap-3 w-full mb-4">
                  {/* Badge Logo */}
                  <div className="relative w-17.5 h-17.5 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-[#F5A939] translate-y-1" />
                    <div className="absolute inset-0 rounded-full bg-[#9D1016] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-[2.5px] border-[#F5A939] overflow-hidden flex items-center justify-center bg-white">
                        <img
                          src={RomanFace}
                          alt="Logo Caesar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teks Sambutan */}
                  <div className="text-[#2E2E2E] font-serif leading-tight flex-1">
                    <h1 className="text-[14px] font-semibold mb-1">
                      "Selamat datang di
                      <br />
                      Pemilihan Ketua HMIF."
                    </h1>
                    <p className="text-[10px]">
                      Pilih dengan bijak, karena satu suara
                      <br />
                      bisa menentukan arah kepemimpinan.
                    </p>
                  </div>
                </div>

                {/* B. DIVIDER (Panah & Diamond) */}
                <div className="flex items-center justify-center gap-2 mb-6 w-full">
                  <div className="relative w-25 h-2">
                    <div
                      className="absolute inset-0 bg-[#F5AB39]"
                      style={{
                        clipPath:
                          "polygon(100% 50%, calc(100% - 12px) 0, 0 50%, calc(100% - 12px) 100%)",
                      }}
                    />
                  </div>
                  <div className="w-2 h-2 bg-[#F5AB39] rotate-45" />
                  <div className="relative w-25 h-2">
                    <div
                      className="absolute inset-0 bg-[#F5AB39]"
                      style={{
                        clipPath: "polygon(0 50%, 12px 0, 100% 50%, 12px 100%)",
                      }}
                    />
                  </div>
                </div>

                {/* C. OUTLET (Form Login/Register akan muncul disini) */}
                <div className="w-full pb-16">
                  <Outlet />
                </div>
              </div>
            </div>

            {/* LOGIN BUTTON - Between paper and scroll */}
            <div
              className="absolute"
              style={{
                bottom: "-24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 50,
              }}
            >
              <button
                type="submit"
                form="login-form"
                className="relative w-19.5 h-19.5 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "#9D1016",
                  boxShadow: "0 6px 0 #762125, 0 8px 12px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="absolute inset-1 rounded-full pointer-events-none"
                  style={{
                    background: "transparent",
                    border: "3px solid transparent",
                    borderTopColor: "transparent",
                    borderRightColor: "#B6474C",
                    transform: "rotate(225deg)",
                  }}
                />
                <span
                  className="absolute inset-0 flex items-center justify-center text-white font-serif text-sm tracking-wider"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  LOGIN
                </span>
              </button>
            </div>

            {/* 3. LOWER SCROLL BAR (Hiasan Bawah) */}
            <div className="relative z-10 -mt-2 filter drop-shadow-md">
              <DekorasiScroll />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-[10px] text-gray-500 font-serif tracking-wider uppercase opacity-60">
          © HMIF 2025 - Semua Hak Dilindungi
        </footer>
      </div>

      {/* ✅ MODAL LOGIN WARNING */}
      {modal === "login-warning" && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-[60]"
            onClick={() => setModal(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[70]">
            <LoginWarningContent onCancel={() => setModal(null)} />
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;