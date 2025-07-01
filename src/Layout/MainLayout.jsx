import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navber from "../components/Navber";

const MainLayout = () => {
  return (
    <div className="popins flex flex-col min-h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navber />
      </div>

      {/* Content wrapper with padding top for navbar height */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
