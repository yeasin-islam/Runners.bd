import { useContext } from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {

    const { user } = useContext(AuthContext)

    return (
        <section className="bg-base-300 popins">
            <div className="fontJakarta container mx-auto">
                <footer className="justify-between gap-10 py-10 space-y-8 lg:flex ">
                    {/* Logo & Description */}
                    <div className="flex flex-col items-center sm:items-start">
                        <NavLink to="/" className="flex items-center">
                            <p className="webNameFont text-4xl font-[1000] text-primary">Runners.bd</p>
                            <img className="w-16 -ml-2 h-11" src="/assets/WebLogo.png" alt="Runners.bd" />
                        </NavLink>
                        <p className="max-w-xs mt-4 text-center sm:text-left">
                            Discover, apply, and manage marathons across the country - all from one simple, powerful platform built for runners like you.
                        </p>
                    </div>

                    {/* Browse Links */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h6 className="mb-2 font-bold footer-title">Browse</h6>
                        {
                            user ? (
                                <>
                                    <ul className="space-y-2 text-center sm:text-left">
                                        <li><NavLink className={({ isActive }) =>
                                            isActive ? "text-indigo-500" : ""
                                        } to="/">Home</NavLink></li>
                                        <li><NavLink className={({ isActive }) =>
                                            isActive ? "text-indigo-500" : ""
                                        } to="/marathons">All Marathon</NavLink></li>
                                        <li className="hidden lg:flex"><NavLink className={({ isActive }) =>
                                            isActive ? "text-indigo-500" : ""
                                        } to="/dashboard/my-marathons">Dashboard</NavLink></li>
                                        <li className="lg:hidden">
                                            <details>
                                                <summary className="cursor-pointer">Dashboard</summary>
                                                <ul className="pt-2 pl-2 space-y-1">
                                                    <li>
                                                        <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/dashboard/my-marathons">
                                                            My Marathon List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/dashboard/add-marathon">
                                                            Add Marathon
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
                                        } to="/marathons">All Marathon</NavLink></li>
                                    </ul>
                                </>
                            )
                        }
                    </div>


                    {/* Socile Media */}
                    <div className="flex flex-col items-center text-center sm:items-start">
                        <h6 className="font-bold footer-title">Follow Us</h6>
                        <div className="flex justify-center gap-4 mt-2 text-2xl sm:justify-start">
                            <a href="https://www.facebook.com/yeasin.islam2018" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://www.linkedin.com/in/yeasin-islam75" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                            <a href="https://x.com/yeasin_islam75" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>
                            <a href="https://www.youtube.com/@ProgrammingHero" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        </div>
                    </div>
                </footer>
                <hr className="container mx-auto" />
                <div className="poppins py-4 text-center flex flex-col-reverse items-center space-y-2 space-y-reverse lg:flex-row lg:justify-between lg:space-y-0">
                    <p className=" text-sm">
                        © {new Date().getFullYear()} – All rights reserved by Runners.bd.app
                    </p>
                    <ul className="flex justify-center gap-2 text-sm">
                        <li><a className="link link-hover">Terms of Use</a></li>
                        <li><a className="link link-hover">Privacy Policy</a></li>
                        <li><a className="link link-hover">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
        </section>

    );
};

export default Footer;
