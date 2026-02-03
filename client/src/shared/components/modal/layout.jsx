import Background from "./background";   // File Panel Geometri
import Header from "./header"; // File Ikon Hiasan

const Layout = ({ icon, children }) => {
  return (
    <Background>
      <div className="flex flex-col items-center text-center px-6 gap-5 w-full h-full justify-center pt-2">
        {/* Bagian Header (Ikon) */}
        <DecorativeHeader icon={icon} />
        
        {/* Bagian Konten (Teks & Tombol) */}
        {children}
      </div>
    </Background>
  );
};

// Helper kecil agar nama import di file lain tetap 'DecorativeHeader' kalau mau
const DecorativeHeader = Header; 

export default Layout;