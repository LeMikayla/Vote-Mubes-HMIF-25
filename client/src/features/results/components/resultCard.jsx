import VoteChart from "./chart/VoteChart";

export default function ResultCard({ chartData }) {
  const cs = 12; // Corner Size (Ukuran potongan sudut)

  // Definisi ClipPath agar tidak berulang
  const cardClipPath = `polygon(
    0 ${cs}px, ${cs}px ${cs}px, ${cs}px 0,
    calc(100% - ${cs}px) 0, calc(100% - ${cs}px) ${cs}px, 100% ${cs}px,
    100% calc(100% - ${cs}px), calc(100% - ${cs}px) calc(100% - ${cs}px),
    calc(100% - ${cs}px) 100%, ${cs}px 100%,
    ${cs}px calc(100% - ${cs}px), 0 calc(100% - ${cs}px)
  )`;

  return (
    <div className="w-full flex justify-center animate-fade-in">
      <div className="relative w-75 h-77.5">
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
          {/* Panggil Grafik Disini */}
          <VoteChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
