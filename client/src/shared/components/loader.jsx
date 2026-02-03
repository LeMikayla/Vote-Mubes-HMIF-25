const Loader = () => {
  // Kita definisikan style animasi keyframes di sini agar self-contained
  const keyframeStyle = `
    @keyframes soundWave {
      0%, 100% {
        transform: scaleY(0.5);
        opacity: 0.6;
      }
      50% {
        transform: scaleY(1.3);
        opacity: 1;
      }
    }
    
    .animate-sound-wave {
      animation: soundWave 1s ease-in-out infinite;
      transform-origin: center;
    }
  `;

  // Konfigurasi batang loader (jumlah dan delay antar batang)
  const bars = [0, 1, 2, 3, 4]; // 5 batang
  const delayStep = 0.1; // Jeda 0.1 detik antar batang

  return (
    // 1. Container Overlay (Full Screen, Semi-transparan)
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] transition-opacity">
      {/* Inject CSS Keyframes */}
      <style>{keyframeStyle}</style>

      {/* 2. Container Batang-batang */}
      <div className="flex items-center gap-1 h-16">
        {bars.map((index) => (
          <div
            key={index}
            // 3. Styling Batang (Warna Merah HMIF, bentuk rounded, dll)
            className="w-1.5 h-12 bg-[#9D1016] rounded-sm animate-sound-wave"
            // 4. Staggered Delay (Jeda bertingkat)
            style={{
              animationDelay: `${index * delayStep}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
