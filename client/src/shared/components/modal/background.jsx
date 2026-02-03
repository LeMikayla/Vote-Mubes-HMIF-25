const Background = ({ children, width = 375, height = 286, className = "" }) => {
  const step = 12;
  const outerW = width;
  const outerH = height;
  
  // Ukuran dalam (inner) disesuaikan agar border terlihat rapi
  const innerW = outerW - 13; 
  const innerH = outerH - 9; 

  // Function builds staircase path
  const buildPath = (w, h, s) => `
    M0 ${s * 3} L${s} ${s * 3} L${s} ${s * 2} L${s * 2} ${s * 2} L${s * 2} ${s} L${s * 3} ${s} L${s * 3} 0
    L${w - s * 3} 0 L${w - s * 3} ${s} L${w - s * 2} ${s} L${w - s * 2} ${s * 2} L${w - s} ${s * 2} L${w - s} ${s * 3} L${w} ${s * 3}
    L${w} ${h - s * 3} L${w - s} ${h - s * 3} L${w - s} ${h - s * 2} L${w - s * 2} ${h - s * 2} L${w - s * 2} ${h - s} L${w - s * 3} ${h - s} L${w - s * 3} ${h}
    L${s * 3} ${h} L${s * 3} ${h - s} L${s * 2} ${h - s} L${s * 2} ${h - s * 2} L${s} ${h - s * 2} L${s} ${h - s * 3} L0 ${h - s * 3} Z
  `;

  const outerPath = buildPath(outerW, outerH, step);
  const innerPath = buildPath(innerW, innerH, step);

  return (
    <div className={`relative ${className}`} style={{ width: outerW, height: outerH }}>
      {/* 1. Drop Shadow (Dark Red) */}
      <svg width={outerW} height={outerH} className="absolute" style={{ top: 6, left: 0 }}>
        <path d={outerPath} fill="#9A2A2F" />
      </svg>

      {/* 2. Main Background (Beige) */}
      <svg width={outerW} height={outerH} className="absolute inset-0">
        <path d={outerPath} fill="#F5E6D3" />
      </svg>

      {/* 3. Inner Border (Gold) */}
      <svg
        width={innerW}
        height={innerH}
        className="absolute"
        style={{
          top: (outerH - innerH) / 2, // Center vertical
          left: (outerW - innerW) / 2, // Center horizontal
        }}
      >
        <path d={innerPath} fill="none" stroke="#F5AB39" strokeWidth="2" />
      </svg>

      {/* 4. Content Area */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};

export default Background;