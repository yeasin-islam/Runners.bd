import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navber from "../components/Navber";

const MainLayout = () => {
    return (
        <div className="popins">
            <Navber />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;