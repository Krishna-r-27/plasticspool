import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
//import { HashLink } from 'react-router-hash-link';
import Button from '../../ui/Button/Button';
import logoWebp from '../../../assets/img/plasticspool-hi-tech-plast-logo.webp';
import logoPng from '../../../assets/img/plasticspool-hi-tech-plast-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    const navItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about-us" },
        {
            label: "Products",
            dropdown: [
                { label: "Spools for Enameled Wires", path: "/products?tab=enameled" },
                { label: "Customized Spools", path: "/products?tab=customized" },
                { label: "Spools For Cable", path: "/products?tab=cable" },
                { label: "Spools For PU Pipes and Tubes", path: "/products?tab=pu-pipes" },
                { label: "Spools For Zipper", path: "/products?tab=spool" }
            ]
        },
        { label: "Blog", path: "/blog" },
        { label: "Contact Us", path: "/contact-us" }
    ];

    return (
        <>
            {/* Inline style added for guaranteed #002147 3px bottom border */}
            <nav
                style={{ borderBottom: '3px solid #002147' }}
                className="fixed top-0 left-0 w-full z-50 font-dmsans py-4 bg-[#ffffffcf] backdrop-blur-[6px] "
            >
                <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-4 flex-wrap">
                        <picture>
                            <source srcSet={logoWebp} type="image/webp" />
                            <img src={logoPng} alt="Hi-Tech Plast" className="h-[56px] w-[64px]" />
                        </picture>
                        <div className="flex flex-col text-start">
                            <span className="text-xl lg:text-2xl font-bold text-[#222222] leading-none tracking-tight font-unbounded">
                                Hi-Tech Plast
                            </span>
                            <span className="text-xxs lg:text-base font-semibold text-green capitalize  mt-1">
                                100% Recyclable Products
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-10">
                        <ul className="flex items-center gap-10">
                            {navItems.map((item) => (
                                <li key={item.label} className="relative group">

                                    {/* Normal Link */}
                                    {!item.dropdown ? (
                                        <NavLink
                                            to={item.path}
                                            className="text-base transition-all duration-300 hover:text-[#002147]"
                                        >
                                            {item.label}
                                        </NavLink>
                                    ) : (
                                        <>
                                            {/* Products Button with Icon */}
                                            <span className="cursor-pointer text-base flex items-center gap-1">
                                                {item.label}

                                                {/* Dropdown Icon */}
                                                <svg
                                                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>


                                            {/* Dropdown */}
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

                                                {item.dropdown.map((sub, index) => (
                                                    <NavLink
                                                        key={sub.label}
                                                        to={sub.path}
                                                        className={`block px-4 py-3 text-md text-secondary 
        hover:bg-[#002147] hover:text-white transition
        ${index !== item.dropdown.length - 1 ? 'border-b border-gray-200' : ''}`}
                                                    >
                                                        {sub.label}
                                                    </NavLink>
                                                ))}

                                            </div>
                                        </>
                                    )}

                                </li>
                            ))}
                        </ul>
                        <Button smooth to="/#calculator" label="Calculator" />
                    </div>

                    <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 text-[#222222]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Off-Canvas */}
            <div className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)} />

            <div
                style={{ borderLeft: '3px solid #002147' }}
                className={`fixed top-0 right-0 h-full w-[300px] z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col font-dmsans ${isOpen ? "translate-x-0" : "translate-x-full"} bg-[#ffffffcf] backdrop-blur-[10px] shadow-2xl`}
            >
                <div className="p-6 flex flex-wrap justify-between items-center sticky top-0 z-10">
                    <picture>
                        <source srcSet={logoWebp} type="image/webp" />
                        <img src={logoPng} alt="Menu Logo" className="h-[56px] w-[64px]" />
                    </picture>
                    <button onClick={() => setIsOpen(false)} className="text-3xl font-light text-gray-400 hover:text-[#002147]">&times;</button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <div className="px-6 flex flex-col gap-4 text-center py-8">
                        {navItems.map((item, index) => (
                            <div key={item.label} className="w-full text-center">

                                {/* Normal Link */}
                                {!item.dropdown ? (
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-base block py-2"
                                    >
                                        {item.label}
                                    </NavLink>
                                ) : (
                                    <>
                                        {/* Dropdown Toggle */}
                                        <button
                                            onClick={() =>
                                                setOpenDropdown(openDropdown === index ? null : index)
                                            }
                                            className="w-full flex items-center justify-center gap-2 py-2 text-base"
                                        >
                                            {item.label}

                                            {/* Arrow */}
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-300 
                        ${openDropdown === index ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>

                                        {/* Dropdown Items */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 
    ${openDropdown === index ? 'max-h-96 mt-2' : 'max-h-0'}`}
                                        >
                                            <div className="mx-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">

                                                {item.dropdown.map((sub, i) => (
                                                    <NavLink
                                                        key={sub.label}
                                                        to={sub.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block px-2 py-3 text-md text-secondary transition
                hover:bg-[#002147] hover:text-white
                ${i !== item.dropdown.length - 1 ? 'border-b border-gray-200' : ''}`}
                                                    >
                                                        {sub.label}
                                                    </NavLink>
                                                ))}

                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        ))}
                        <div className="pt-2 mx-auto">
                            <Button
                                to="/#calculator"
                                onClick={(e) => {
                                    // Mobile menu band karein
                                    setIsOpen(false);

                                    // Thoda wait karein taaki DOM update ho jaye (specially agar mobile menu open tha)
                                    setTimeout(() => {
                                        const element = document.getElementById('calculator');
                                        if (element) {
                                            const yOffset = -100; // Header height adjustment
                                            const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                                            window.scrollTo({
                                                top: yPosition,
                                                behavior: 'smooth'
                                            });
                                        } else {
                                            console.warn("Calculator element not found! Check if id='calculator' is in Home.jsx");
                                        }
                                    }, 100);
                                }}
                                label="Calculator"
                            />
                            {/*<Button to="/#calculator" onClick={() => setIsOpen(false)} label="Calculator" />*/}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[90px] lg:h-[90px]"></div>
        </>
    );
};

export default Navbar;