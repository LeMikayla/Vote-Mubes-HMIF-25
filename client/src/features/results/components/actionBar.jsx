import { Share2, Download } from "lucide-react";

export default function ActionBar({ onShare, onDownload }) {
  return (
    <div className="w-full flex items-center justify-center gap-4 text-[#9D1016] mt-auto pb-4 animate-slide-up delay-100">
      {/* Hiasan Kiri */}
      <div className="relative w-28.5 h-3.75">
        <div
          className="absolute inset-0 bg-[#9D1016]"
          style={{
            clipPath:
              "polygon(100% 50%, calc(100% - 10px) 0, 0 50%, calc(100% - 10px) 100%)",
          }}
        />
      </div>

      {/* Tombol Share */}
      <button
        onClick={onShare}
        className="flex flex-col items-center gap-2 hover:scale-110 transition-transform focus:outline-none"
      >
        <Share2 size={32} strokeWidth={2.2} />
        <span className="text-[12px] font-serif tracking-widest">BAGIKAN</span>
      </button>

      {/* Pemisah Tengah */}
      <div className="bg-[#9D1016] rotate-45 w-2.5 h-2.5" />

      {/* Tombol Download */}
      <button
        onClick={onDownload}
        className="flex flex-col items-center gap-2 hover:scale-110 transition-transform focus:outline-none"
      >
        <Download size={32} strokeWidth={2.2} />
        <span className="text-[12px] font-serif tracking-widest">UNDUH</span>
      </button>

      {/* Hiasan Kanan */}
      <div className="relative w-28.5 h-3.75">
        <div
          className="absolute inset-0 bg-[#9D1016]"
          style={{ clipPath: "polygon(0 50%, 10px 0, 100% 50%, 10px 100%)" }}
        />
      </div>
    </div>
  );
}
