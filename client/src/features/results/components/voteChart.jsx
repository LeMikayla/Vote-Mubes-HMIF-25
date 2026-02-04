import Pillar from "./pillar";

export default function VoteChart({ data, isFullSize = false }) {
  // --- KONFIGURASI TINGGI ---
  // Min Height User: 20px (Sangat pendek saat 0 vote)
  const minHeight = isFullSize ? 25 : 20;
  const maxHeight = isFullSize ? 450 : 130;

  const values = data.map((d) => d.value);
  const actualMax = Math.max(...values);
  const visualMax = Math.max(actualMax, 200);

  const getHeight = (value) => {
    const percentage = value / visualMax;
    return minHeight + percentage * (maxHeight - minHeight);
  };

  // --- KONFIGURASI LEBAR & JARAK (GAP) ---
  const candidateCount = data.length;
  let pillarWidth, gap;

  if (isFullSize) {
    // === ADMIN MODE (Layar Lebar) ===
    if (candidateCount <= 3) {
      pillarWidth = 75;
      gap = 112;
    } else if (candidateCount === 5) {
      pillarWidth = 54;
      gap = 84;
    } else if (candidateCount >= 6) {
      pillarWidth = 48;
      gap = 70;
    } else {
      pillarWidth = 63;
      gap = 98;
    }
  } else {
    // === USER MODE (HP) - Versi Lebih Kecil ===
    // Pilar dikecilkan (20px - 32px) agar avatar w-9 (36px) terlihat seimbang
    if (candidateCount <= 3) {
      pillarWidth = 32;
      gap = 48;
    } else if (candidateCount === 5) {
      pillarWidth = 24;
      gap = 32;
    } else if (candidateCount >= 6) {
      pillarWidth = 20;
      gap = 24;
    } else {
      pillarWidth = 30;
      gap = 40;
    } // Default 4 kandidat
  }

  // --- POSISI ELEMEN ---
  const baselineWidth =
    pillarWidth * candidateCount +
    gap * (candidateCount - 1) +
    (isFullSize ? 150 : 60);

  const baselineBottom = isFullSize ? 80 : 48;
  const pillarBottom = baselineBottom + (isFullSize ? 8 : 6);
  const numberBottom = baselineBottom - (isFullSize ? 35 : 16);
  const labelBottom = isFullSize ? 20 : 2;

  const axisLabel = "Jumlah Vote";

  return (
    <div className="w-full h-full relative p-4 flex justify-center items-end pb-4">
      {/* BASELINE */}
      <div
        className="absolute bg-[#F5AB39] rounded-sm z-10 transition-all duration-500"
        style={{
          width: `${baselineWidth}px`,
          height: isFullSize ? "8px" : "6px",
          bottom: `${baselineBottom}px`,
        }}
      />

      {/* PILLARS CONTAINER */}
      <div
        className="absolute flex items-end z-20 transition-all duration-500"
        style={{
          bottom: `${pillarBottom}px`,
          gap: `${gap}px`,
        }}
      >
        {data.map((item, i) => (
          <Pillar
            key={i}
            height={getHeight(item.value)}
            name={item.name}
            avatar={item.avatar}
            width={pillarWidth}
            isFullSize={isFullSize}
          />
        ))}
      </div>

      {/* ANGKA VOTE */}
      <div
        className="absolute flex z-20 transition-all duration-500"
        style={{
          bottom: `${numberBottom}px`,
          gap: `${gap}px`,
        }}
      >
        {data.map((item, i) => (
          <span
            key={i}
            className="text-white font-serif text-center font-bold"
            style={{
              width: `${pillarWidth}px`,
              fontSize: isFullSize ? "18px" : "10px", // Font angka juga dikecilkan (10px)
            }}
          >
            {item.xLabel}
          </span>
        ))}
      </div>

      {/* JUDUL AXIS */}
      <div
        className="absolute text-center"
        style={{ bottom: `${labelBottom}px` }}
      >
        <span
          className="text-[#F5AB39] font-serif tracking-wider uppercase"
          style={{ fontSize: isFullSize ? "14px" : "10px" }}
        >
          {axisLabel}
        </span>
      </div>
    </div>
  );
}
