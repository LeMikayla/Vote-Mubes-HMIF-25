import RomanCardFrame from "./romanCardFrame";
import NumberBadge from "./numberBadge";

const CandidateCard = ({ candidate, isActive, onClick }) => {
  const contentInset = 13;
  const cs = 16; // Masih perlu ini hanya untuk clipPath konten, atau bisa dipindah ke CSS class

  // Kita definisikan ulang clipPath simple untuk konten agar tidak bocor keluar frame
  // Atau lebih baik lagi: biarkan konten overflow hidden di dalam frame.
  const contentClipPath = `polygon(
      0 ${cs}px, ${cs}px ${cs}px, ${cs}px 0, calc(100% - ${cs}px) 0,
      calc(100% - ${cs}px) ${cs}px, 100% ${cs}px, 100% calc(100% - ${cs}px),
      calc(100% - ${cs}px) calc(100% - ${cs}px), calc(100% - ${cs}px) 100%,
      ${cs}px 100%, ${cs}px calc(100% - ${cs}px), 0 calc(100% - ${cs}px)
  )`;

  return (
    <RomanCardFrame isActive={isActive} onClick={onClick} className="w-45 h-85">
      {/* BAGIAN KONTEN (Top Layer) */}
      <div
        className="absolute z-20 flex flex-col pt-8 overflow-hidden"
        style={{
          inset: `${contentInset}px`,
          clipPath: contentClipPath,
        }}
      >
        {/* Nama Kandidat */}
        <h3 className="font-display text-gold-light text-2xl tracking-wide text-center px-4 leading-tight mb-2">
          {candidate.name}
        </h3>

        {/* Quote */}
        <p className="font-serif italic text-gold-accent/80 text-[10px] text-center px-6 mb-4">
          "{candidate.vision}"
        </p>

        {/* Foto Kandidat */}
        <div className="flex-1 w-full relative mt-2">
          <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-royal-red to-transparent z-10" />
          <img
            src={
              candidate.image_url
                ? `${import.meta.env.VITE_STATIC_BASE_URL}${candidate.image_url}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}`
            }
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* BAGIAN BADGE NOMOR */}
      <NumberBadge
        numberImage={candidate.numberImageUrl || "/images/number.png"}
      />
    </RomanCardFrame>
  );
};

export default CandidateCard;
