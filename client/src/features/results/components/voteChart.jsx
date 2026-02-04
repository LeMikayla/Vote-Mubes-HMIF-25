import Pillar from "./pillar";

// Helper untuk hitung tinggi dinamis
const getHeight = (value, minValue, maxValue) => {
  const minHeight = 45;
  const maxHeight = 130;

  if (maxValue === minValue) return minHeight;

  return (
    minHeight +
    ((value - minValue) / (maxValue - minValue)) * (maxHeight - minHeight)
  );
};

export default function VoteChart({ data }) {
  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values, 100);
  const minValue = Math.min(...values, 0);

  // 🔥 Dynamic sizing based on number of candidates
  const candidateCount = data.length;

  // Calculate pillar width: fewer candidates = wider pillars
  const pillarWidth =
    candidateCount <= 3
      ? 50
      : candidateCount === 4
        ? 42
        : candidateCount === 5
          ? 36
          : 32; // 6 candidates

  // Calculate gap: increased for better spacing
  const gap =
    candidateCount <= 3
      ? 32
      : candidateCount === 4
        ? 28
        : candidateCount === 5
          ? 24
          : 20; // 6 candidates

  // Calculate baseline width dynamically
  const baselineWidth =
    pillarWidth * candidateCount + gap * (candidateCount - 1) + 40;

  return (
    <div className="w-full h-full relative p-4">
      {/* BASELINE (Centered) - Dynamic width */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-[#F5AB39] rounded-sm h-1.5 z-10"
        style={{
          width: `${baselineWidth}px`,
          bottom: "48px",
        }}
      />

      {/* Pillars - Now aligned to baseline with flex-end */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-end z-20"
        style={{
          bottom: "54px", // Same as baseline - pillars sit ON the line
          gap: `${gap}px`,
        }}
      >
        {data.map((item, i) => (
          <Pillar
            key={i}
            height={getHeight(item.value, minValue, maxValue)}
            name={item.name}
            avatar={item.avatar}
            width={pillarWidth}
          />
        ))}
      </div>

      {/* Vote Numbers - Dynamic gap */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex z-20"
        style={{
          bottom: "32px",
          gap: `${gap}px`,
        }}
      >
        {data.map((item, i) => (
          <span
            key={i}
            className="text-white font-serif text-xs text-center font-bold"
            style={{ width: `${pillarWidth}px` }}
          >
            {item.xLabel}
          </span>
        ))}
      </div>

      {/* X-axis Title */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <span className="text-[#F5AB39] font-serif text-[10px] tracking-wider uppercase">
          Jumlah Vote
        </span>
      </div>
    </div>
  );
}
