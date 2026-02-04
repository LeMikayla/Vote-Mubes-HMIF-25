export default function VotingHeader({ timeLeftText }) {
  return (
    <div className="text-center mb-2 shrink-0">
      <h1 className="font-serif text-[16px] font-bold text-gray-800 tracking-wide uppercase mb-1">
        Pemilihan Ketua HMIF
      </h1>
      <div className="text-royal-red font-bold text-[12px] tracking-wide inline-block">
        Voting ditutup dalam{" "}
        <span className="font-mono text-[12px] ml-1">{timeLeftText}</span>
      </div>
    </div>
  );
}
