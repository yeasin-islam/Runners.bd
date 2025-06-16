import { useContext } from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {

    const { user } = useContext(AuthContext)

    return (
        <section className="bg-base-300 popins">
            <div className="container mx-auto">
                <footer className="justify-between gap-10 py-10 space-y-8 lg:flex ">
                    {/* Logo & Description */}
                    <div className="flex flex-col items-center sm:items-start">
                        <NavLink to="/" className="flex items-center">
                            <p className="font-festive text-4xl flex items-center font-bold text-primary ">RunFlow</p>
                            <img className="w-16 -ml-4 h-11" src="/assets/WebLogo.png" alt="RunFlow" />
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
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                            <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        </div>
                    </div>
                </footer>
                <hr className="container mx-auto" />
                <div className="items-center py-4 space-y-2 text-center lg:justify-between lg:flex">
                    <p className=" text-md">
                        © {new Date().getFullYear()} – All rights reserved by RunFlow.com
                    </p>
                    <ul className="flex justify-center gap-2 sm:text-left">
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
