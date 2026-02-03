const Pillar = ({ height, name, avatar }) => {
  return (
    <div
      className="flex flex-col items-center transition-all duration-500 ease-out"
      style={{ height: `${height}px`, width: "42px" }}
    >
      {/* Avatar on top */}
      <div className="flex flex-col items-center -mt-14 mb-1 shrink-0">
        <div className="w-12 h-12 rounded-full border-2 border-[#FFF5EB] overflow-hidden shadow-lg z-20 bg-white">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <span className="text-white text-xs font-serif mt-1 whitespace-nowrap drop-shadow-md">
          {name}
        </span>
      </div>

      {/* --- CAPITAL (The Top) --- */}
      <div className="w-full relative flex flex-col items-center shrink-0 z-10">
        <div className="w-[140%] h-1.5 bg-[#FFF5EB] rounded-[1px] shadow-sm mb-px" />
        <div className="w-full h-3 bg-[#FFF5EB] relative rounded-sm flex items-center justify-center">
          <div className="absolute -left-1.25 top-0.75 w-3 h-3 bg-[#FAD9B6] rounded-full shadow-inner" />
          <div className="absolute -right-1.25 top-0.75 w-3 h-3 bg-[#FAD9B6] rounded-full shadow-inner" />
        </div>
      </div>

      {/* --- SHAFT (The Body) --- */}
      <div className="w-full grow bg-[#FFF5EB] flex justify-center gap-1 pt-1 pb-0 relative shadow-inner">
        <div className="w-1.25 h-full bg-[#FAD9B6] opacity-80 rounded-sm" />
        <div className="w-1.25 h-full bg-[#FAD9B6] opacity-80 rounded-sm" />
        <div className="w-1.25 h-full bg-[#FAD9B6] opacity-80 rounded-sm" />
      </div>

      {/* --- BASE --- */}
      <div className="w-full relative flex flex-col items-center shrink-0">
        <div className="w-[120%] h-1.5 bg-[#FFF5EB] rounded-[1px] shadow-sm" />
        <div className="w-[140%] h-2 bg-[#FAD9B6] rounded-xs shadow-md" />
      </div>
    </div>
  );
};

export default Pillar;
