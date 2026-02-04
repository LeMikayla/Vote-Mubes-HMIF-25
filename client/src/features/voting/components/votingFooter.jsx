export default function VotingFooter({ isDisabled, isLoading, onVote }) {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-center shrink-0">
      <div className="flex items-center justify-center w-full mb-6">
        {/* Hiasan Kiri */}
        <div className="relative mr-4.25">
          <div className="bg-[#9D1016] h-2.5" style={{ width: "126px", clipPath: "polygon(0 50%, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%)" }} />
        </div>

        {/* Tombol Utama */}
        <button
          onClick={onVote}
          disabled={isDisabled}
          className={`relative w-16 h-16 focus:outline-none transition-transform active:scale-95 ${
            isDisabled ? "opacity-50 cursor-not-allowed grayscale" : ""
          }`}
        >
          <div className="absolute inset-0 rotate-45 rounded-[3px]" style={{ backgroundColor: "#9D1016", boxShadow: "0 0 6px #F4AB39" }} />
          <div className="absolute inset-0.75 rotate-45 rounded-[3px] border" style={{ borderColor: "#F4AB39", width: "57.98px", height: "57.98px", margin: "auto" }} />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="font-serif text-white text-sm tracking-widest">
              {isLoading ? "..." : "PILIH"}
            </span>
          </div>
        </button>

        {/* Hiasan Kanan */}
        <div className="relative ml-4.25">
          <div className="bg-[#9D1016] h-2.5" style={{ width: "126px", clipPath: "polygon(12px 0, 100% 50%, 12px 100%, 0 50%)" }} />
        </div>
      </div>
      
      <div className="text-[10px] text-gray-500 font-serif tracking-wider uppercase opacity-80">
        © HMIF 2025 - Semua Hak Dilindungi
      </div>
    </footer>
  );
}