"use client";
import { useNavigate, useLocation } from "react-router-dom";
import KurvaNavbar from "./kurvaNavbar";
import TahapNumber from "./tahapNumber";
import GarisKonektor from "./garisKonektor";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logic: Menentukan step aktif berdasarkan URL
  const getCurrentStep = () => {
    if (location.pathname === "/") return 1;
    if (location.pathname === "/votes") return 2;
    if (location.pathname === "/results") return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  // Konstanta Layout (Untuk efek turun tangga step ke-2)
  const ANGLE = 4.94;
  const LINE_WIDTH = 109.5;
  const DROP_Y = Math.tan(ANGLE * (Math.PI / 180)) * LINE_WIDTH;

  return (
    <div
      className="relative w-full text-white shrink-0"
      style={{
        marginLeft: "-1rem",
        marginRight: "-1rem",
        width: "calc(100% + 2rem)",
        maxWidth: "440px",
      }}
    >
      {/* 1. BACKGROUND SVG */}
      <KurvaNavbar />

      {/* 2. CONTENT CONTAINER */}
      <div className="relative flex flex-col items-center w-full pt-14.5 -translate-y-1.5">
        {/* Title */}
        <h2 className="uppercase tracking-[0.2em] font-bold text-[#F7E5D1] text-[12px] mb-4">
          Pilih Tahap
        </h2>

        {/* Steps Wrapper */}
        <div className="relative w-93.75 h-13 mx-auto">
          <div className="flex items-start justify-between w-full h-full relative">
            {/* STEP 1: LOGIN */}
            <TahapNumber
              stepNumber={1}
              label="Login"
              isActive={currentStep === 1}
              onClick={() => navigate("/")}
            />

            {/* 3. LINES (Garis Penghubung) */}
            <GarisKonektor />

            {/* STEP 2: VOTE (Ada margin top karena efek V shape) */}
            <TahapNumber
              stepNumber={2}
              label="Vote"
              isActive={currentStep === 2}
              onClick={() => navigate("/votes")}
              marginTop={DROP_Y * 0.6}
            />

            {/* STEP 3: LIVE COUNT */}
            <TahapNumber
              stepNumber={3}
              label="Live Count"
              isActive={currentStep === 3}
              onClick={() => navigate("/results")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
