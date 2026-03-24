
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronIcon } from "./SidebarIcons";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoImagesOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { RiFileEditLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa6";
import  { IMAGE_BASE_URL } from "../../api/axios";
const baseItem =
    "group flex items-center gap-3 px-4 py-2.5 rounded-lg  font-medium transition-all duration-200";

const activeItem =
    "bg-indigo-50 text-indigo-600 shadow-sm";

const AppSidebar = ({ open, collapsed, onClose }) => {
    const [menuOpen, setMenuOpen] = useState({});

    const toggle = (key) => {
        setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    }; 
    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}

            <aside
                className={`
        fixed top-0 left-0 z-50 lg:static
        flex flex-col
        h-screen
        bg-white dark:bg-gray-900
        text-[#344054] dark:text-gray-100
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out

        ${collapsed ? "lg:w-[72px]" : "lg:w-[290px]"}
        w-[290px]

        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
    `}
            >

                <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-gray-200 dark:border-gray-800">
                    {/*  Icon (ONLY when collapsed) */}
                    <NavLink
                        to="/poweradmin/dashboard"
                        className="flex items-center justify-center w-full"
                    >

                        <img
                           
                            src={`${IMAGE_BASE_URL}/${"images/signin.png"}`}
                            alt="Logo Icon"
                            className={`
            h-9 w-12 transition-all
            ${collapsed ? "block" : "hidden"}
        `}
                        />

                        {/*                <img*/}
                        {/*                    src={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-logo.png`}*/}

                        {/*                    alt="Logo"*/}
                        {/*                    className={`*/}
                        {/*    h-10 w-auto transition-all ml-2*/}
                        {/*    ${collapsed ? "hidden" : "block"}*/}
                        {/*`}*/}
                        {/*                />*/}
                        <img
                            src={`${IMAGE_BASE_URL}/${"images/signin.png"}`}
                            alt="Logo"
                            className={`
                h-12 w-auto transition-all  /* h-10 se badha kar h-16 kar diya hai */
                mx-auto                     /* Horizontally center karne ke liye */
                ${collapsed ? "hidden" : "block"}
            `}
                        />
                    </NavLink>
                </div>
 
                {/* Menu */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden sidebar-hide-scroll">
                    <p className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {!collapsed && <span>Menu</span>}
                    </p>

                    {/* Dashboard */}
                    <NavLink
                        to="/poweradmin/dashboard"
                        className={({ isActive }) =>
                            `${baseItem} ${isActive ? activeItem : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
                        }
                    >
                        <HiOutlineSquares2X2 className="w-5 h-5" />
                        {!collapsed && <span>Dashboard</span>}
                    </NavLink>

                   
                    {/* Banner Management */}
                    {/*<button*/}
                    {/*    onClick={() => toggle("banner")}*/}
                    {/*    className={`${baseItem} w-full justify-between hover:bg-gray-100 dark:hover:bg-gray-800 mt-1`}*/}
                    {/*>*/}
                    {/*    <div className="flex items-center gap-3">*/}
                    {/*        <IoImagesOutline className="w-5 h-5" />*/}
                    {/*        {!collapsed && <span>Banner Management</span>}*/}
                    {/*    </div>*/}

                    {/*    {!collapsed && (*/}
                    {/*        <ChevronIcon*/}
                    {/*            className={`transition-transform ${menuOpen.banner ? "rotate-90" : ""}`}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</button>*/}

                    {/*{menuOpen.banner && !collapsed && (*/}
                    {/*    <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3 animate-fadeIn">*/}
                    {/*        <NavLink*/}
                    {/*            to="/poweradmin/banner/add"*/}
                    {/*            className={({ isActive }) =>*/}
                    {/*                `block px-3 py-2 rounded ${isActive*/}
                    {/*                    ? "bg-indigo-50 text-indigo-600"*/}
                    {/*                    : "hover:bg-indigo-50 hover:text-indigo-600"*/}
                    {/*                }`*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            Add Banner*/}
                    {/*        </NavLink>*/}

                    {/*        <NavLink*/}
                    {/*            to="/poweradmin/banner"*/}
                    {/*            end*/}
                    {/*            className={({ isActive }) =>*/}
                    {/*                `block px-3 py-2 rounded ${isActive*/}
                    {/*                    ? "bg-indigo-50 text-indigo-600"*/}
                    {/*                    : "hover:bg-indigo-50 hover:text-indigo-600"*/}
                    {/*                }`*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            View Banner*/}
                    {/*        </NavLink>*/}

                    {/*    </div>*/}
                    {/*)}*/}
                    {/* Blog Management */}
                    {/*<button*/}
                    {/*    onClick={() => toggle("blog")}*/}
                    {/*    className={`${baseItem} w-full justify-between hover:bg-gray-100 dark:hover:bg-gray-800 mt-1`}*/}
                    {/*>*/}
                    {/*    <div className="flex items-center gap-3">*/}
                    {/*        <RiFileEditLine className="w-5 h-5" />*/}
                    {/*        {!collapsed && <span>Blog Management</span>}*/}
                    {/*    </div>*/}

                    {/*    {!collapsed && (*/}
                    {/*        <ChevronIcon*/}
                    {/*            className={`transition-transform ${menuOpen.blog ? "rotate-90" : ""}`}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</button>*/}
                    {/*{menuOpen.blog && !collapsed && (*/}
                    {/*    <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3 animate-fadeIn">*/}
                    {/*        <NavLink*/}
                    {/*            to="/poweradmin/add-blog"*/}
                    {/*            className={({ isActive }) =>*/}
                    {/*                `block px-3 py-2 rounded ${isActive*/}
                    {/*                    ? "bg-indigo-50 text-indigo-600"*/}
                    {/*                    : "hover:bg-indigo-50 hover:text-indigo-600"*/}
                    {/*                }`*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            Add Blog*/}
                    {/*        </NavLink>*/}

                    {/*        <NavLink*/}
                    {/*            to="/poweradmin/view-blog"*/}
                    {/*            end*/}
                    {/*            className={({ isActive }) =>*/}
                    {/*                `block px-3 py-2 rounded ${isActive*/}
                    {/*                    ? "bg-indigo-50 text-indigo-600"*/}
                    {/*                    : "hover:bg-indigo-50 hover:text-indigo-600"*/}
                    {/*                }`*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            View Blogs*/}
                    {/*        </NavLink>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/* Category Management */}
                    <button
                        onClick={() => toggle("Category")}
                        className={`${baseItem} w-full justify-between hover:bg-gray-100 dark:hover:bg-gray-800 mt-1`}
                    >
                        <div className="flex items-center gap-3">
                            <RiFileEditLine className="w-5 h-5" />
                            {!collapsed && <span>Blog Management</span>}
                        </div>

                        {!collapsed && (
                            <ChevronIcon
                                className={`transition-transform ${menuOpen.Category ? "rotate-90" : ""}`}
                            />
                        )}
                    </button>
                    {menuOpen.Category && !collapsed && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3 animate-fadeIn">
                            <NavLink
                                to="/poweradmin/view-blog"
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                View Blogs
                            </NavLink>

                            <NavLink
                                to="/poweradmin/add-blog"
                                end
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                Add Blogs
                            </NavLink>
                        </div>
                    )}
                    {/* gallery Management */}
                     

                </nav>
            </aside>
        </>
    );
};

export default AppSidebar;
