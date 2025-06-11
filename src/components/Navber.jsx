import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";


const Navbar = () => {
    const { logOut, user } = useContext(AuthContext);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const SunMun = <>
        <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox"
                onChange={handleToggle}
                checked={theme === "light" ? false : true}
                className="theme-controller" value="synthwave" />

            {/* sun icon */}
            <svg
                className="swap-off h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
                className="swap-on h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
        </label>
    </>


    return (
        <div className="popins bg-base-300">
            <div className="container mx-auto flex justify-between py-2 navbar">
                <div className="navbar-start gap-2">
                    <div className="bg-base-300 dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="bg-base-300 menu menu-sm dropdown-content bg-base-100 rounded z-50 mt-3 w-52 p-2 space-y-2 shadow"
                        >
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "text-indigo-500" : ""} to="/marathons">Marathons</NavLink>
                            </li>

                            {user ? (
                                <>
                                    <li>
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
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </ul>
                    </div>

                    <NavLink to="/">
                        <div className="flex justify-start items-center">
                            <p className="font-festive text-4xl lg:flex hidden  items-center font-bold text-[#ff1850] ">RunFlow</p>
                            <img className="h-11 w-16 lg:-ml-4" src="/assets/WebLogo.png" alt="RunFlow" />
                        </div>
                    </NavLink>
                </div>

                <div className="flex">
                    {user ? (
                        <>
                            <div className="navbar-center">
                                <ul className="flex items-center gap-3 px-1">
                                    <li className=" hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/">Home</NavLink></li>
                                    <li className=" hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/marathons">Marathons</NavLink></li>
                                    <li className=" hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/dashboard">Dashboard</NavLink></li>
                                    <li className="hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/profile">Profile</NavLink></li>
                                    <p>{SunMun}</p>
                                    <div className="relative group">
                                        {/* Avatar and trigger */}
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                                {user.photoURL ? (
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={user.photoURL}
                                                        alt="Profile"
                                                    />
                                                ) : (
                                                    <FaUserCircle className="w-full h-full " />
                                                )}
                                            </div>
                                        </div>

                                        {/* Hover menu */}
                                        <div className="absolute right-0 mt-2 bg-base-100 rounded-md shadow-lg p-4  w-56 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50"
                                            onMouseEnter={(e) => e.stopPropagation()}
                                            onMouseLeave={(e) => e.stopPropagation()}>
                                            <p className="font-semibold">{user.displayName || "No Name"}</p>
                                            <p className="text-xs opacity-70">{user.email || "No Email"}</p>
                                        </div>
                                    </div>
                                    <li>
                                        <button onClick={logOut} className="btn btn-error hidden lg:flex">
                                            Logout
                                        </button>
                                    </li>
                                    <li className="-ml-2">
                                        <button onClick={logOut} className="btn btn-error lg:hidden">
                                            <MdLogout />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar-center">
                                <ul className="flex items-center gap-3 px-1">
                                    <li className=" hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/">Home</NavLink></li>
                                    <li className=" hidden lg:flex"><NavLink className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    } to="/marathons">Marathons</NavLink></li>
                                    <p>{SunMun}</p>
                                    <li><NavLink className={({ isActive }) => isActive ? "bg-indigo-700 btn" : "btn btn-primary"} to="/login">Login</NavLink></li>
                                    <li><NavLink className={({ isActive }) => isActive ? "bg-indigo-700 btn" : "btn btn-primary"} to="/singup">SingUp</NavLink></li>
                                </ul>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;