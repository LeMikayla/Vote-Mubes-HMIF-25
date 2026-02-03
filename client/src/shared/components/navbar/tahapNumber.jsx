const TahapNumber = ({
  stepNumber,
  label,
  isActive,
  onClick,
  marginTop = 0,
}) => {
  const CIRCLE_SIZE = 19.49;
  const STROKE_WIDTH = 1.08;

  return (
    <div
      className="flex flex-col items-center relative z-10"
      style={{ width: "100px", marginTop: `${marginTop}px` }}
    >
      <button
        onClick={onClick}
        className="flex flex-col items-center cursor-pointer w-full"
      >
        <div
          className={`rounded-full flex items-center justify-center border transition-colors duration-300 ${
            isActive
              ? "bg-[#F7E5D1] text-[#8B1818]"
              : "bg-transparent text-[#F7E5D1]"
          }`}
          style={{
            width: `${CIRCLE_SIZE}px`,
            height: `${CIRCLE_SIZE}px`,
            borderWidth: `${STROKE_WIDTH}px`,
            borderColor: "#F7E5D1",
            marginBottom: "6px",
          }}
        >
          <span className="font-bold text-[8px] leading-none pt-px">
            {stepNumber === 1 ? "I" : stepNumber === 2 ? "II" : "III"}
          </span>
        </div>

        <span
          className={`uppercase tracking-widest text-center w-full ${
            isActive ? "font-bold" : ""
          }`}
          style={{ fontSize: "12.44px" }}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

export default TahapNumber;
