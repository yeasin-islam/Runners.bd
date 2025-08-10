import { useContext } from "react";
import { FaFacebook, FaGlobe, FaLinkedin, FaYoutube, FaHome, FaListUl, FaPlusCircle, FaClipboardList, FaUserCircle, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className="bg-base-300 popins">
            <div className="fontJakarta container mx-auto">
                <footer className="justify-between gap-10 py-10 space-y-8 lg:flex">

                    {/* Logo & Description */}
                    <div className="flex flex-col items-center sm:items-start">
                        <NavLink to="/" className="flex items-center gap-2">
                            <p className="webNameFont text-4xl font-[1000] text-primary">Runners.bd</p>
                            <img className="w-16 -ml-2 h-11" src="/assets/WebLogo.png" alt="Runners.bd" />
                        </NavLink>
                        <p className="max-w-xs mt-4 text-center sm:text-left">
                            Discover, apply, and manage marathons across the country — all from one simple, powerful platform built for runners like you.
                        </p>
                    </div>

                    {/* Browse Links */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h6 className="mb-2 font-bold footer-title">Browse</h6>
                        {user ? (
                            <ul className="space-y-2 text-center sm:text-left">
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/">
                                        <FaHome /> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/marathons">
                                        <FaListUl /> Marathons
                                    </NavLink>
                                </li>
                                <li className="hidden lg:flex">
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/dashboard/my-marathons">
                                        <MdDashboard /> Dashboard
                                    </NavLink>
                                </li>
                                <li className="lg:hidden">
                                    <details>
                                        <summary className="cursor-pointer">Dashboard</summary>
                                        <ul className="pt-2 pl-2 space-y-1">
                                            <li>
                                                <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/dashboard/my-marathons">
                                                    <FaListUl /> My Marathon List
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/dashboard/add-marathon">
                                                    <FaPlusCircle /> Add Marathon
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/dashboard/my-applications">
                                                    <FaClipboardList /> My Apply List
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/profile">
                                        <FaUserCircle /> Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/about">
                                        <FaInfoCircle /> About Us
                                    </NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="space-y-2 text-center sm:text-left">
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/">
                                        <FaHome /> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-2" : "flex items-center gap-2"} to="/about">
                                        <FaInfoCircle /> About Us
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Newsletter */}
                    {/* <div className="flex flex-col items-center text-center sm:items-start">
                        <h6 className="font-bold footer-title flex items-center gap-2">
                            <FaEnvelope /> Newsletter
                        </h6>
                        <p className="mt-2 text-sm max-w-xs">
                            Subscribe to get the latest marathon updates and tips delivered to your inbox.
                        </p>
                        <form className="flex flex-col w-full gap-2 mt-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded input input-bordered"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Subscribe
                            </button>
                        </form>
                    </div> */}

                    {/* Social Media */}
                    <div>
                        <div className="flex flex-col items-center text-center sm:items-start">
                            <h6 className="font-bold footer-title">Follow Us</h6>
                            <div className="flex justify-center gap-4 mt-2 text-2xl sm:justify-start">
                                <a href="https://www.facebook.com/yeasin.islam2018" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                                <a href="https://www.linkedin.com/in/yeasin-islam10" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                                <a href="https://x.com/yeasin_islam75" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>
                                <a href="https://yeasinislam08.web.app" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center sm:items-start">
                            <p className="mt-2 text-sm max-w-xs text-left">
                                Subscribe to get the latest marathon updates and tips delivered to your inbox.
                            </p>
                            <form className="flex flex-col w-full gap-2 mt-3 sm:flex-row p-2 md:p-0">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 rounded input input-bordered"
                                    required
                                />
                                <button type="submit" className="btn btn-primary">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </footer>

                <hr className="container mx-auto" />

                {/* Bottom Bar */}
                <div className="poppins py-4 text-center flex flex-col-reverse items-center space-y-2 space-y-reverse lg:flex-row lg:justify-between lg:space-y-0">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Runners.bd. All rights reserved.
                    </p>
                    <ul className="flex justify-center gap-2 text-sm">
                        <li>
                            <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-1" : "flex items-center gap-1"} to="/terms">
                                <FaGlobe /> Terms of Use
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-1" : "flex items-center gap-1"} to="/privacy">
                                <FaGlobe /> Privacy Policy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? "text-indigo-500 flex items-center gap-1" : "flex items-center gap-1"} to="/cookies">
                                <FaGlobe /> Cookie Policy
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Footer;
