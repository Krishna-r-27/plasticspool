import { useState, useRef, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; 
const AppHeader = ({ onMenuClick }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // ✅ GLOBAL THEME (single source of truth)
    const { theme, setTheme } = useTheme();

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    const handleLogout = () => {
        // 1. Local storage se user ka data delete karo
        localStorage.removeItem("user");
        // localStorage.clear(); // Ya fir poora storage clear kar do agar zaroorat ho

        // 2. User ko login page par bhej do
        navigate("/poweradmin/signin");
    };
    return (
        <header
            className="
                h-16
                bg-white dark:bg-gray-900
                border-b border-gray-200 dark:border-gray-800
                flex items-center justify-between
                px-4 lg:px-6
                sticky top-0 z-40
            "
        >
            {/* LEFT */}
            <div className="flex items-center gap-3">
                {/* ☰ Menu Toggle */}
                <button
                    onClick={onMenuClick}
                    aria-label="Toggle sidebar"
                    className="
                        h-10 w-10 flex items-center justify-center
                        rounded-lg border
                        bg-white dark:bg-gray-800
                        text-gray-600 dark:text-gray-300
                        hover:bg-gray-50 dark:hover:bg-gray-700
                        transition
                    "
                >
                    <HiMenuAlt2 className="h-5 w-5" />
                </button>

                {/* Logo */}
                <span className="hidden sm:block font-semibold text-gray-800 dark:text-white">
                    PowerAdmin
                </span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                {/* 🌙 Theme Toggle */}
         

                {/* Profile */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                    <FaUser className="w-9 h-9 p-2 rounded-full border" />
                    <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-white pe-2">
                        Admin
                    </span> 
                </button>

                {/* Dropdown */}
                <div
                    className={`
                        absolute right-0 top-14 w-56
                        bg-white dark:bg-gray-800
                        rounded-xl shadow-lg border py-2
                        transition-all duration-200 origin-top
                        ${open
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-0 pointer-events-none"
                        }
                    `}
                >
                    {/*<div className="px-4 py-2 border-b border-gray-200 dark:border-gray-500">*/}
                    {/*    <p className="text-sm font-semibold">Admin</p>*/}
                    {/*    <p className="text-xs text-gray-500 dark:text-gray-300">*/}
                    {/*        admin@email.com*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    <div className="mt-2">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-500
                                       hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};  
export default AppHeader;
