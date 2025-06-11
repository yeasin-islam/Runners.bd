import { useContext } from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className="bg-base-300 popins">
            <footer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 container mx-auto">
                {/* Logo & Description */}
                <div className="flex flex-col items-center sm:items-start">
                    <NavLink to="/" className="flex items-center">
                        <p className="font-festive text-4xl flex items-center font-bold text-[#ff1850] ">RunFlow</p>
                        <img className="h-11 w-16 -ml-4" src="/assets/WebLogo.png" alt="RunFlow" />
                    </NavLink>
                    <p className="mt-4 text-center sm:text-left max-w-xs">
                        Discover, apply, and manage marathons across the country - all from one simple, powerful platform built for runners like you.
                    </p>
                </div>

                {/* Browse Links */}
                <div className="flex flex-col items-center sm:items-start">
                    <h6 className="footer-title font-bold mb-2">Browse</h6>
                    {
                        user ? (
                            <>
                                <ul className="space-y-2 text-center sm:text-left">
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/">Home</NavLink></li>
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/marathons">Marathons</NavLink></li>
                                    <li className="hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/dashboard">Dashboard</NavLink></li>
                                    <li className="lg:hidden">
                                        <details>
                                            <summary className="cursor-pointer">Dashboard</summary>
                                            <ul className="pl-4">
                                                <li>
                                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/dashboard/add-marathon">
                                                        Add Marathon
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/dashboard/my-marathons">
                                                        My Marathon List
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/dashboard/my-applications">
                                                        My Apply List
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/profile">Profile</NavLink></li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul className="space-y-2 text-center sm:text-left">
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/">Home</NavLink></li>
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/marathons">Marathons</NavLink></li>
                                </ul>
                            </>
                        )
                    }
                </div>

                {/* Legal & Social */}
                <div className="flex flex-col items-center sm:items-start">
                    <h6 className="footer-title font-bold mb-2">Legal</h6>
                    <ul className="space-y-2 text-center sm:text-left">
                        <li><a className="link link-hover">Terms of Use</a></li>
                        <li><a className="link link-hover">Privacy Policy</a></li>
                        <li><a className="link link-hover">Cookie Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col items-center sm:items-start">
                    <h6 className="footer-title font-bold mt-4">Follow Us</h6>
                    <div className="flex gap-4 text-2xl mt-2 justify-center sm:justify-start">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>
            </footer>
            <hr className="container mx-auto" />
            <p className="text-center py-6 text-md">
                © {new Date().getFullYear()} – All rights reserved by RunFlow.com
            </p>
        </div>
    );
};

export default Footer;
