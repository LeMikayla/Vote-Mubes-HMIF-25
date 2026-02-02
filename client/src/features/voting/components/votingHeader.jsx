export default function VotingHeader({ timeLeftText }) {
  return (
    <div className="text-center mb-4 shrink-0">
      <h1 className="font-serif text-[20px] font-bold text-gray-800 tracking-wide uppercase mb-2">
        Pemilihan Ketua HMIF
      </h1>
      <div className="text-royal-red font-bold text-[14px] tracking-wide inline-block">
        Voting ditutup dalam{" "}
        <span className="font-mono text-[14px] ml-1">{timeLeftText}</span>
      </div>
    </div>
  );
}