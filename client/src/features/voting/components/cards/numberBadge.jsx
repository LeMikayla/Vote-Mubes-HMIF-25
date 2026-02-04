import wreathImg from "../../../../assets/images/wreath.png";

const NumberBadge = ({ number }) => {
  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="relative w-22.75 h-22.75">
        {/* Shadow */}
        <div className="absolute inset-0 rounded-full bg-[#9D1016] translate-y-1.5" />

        {/* Main Body */}
        <div className="absolute inset-0 rounded-full bg-[#F8DDC3] flex mb-4 items-center justify-center">
          {/* Inner Border */}
          <div className="relative w-[84.5px] h-[84.5px] rounded-full border-2 border-[#F5AB39] overflow-hidden flex items-center justify-center bg-[#F8DDC3]">
            {/* --- GAMBAR WREATH (Hiasan) --- */}
            {/* Pastikan file 'wreath.png' ada di public/images/ */}
            <img
              src={wreathImg}
              alt="Wreath"
              className="absolute inset-0 w-full h-full object-contain p-1 opacity-60 z-0"
            />

            {/* --- ANGKA --- */}
            {/* z-10 agar angka muncul di atas gambar wreath */}
            <span className="relative z-10 font-roman text-4xl text-green-700 mb-4 font-bold drop-shadow-sm pt-1">
              {number}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberBadge;
