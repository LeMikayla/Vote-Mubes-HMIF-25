const Header = ({ icon: Icon }) => {
  return (
    <div className="flex items-center justify-center gap-6 mb-5 mt-2.5">
      
      {/* LEFT ARROW */}
      <div className="relative w-22.5 h-3.5 shrink-0">
        <div
          className="absolute inset-0 bg-[#9D1016]"
          style={{ clipPath: "polygon(100% 50%, calc(100% - 8px) 0, 0 50%, calc(100% - 8px) 100%)" }}
        />
      </div>

      {/* DIAMOND WRAPPER */}
      <div className="relative w-17.5 h-17.5 flex items-center justify-center shrink-0">
        {/* Red Background */}
        <div
          className="absolute rotate-45 bg-[#9D1016]"
          style={{ width: "70px", height: "70px", borderRadius: "3.2px" }}
        />
        {/* Gold Border */}
        <div
          className="absolute rotate-45 border"
          style={{
            width: "62px",
            height: "62px",
            borderColor: "#F4AB39",
            borderWidth: "2px",
            borderRadius: "3.2px",
          }}
        />
        {/* Icon */}
        {Icon && (
          <Icon size={28} color="#FFF5EB" strokeWidth={2.5} className="relative z-10" />
        )}
      </div>

      {/* RIGHT ARROW */}
      <div className="relative w-22.5 h-3.5 shrink-0">
        <div
          className="absolute inset-0 bg-[#9D1016]"
          style={{ clipPath: "polygon(0 50%, 8px 0, 100% 50%, 8px 100%)" }}
        />
      </div>
    </div>
  );
};

export default Header;