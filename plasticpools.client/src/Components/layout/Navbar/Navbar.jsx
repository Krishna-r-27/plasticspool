import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Button from '../../ui/Button/Button';
import logoWebp from '../../../assets/img/plasticspool-hi-tech-plast-logo.webp';
import logoPng from '../../../assets/img/plasticspool-hi-tech-plast-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    const navItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about-us" },
        { label: "Products", path: "/products" },
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
                                <li key={item.label}>
                                    <NavLink
                                        to={item.path}
                                        style={({ isActive }) => ({
                                            color: isActive ? '#002147' : '',
                                            boxShadow: isActive ? '0 2px 0 0 #002147' : '',
                                            transform: isActive ? 'translateY(-4px)' : ''
                                        })}
                                        className={({ isActive }) =>
                                            `text-base transition-all duration-300 ease-in-out inline-block py-1
                                            ${!isActive && 'text-grayText font-normal hover:text-[#002147] hover:-translate-y-1 hover:shadow-[0_2px_0_0_#002147]'}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <Button smooth to="/#calculator"  label="Calculator" />
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
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                style={({ isActive }) => ({
                                    color: isActive ? '#002147' : '',
                                    boxShadow: isActive ? '0 2px 0 0 #002147' : ''
                                })}
                                className="text-base block transition-all duration-300 mx-auto w-fit pb-1"
                            >
                                {item.label}
                            </NavLink>
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