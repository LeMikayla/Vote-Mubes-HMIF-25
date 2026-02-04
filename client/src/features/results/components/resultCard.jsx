import VoteChart from "./voteChart";

export default function ResultCard({ chartData, isFullSize = false }) {
  const cs = 12; // Corner Size

  // --- LOGIKA LAMA (Untuk Tampilan User) ---
  const candidateCount = chartData.length;
  // Ini logika lebar manual yang Anda pakai sebelumnya
  const cardWidth =
    candidateCount <= 3
      ? 75
      : candidateCount === 4
        ? 80
        : candidateCount === 5
          ? 85
          : 90;

  // --- CLIP PATH (Sama untuk keduanya) ---
  const cardClipPath = `polygon(
    0 ${cs}px, ${cs}px ${cs}px, ${cs}px 0,
    calc(100% - ${cs}px) 0, calc(100% - ${cs}px) ${cs}px, 100% ${cs}px,
    100% calc(100% - ${cs}px), calc(100% - ${cs}px) calc(100% - ${cs}px),
    calc(100% - ${cs}px) 100%, ${cs}px 100%,
    ${cs}px calc(100% - ${cs}px), 0 calc(100% - ${cs}px)
  )`;

  // Tentukan Style berdasarkan Mode
  const containerClass = isFullSize
    ? "relative w-full h-full transition-all duration-500" // Mode Admin (Full)
    : "relative h-77.5 transition-all duration-500"; // Mode User (Fixed Height)

  const containerStyle = isFullSize
    ? {} // Mode Admin (Ikut Parent)
    : { width: `${cardWidth * 4}px` }; // Mode User (Lebar Manual)

  return (
    <div
      className={`flex justify-center animate-fade-in ${isFullSize ? "w-full h-full" : "w-full"}`}
    >
      <div className={containerClass} style={containerStyle}>
        {/* Layer 1: Drop Shadow */}
        <div
          className="absolute inset-0 bg-[#F5AB39] opacity-50 translate-y-2"
          style={{ clipPath: cardClipPath }}
        />

        {/* Layer 2: Border Background */}
        <div
          className="absolute inset-0 bg-[#F5AB39] z-10"
          style={{ clipPath: cardClipPath }}
        />

        {/* Layer 3: Main Gradient Content */}
        <div
          className="absolute overflow-hidden z-20"
          style={{
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
            background:
              "linear-gradient(180deg, #B5252B 0%, #D22E36 25%, #830E13 95%)",
            clipPath: `polygon(
              0 ${cs - 2}px, ${cs - 2}px ${cs - 2}px, ${cs - 2}px 0,
              calc(100% - ${cs - 2}px) 0, calc(100% - ${cs - 2}px) ${cs - 2}px, 100% ${cs - 2}px,
              100% calc(100% - ${cs - 2}px), calc(100% - ${cs - 2}px) calc(100% - ${cs - 2}px),
              calc(100% - ${cs - 2}px) 100%, ${cs - 2}px 100%,
              ${cs - 2}px calc(100% - ${cs - 2}px), 0 calc(100% - ${cs - 2}px)
            )`,
          }}
        >
          {/* Grafik Chart */}
          <div className="w-full h-full p-2">
            {/* 🔥 TAMBAHKAN PROPS isFullSize KE SINI */}
            <VoteChart data={chartData} isFullSize={isFullSize} />
          </div>
        </div>
      </div>
    </div>
  );
}
