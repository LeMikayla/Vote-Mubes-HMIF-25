const GarisKonektor = () => {
  const ANGLE = 4.94;
  const LINE_WIDTH = 109.5;
  const CIRCLE_SIZE = 19.49;
  const STROKE_WIDTH = 1.08;

  const DROP_Y = Math.tan(ANGLE * (Math.PI / 180)) * LINE_WIDTH;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ top: `${CIRCLE_SIZE * 0.45}px` }}
    >
      <div
        className="bg-[#F7E5D1]"
        style={{
          height: `${STROKE_WIDTH}px`,
          width: `${LINE_WIDTH}px`,
          position: "absolute",
          left: "50%",
          marginLeft: `-${LINE_WIDTH + 15}px`,
          transform: `rotate(${ANGLE}deg)`,
          transformOrigin: "center right",
          top: `${DROP_Y * 0.95}px`,
        }}
      />
      <div
        className="bg-[#F7E5D1]"
        style={{
          height: `${STROKE_WIDTH}px`,
          width: `${LINE_WIDTH}px`,
          position: "absolute",
          left: "50%",
          marginLeft: "15px",
          transform: `rotate(-${ANGLE}deg)`,
          transformOrigin: "center left",
          top: `${DROP_Y * 0.95}px`,
        }}
      />
    </div>
  );
};

export default GarisKonektor;
