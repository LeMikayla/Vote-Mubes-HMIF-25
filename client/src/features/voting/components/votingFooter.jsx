export default function VotingFooter({ isDisabled, isLoading, onVote }) {
  return (
    <footer className="flex flex-col items-center justify-center shrink-0">
      <div className="flex items-center justify-center w-full mb-4">
        {/* Left decoration */}
        <div className="relative mr-[14px]">
          <div
            className="bg-[#9D1016] h-[8px]"
            style={{
              width: "110px",
              clipPath:
                "polygon(0 50%, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%)",
            }}
          />
        </div>

        {/* Main button */}
        <button
          onClick={onVote}
          disabled={isDisabled}
          className={`relative w-[56px] h-[56px] focus:outline-none transition-transform active:scale-95 ${
            isDisabled ? "opacity-50 cursor-not-allowe  d grayscale" : ""
          }`}
        >
          <div
            className="absolute inset-0 rotate-45 rounded-[3px]"
            style={{
              backgroundColor: "#9D1016",
              boxShadow: "0 0 6px #F4AB39",
            }}
          />
          <div
            className="absolute inset-[2.5px] rotate-45 rounded-[3px] border"
            style={{
              borderColor: "#F4AB39",
              width: "50.5px",
              height: "50.5px",
              margin: "auto",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="font-serif text-white text-xs tracking-widest">
              {isLoading ? "..." : "PILIH"}
            </span>
          </div>
        </button>

        {/* Right decoration */}
        <div className="relative ml-[14px]">
          <div
            className="bg-[#9D1016] h-[8px]"
            style={{
              width: "110px",
              clipPath: "polygon(10px 0, 100% 50%, 10px 100%, 0 50%)",
            }}
          />
        </div>
      </div>

      <div className="text-[10px] text-gray-500 font-serif tracking-wider uppercase opacity-60">
        © HMIF 2025 - Semua Hak Dilindungi
      </div>
    </footer>
  );
}
