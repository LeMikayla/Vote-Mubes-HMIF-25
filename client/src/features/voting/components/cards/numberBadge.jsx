const NumberBadge = ({ numberImage = "/images/number.png" }) => {
  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="relative w-22.75 h-22.75">
        {/* Shadow */}
        <div className="absolute inset-0 rounded-full bg-[#9D1016] translate-y-1.5" />

        {/* Main Body */}
        <div className="absolute inset-0 rounded-full bg-[#F8DDC3] flex items-center justify-center">
          {/* Inner Border */}
          <div className="w-[84.5px] h-[84.5px] rounded-full border-2 border-[#F5AB39] overflow-hidden flex items-center justify-center">
            <img
              src={numberImage}
              className="w-full h-full object-cover"
              alt="Nomor Urut"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberBadge;
