const KurvaNavbar = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full aspect-440/170 z-0 overflow-hidden"
      style={{ maxWidth: "440px" }}
    >
      <svg
        className="w-full h-auto"
        viewBox="0 0 440 170"
        preserveAspectRatio="xMidYMin meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="0"
              floodColor="#F5AB39"
              floodOpacity="1"
            />
          </filter>
        </defs>
        <path
          d="M 0 0 L 440 0 L 440 138 Q 220 161 0 138 Z"
          fill="#9D1016"
          filter="url(#dropShadow)"
        />
      </svg>
    </div>
  );
};

export default KurvaNavbar;
