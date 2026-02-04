export default function ActionBar() {
  return (
    <div className="w-full flex items-center justify-center gap-4 text-[#9D1016] mt-10 pb-4 animate-slide-up delay-100">
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

      {/* Pemisah Tengah */}
      <div className="bg-[#9D1016] rotate-45 w-2.5 h-2.5" />

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
