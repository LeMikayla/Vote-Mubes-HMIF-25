import { Outlet } from "react-router-dom"; // Ini penting untuk merender child page
import Navbar from "../../shared/components/navbar/navbar"; // Sesuaikan path Navbar kamu

const MainLayout = () => {
  return (
    <div
      // 1. Container Mobile Style (Shared)
      className="w-full max-w-110 h-dvh flex flex-col font-sans mx-auto overflow-hidden px-4 pb-4 gap-4"
      // 2. Background Gradient (Shared)
      style={{
        background:
          "linear-gradient(135deg, #F0DEC1 0%, #F6E7D4 19%, #FAE1C8 63%, #F0CEB0 100%)",
      }}
    >
      {/* 3. Navbar (Shared) - Selalu muncul di atas */}
      <Navbar />

      {/* 4. Outlet - Disini tempat VotingPage atau ResultPage akan dirender */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
