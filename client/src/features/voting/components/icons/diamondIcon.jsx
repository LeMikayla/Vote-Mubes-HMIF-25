const DiamondIcon = ({ filled, className = "" }) => (
  <div
    className={`
      transform rotate-45 w-3 h-3 border border-[#9D1016]
      ${filled ? "bg-[#9D1016]" : "bg-transparent"}
      ${className}
    `}
  />
);

export default DiamondIcon;
