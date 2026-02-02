import Pillar from "./pillar";

// Helper untuk hitung tinggi dinamis
const getHeight = (value, minValue, maxValue) => {
  const minHeight = 45; // Tinggi visual terendah (px)
  const maxHeight = 215; // Tinggi visual tertinggi (px)

  // Mencegah error jika data kosong atau sama
  if (maxValue === minValue) return minHeight;

  return (
    minHeight +
    ((value - minValue) / (maxValue - minValue)) * (maxHeight - minHeight)
  );
};

export default function VoteChart({ data }) {
  // Hitung min/max otomatis dari data yang masuk
  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values, 100); // Default max 100 biar ga error
  const minValue = Math.min(...values, 0);

  return (
    <div className="w-full h-full relative p-4">
      {/* Y-axis labels (Garis Grid) */}
      <div className="absolute left-4 bottom-17 flex flex-col-reverse gap-3 z-0">
        {[20, 50, 70, 100, 150, 200, 500].map((value) => (
          <div key={value} className="flex items-center">
            <span className="text-white font-serif text-xs w-6.5 text-right opacity-80">
              {value}
            </span>
            <div
              className="bg-[#F5AB39] rounded-sm ml-1.75"
              style={{ width: "240px", height: "2px", opacity: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Axis Lines (Garis Sumbu Utama) */}
      <div className="absolute bg-[#F5AB39] rounded-sm w-1.5 h-56.25 bottom-8.75 left-11 z-10" />
      <div className="absolute bg-[#F5AB39] rounded-sm w-56.25 h-1.5 bottom-8.75 left-11 z-10" />

      {/* Pillars Container */}
      <div className="absolute bottom-10.25 left-13.5 flex items-end gap-4.75 z-20">
        {data.map((item, i) => (
          <Pillar
            key={i}
            height={getHeight(item.value, minValue, maxValue)}
            name={item.name}
            avatar={item.avatar}
          />
        ))}
      </div>

      {/* X-axis labels (Angka Vote) */}
      <div className="absolute bottom-3 left-13.5 flex gap-4.75 z-20">
        {data.map((item, i) => (
          <span
            key={i}
            className="text-white font-serif text-xs w-10.5 text-center font-bold"
          >
            {item.xLabel}
          </span>
        ))}
      </div>

      {/* X-axis Title */}
      <div className="absolute bottom-0 left-33.75 flex justify-center">
        <span className="text-[#F5AB39] font-serif text-[10px] tracking-wider uppercase">
          Jumlah Vote
        </span>
      </div>
    </div>
  );
}
