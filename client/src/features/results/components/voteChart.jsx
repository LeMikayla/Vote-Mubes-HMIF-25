import Pillar from "./pillar";

// Helper untuk hitung tinggi dinamis
const getHeight = (value, minValue, maxValue) => {
  const minHeight = 45; // Tinggi visual terendah (px)
  const maxHeight = 215; // Tinggi visual tertinggi (px)

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

  return (
    <div className="w-full h-full relative p-4">
      {/* Y-axis labels (Garis Grid) - Dinaikkan ke bottom-22 */}
      <div className="absolute left-4 bottom-22 flex flex-col-reverse gap-3 z-0">
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

      {/* Axis Lines (Garis Sumbu Utama) - Dinaikkan ke bottom-14 */}
      <div className="absolute bg-[#F5AB39] rounded-sm w-1.5 h-56.25 bottom-14 left-11 z-10" />
      <div className="absolute bg-[#F5AB39] rounded-sm w-56.25 h-1.5 bottom-14 left-11 z-10" />

      {/* Pillars Container - Dinaikkan ke bottom-16 */}
      <div className="absolute bottom-16 left-13.5 flex items-end gap-4.75 z-20">
        {data.map((item, i) => (
          <Pillar
            key={i}
            height={getHeight(item.value, minValue, maxValue)}
            name={item.name}
            avatar={item.avatar}
          />
        ))}
      </div>

      {/* X-axis labels (Angka Vote) - Dinaikkan ke bottom-9 */}
      <div className="absolute bottom-9 left-13.5 flex gap-4.75 z-20">
        {data.map((item, i) => (
          <span
            key={i}
            className="text-white font-serif text-xs w-10.5 text-center font-bold opacity-80"
          >
            {item.xLabel}
          </span>
        ))}
      </div>

      {/* X-axis Title (Label Jumlah Vote dengan Style Kotak) */}
      <div className="absolute bottom-2 left-0 w-full flex justify-center z-30">
        <span
          className="
            text-[#F5AB39] 
            font-serif text-[10px] tracking-wider uppercase
            px-4 py-1.5       /* Jarak dalam kotak */
            rounded-full      /* Sudut Kapsul */
        "
        >
          Jumlah Vote
        </span>
      </div>
    </div>
  );
}
