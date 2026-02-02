const RomanCardFrame = ({ children, isActive, onClick, className = "" }) => {
  // Konstanta Geometri dipusatkan disini.
  // Jika ingin ubah bentuk, cukup ubah disini sekali saja.
  const cs = 16; // Corner Size
  const borderSize = 0.1;
  const innerInset = 13;

  // Helper untuk generate clip-path string biar gak copy-paste
  const getClipPath = (offset = 0) => `polygon(
    0 ${cs - offset}px,
    ${cs - offset}px ${cs - offset}px,
    ${cs - offset}px 0,
    calc(100% - ${cs - offset}px) 0,
    calc(100% - ${cs - offset}px) ${cs - offset}px,
    100% ${cs - offset}px,
    100% calc(100% - ${cs - offset}px),
    calc(100% - ${cs - offset}px) calc(100% - ${cs - offset}px),
    calc(100% - ${cs - offset}px) 100%,
    ${cs - offset}px 100%,
    ${cs - offset}px calc(100% - ${cs - offset}px),
    0 calc(100% - ${cs - offset}px)
  )`;

  const mainClip = getClipPath(0);
  const innerClip = getClipPath(borderSize);

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-500 ease-out origin-center
        ${isActive ? "scale-100 z-20" : "scale-[0.62] z-10"}
        ${className}
      `}
    >
      {/* 1. Background Layer (Gold Shadow) */}
      <div
        className="absolute w-full h-full bg-[#F4AB39]"
        style={{ top: "4px", clipPath: mainClip }}
      />

      {/* 2. Main Body (Red) */}
      <div
        className="w-full h-full bg-[#9D1016] shadow-xl overflow-hidden relative"
        style={{ clipPath: mainClip }}
      >
        {/* 3. Fake Border Layer (Gold) */}
        <div
          className="absolute inset-3 bg-[#F4AB39]"
          style={{ clipPath: mainClip }}
        />

        {/* 4. Inner Cutout (Red Background for content) */}
        <div
          className="absolute"
          style={{
            inset: `${innerInset}px`,
            background: "#9D1016",
            clipPath: innerClip,
          }}
        />

        {/* 5. Slot untuk Konten (Children) */}
        {children}
      </div>

      {/* 6. Inactive Overlay (Gelap kalau tidak dipilih) */}
      {!isActive && (
        <div
          className="absolute inset-0 bg-black/15 z-30 pointer-events-none"
          style={{ clipPath: mainClip }}
        />
      )}
    </div>
  );
};

export default RomanCardFrame;
