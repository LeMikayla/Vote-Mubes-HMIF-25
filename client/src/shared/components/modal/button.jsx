const Button = ({
  onClick,
  variant = "primary",
  children,
  disabled = false,
}) => {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-serif text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        isPrimary ? "text-white" : "text-[#9D1016]"
      }`}
      style={{
        width: "96px",
        height: "40px",
        borderRadius: "3px",
        background: isPrimary ? "#9D1016" : "transparent",
        border: isPrimary ? "none" : "2px solid #9D1016",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
