const DiamondIcon = ({ filled, className = "" }) => (
  <div
    className={`transform rotate-45 w-3 h-3 border border-royal-red ${
      filled ? "bg-royal-red" : "bg-transparent"
    } ${className}`}
  />
);

export default DiamondIcon;
