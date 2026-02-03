const RomanInput = ({
  iconSrc,
  type = "text",
  placeholder,
  rightElement,
  ...props
}) => {
  return (
    <div className="relative w-71.75 h-12.5">
      {/* DIAMOND ICON WRAPPER */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12.5 h-12.5 z-20">
        <div className="absolute inset-0 rotate-45 border-2 border-black bg-black translate-y-1" />
        <div className="absolute inset-0 rotate-45 border-2 border-black bg-white overflow-hidden flex items-center justify-center">
          <img src={iconSrc} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* INPUT SVG BORDER */}
      <svg
        width="287"
        height="50"
        viewBox="0 0 287 50"
        className="absolute left-4.5"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 0 L 251 0 Q 251 8, 259 8 L 259 42 Q 251 42, 251 50 L 0 50 Z"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>

      {/* ACTUAL INPUT FIELD */}
      <div className="absolute left-18 right-4 h-full flex items-center gap-2">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[13px] text-gray-600 placeholder:text-gray-400"
          {...props}
        />
        {rightElement}
      </div>
    </div>
  );
};

export default RomanInput;
