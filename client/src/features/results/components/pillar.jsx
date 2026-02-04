const Pillar = ({ height, name, avatar, width = 42, isFullSize = false }) => {
  const fixedHeight = 18;
  const shaftHeight = Math.max(0, height - fixedHeight);

  // --- STYLE BARU (Mobile Optimized) ---

  // 1. Avatar Size
  // Admin: w-16 (64px), User: w-9 (36px) -> Cukup mungil untuk HP
  const avatarSizeClass = isFullSize
    ? "w-16 h-16 border-4"
    : "w-9 h-9 border-2";

  // 2. Margin (Jarak Avatar ke Pilar)
  const avatarMarginClass = isFullSize ? "-mt-20 mb-2" : "-mt-10 mb-1";

  // 3. Font Size Nama
  let nameFontSize;
  if (isFullSize) {
    nameFontSize = name.length > 15 ? "text-sm" : "text-base"; // Admin (Besar)
  } else {
    // User (HP): Gunakan font sangat kecil (10px) agar rapi
    nameFontSize = "text-[9px]";
  }

  // 4. Max Width Text (Agar nama panjang wrap ke bawah)
  const textMaxWidth = isFullSize ? "100px" : "55px";

  return (
    <div
      className="flex flex-col items-center transition-all duration-500 ease-out"
      style={{
        width: `${width}px`,
      }}
    >
      {/* AVATAR & NAMA */}
      <div
        className={`flex flex-col items-center shrink-0 z-30 ${avatarMarginClass}`}
      >
        <div
          className={`${avatarSizeClass} rounded-full border-[#FFF5EB] overflow-hidden shadow-lg bg-white transition-all duration-300`}
        >
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>

        <span
          className={`text-white ${nameFontSize} font-serif mt-1 drop-shadow-md text-center leading-tight transition-all duration-300`}
          style={{
            wordBreak: "break-word",
            hyphens: "auto",
            maxWidth: textMaxWidth,
            lineHeight: "1.1", // Spasi antar baris nama lebih rapat
          }}
        >
          {name}
        </span>
      </div>

      {/* CAPITAL (Kepala Pilar) */}
      <div className="w-full relative flex flex-col items-center shrink-0 z-10">
        <div className="w-[140%] h-1.5 bg-[#FFF5EB] rounded-[1px] shadow-sm mb-px" />
        <div className="w-full h-3 bg-[#FFF5EB] relative rounded-sm flex items-center justify-center">
          <div className="absolute -left-1.25 top-0.75 w-3 h-3 bg-[#FAD9B6] rounded-full shadow-inner" />
          <div className="absolute -right-1.25 top-0.75 w-3 h-3 bg-[#FAD9B6] rounded-full shadow-inner" />
        </div>
      </div>

      {/* SHAFT (Batang Pilar) */}
      <div
        className="w-full bg-[#FFF5EB] flex justify-center gap-1 pt-1 pb-0 relative shadow-inner transition-all duration-500 ease-out"
        style={{ height: `${shaftHeight}px` }}
      >
        <div className="w-[10%] h-full bg-[#FAD9B6] opacity-80 rounded-sm" />
        <div className="w-[10%] h-full bg-[#FAD9B6] opacity-80 rounded-sm" />
        <div className="w-[10%] h-full bg-[#FAD9B6] opacity-80 rounded-sm" />
      </div>

      {/* BASE (Kaki Pilar) */}
      <div className="w-full relative flex flex-col items-center shrink-0">
        <div className="w-[120%] h-1.5 bg-[#FFF5EB] rounded-[1px] shadow-sm" />
        <div className="w-[140%] h-2 bg-[#FAD9B6] rounded-xs shadow-md" />
      </div>
    </div>
  );
};

export default Pillar;
