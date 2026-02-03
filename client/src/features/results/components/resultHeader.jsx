import { RefreshCw } from "lucide-react";

export default function ResultHeader({ timeLeftText, onRefresh }) {
  return (
    <div className="flex flex-col items-start gap-3 w-full animate-fade-in">
      <div className="w-full text-center mb-3">
        <h1 className="font-serif text-[20px] font-bold text-gray-800 tracking-wide uppercase mb-2">
          Pemilihan Ketua HMIF
        </h1>

        <div className="text-royal-red font-bold text-[14px] tracking-wide">
          Voting ditutup dalam{" "}
          <span className="font-mono ml-1">{timeLeftText}</span>
        </div>
      </div>

      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-3 py-1.5 border self-center rounded-[3.2px] border-[#9D1016] hover:bg-[#9D1016]/5 transition-colors active:scale-95"
      >
        <RefreshCw
          size={14}
          color="#9D1016"
          strokeWidth={1.6}
          className="shrink-0"
        />
        <span className="text-center leading-tight text-[#9D1016] font-serif text-[13px]">
          Perbarui catatan suara
        </span>
      </button>
    </div>
  );
}
