import React from 'react';
import { Link } from 'react-router-dom'; // Home link ke liye

// Banner Assets yahan import karein (Global use ke liye)
import bannerBgWebp from '../../../assets/img/plasticspool-hi-tech-plast-inner-banner.webp';
import bannerBgPng from '../../../assets/img/plasticspool-hi-tech-plast-inner-banner.png';

const InnerBanner = ({ title, breadcrumb }) => {
    return (
        <section className="relative w-full py-15 md:py-28 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Layer with PNG + WebP Combo (Directly inside component) */}
            <picture className="absolute inset-0 w-full h-full">
                <source srcSet={bannerBgWebp} type="image/webp" />
                <img
                    src={bannerBgPng}
                    alt="Banner Background"
                    className="w-full h-full object-cover"
                />
            </picture>

            {/* Subtle Overlay for better text visibility */}
            <div className="absolute inset-0  "></div>

            {/* Content Section */}
            <div className="relative z-10 px-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 md:mb-4 text-[#FFE135]  capitalize ">
                    {title}
                </h1>

                <nav className="text-white text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                    {/* Link to Home */}
                    <Link
                        to="/"
                        className="hover:text-[#FFE135] transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-[#FFE135]"
                    >
                        Home
                    </Link>

                    <span className="text-gray-300">/</span>

                    <span className="opacity-90">{breadcrumb}</span>
                </nav>
            </div>
        </section>
    );
};

export default InnerBanner;