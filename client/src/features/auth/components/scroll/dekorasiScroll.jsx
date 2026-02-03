import Paper from "../../../../assets/images/paper.png";

const DekorasiScroll = () => {
  return (
    <div className="flex items-center justify-center gap-0 filter drop-shadow-md">
      {/* LEFT CAP */}
      <div className="relative w-3 h-9 -right-1.5">
        <svg
          viewBox="0 0 40 120"
          className="absolute top-0 left-[3.125px] w-full h-full"
          preserveAspectRatio="none"
        >
          <path d="M30 0 Q10 60 30 120 L10 120 Q0 60 10 0 Z" fill="#F4AB39" />
        </svg>
        <svg
          viewBox="0 0 40 120"
          className="absolute w-[70%] h-[70%] left-[1.875px] top-[5.3125px]"
          preserveAspectRatio="none"
        >
          <path d="M30 0 Q10 60 30 120 L10 120 Q0 60 10 0 Z" fill="#F4AB39" />
        </svg>
      </div>

      {/* CENTER BODY */}
      <div
        className="w-93.5 h-7.5 rounded-[9.3px] overflow-hidden relative"
        style={{
          backgroundImage: `url('${Paper}')`, // Pastikan path asset benar
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: `inset 0 6px 10px rgba(0,0,0,0.25), inset 0 -6px 10px rgba(0,0,0,0.25)`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-white/20 blur-[2px]" />
      </div>

      {/* RIGHT CAP */}
      <div className="relative w-3 h-9 rotate-180 -left-1.5">
        <svg
          viewBox="0 0 40 120"
          className="absolute top-0 left-[3.125px] w-full h-full"
          preserveAspectRatio="none"
        >
          <path d="M30 0 Q10 60 30 120 L10 120 Q0 60 10 0 Z" fill="#F4AB39" />
        </svg>
        <svg
          viewBox="0 0 40 120"
          className="absolute w-[70%] h-[70%] left-[1.875px] top-[5.3125px]"
          preserveAspectRatio="none"
        >
          <path d="M30 0 Q10 60 30 120 L10 120 Q0 60 10 0 Z" fill="#F4AB39" />
        </svg>
      </div>
    </div>
  );
};

export default DekorasiScroll;
