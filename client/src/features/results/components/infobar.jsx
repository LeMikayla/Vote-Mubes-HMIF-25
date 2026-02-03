export default function InfoBar({ totalVotes, maxVotes, lastUpdated }) {
  return (
    <div className="w-full max-w-[320px] flex justify-between mb-6 -mx-2 px-4 animate-slide-up">
      <span className="text-[#9D1016] font-serif text-[13px]">
        Total suara: {totalVotes} / {maxVotes}
      </span>
      <span className="text-[#9D1016] font-serif text-[13px]">
        Update: {lastUpdated}
      </span>
    </div>
  );
}
