const WreathIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path
      d="M50,85 C30,80 15,60 15,40 C15,30 20,20 25,20"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M50,85 C70,80 85,60 85,40 C85,30 80,20 75,20"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Stylized leaves */}
    <circle cx="20" cy="40" r="3" />
    <circle cx="18" cy="50" r="3" />
    <circle cx="22" cy="60" r="3" />
    <circle cx="30" cy="70" r="3" />
    <circle cx="40" cy="78" r="3" />

    <circle cx="80" cy="40" r="3" />
    <circle cx="82" cy="50" r="3" />
    <circle cx="78" cy="60" r="3" />
    <circle cx="70" cy="70" r="3" />
    <circle cx="60" cy="78" r="3" />
  </svg>
);

export default WreathIcon;
