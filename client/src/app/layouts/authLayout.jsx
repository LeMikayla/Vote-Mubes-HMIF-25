import { Outlet } from "react-router-dom";
import DekorasiScroll from "../../features/auth/components/scroll/dekorasiScroll.jsx";
import Navbar from "../../shared/components/navbar/navbar.jsx";

const AuthLayout = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 overflow-hidden">
      {/* 🔥 0. NAVBAR (Ditempel di paling atas) */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* 1. UPPER SCROLL BAR (Hiasan Atas) */}
      {/* Ditambah margin-top agar tidak tertutup navbar jika layarnya kecil */}
      <div className="relative z-20 -mb-2 filter drop-shadow-md mt-16 md:mt-0">
        <DekorasiScroll />
      </div>

      {/* 2. KERTAS UTAMA (Container) */}
      <div
        className="w-81.5 min-h-103.75 relative z-10 pb-20 transition-all duration-500"
        style={{
          backgroundImage: "url('/images/paper.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex flex-col items-center pt-6 px-5">
          {/* A. HEADER SECTION (Badge & Text) */}
          <div className="flex items-center gap-4 w-full mb-6">
            {/* Badge Logo */}
            <div className="relative w-22.5 h-22.5 shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#F5A939] translate-y-1" />
              <div className="absolute inset-0 rounded-full bg-[#9D1016] flex items-center justify-center">
                <div className="w-21 h-21 rounded-full border-[3px] border-[#F5A939] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src="/images/roman-face.png"
                    alt="Logo Organisasi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Teks Sambutan */}
            <div className="text-[#2E2E2E] font-serif leading-tight flex-1">
              <h1 className="text-[16px] font-semibold mb-2">
                "Selamat datang di
                <br />
                Pemilihan Ketua HMIF."
              </h1>
              <p className="text-[11px]">
                Pilih dengan bijak, karena satu suara
                <br />
                bisa menentukan arah kepemimpinan.
              </p>
            </div>
          </div>

          {/* B. DIVIDER (Panah & Diamond) */}
          <div className="flex items-center justify-center gap-2.5 mb-8 w-full">
            <div className="relative w-31 h-2.5">
              <div
                className="absolute inset-0 bg-[#F5AB39]"
                style={{
                  clipPath:
                    "polygon(100% 50%, calc(100% - 12px) 0, 0 50%, calc(100% - 12px) 100%)",
                }}
              />
            </div>
            <div className="w-2.5 h-2.5 bg-[#F5AB39] rotate-45" />
            <div className="relative w-31 h-2.5">
              <div
                className="absolute inset-0 bg-[#F5AB39]"
                style={{
                  clipPath: "polygon(0 50%, 12px 0, 100% 50%, 12px 100%)",
                }}
              />
            </div>
          </div>

          {/* C. OUTLET (Form Login/Register akan muncul disini) */}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>

      {/* 3. LOWER SCROLL BAR (Hiasan Bawah) */}
      <div className="relative z-20 -mt-2 filter drop-shadow-md">
        <DekorasiScroll />
      </div>
    </div>
  );
};

export default AuthLayout;
