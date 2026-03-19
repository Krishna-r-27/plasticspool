import React from 'react';
import Button from '../../ui/Button/Button';

// Image imports using your specified naming
import bannerWebp from '../../../assets/img/welcome-to-hi-tech-plast.webp';
import bannerPng from '../../../assets/img/welcome-to-hi-tech-plast.png';

const HomeBanner = () => {
    return (
        <section
            className="relative w-full flex items-center bg-cover bg-center bg-no-repeat overflow-hidden py-20 lg:py-36 "
            style={{
                /* WebP format performance ke liye best hai. 
                   Hum modern browsers ke liye WebP aur fallback ke liye PNG use kar rahe hain. 
                */
                backgroundImage: `linear-gradient(to right, rgba(0, 21, 47, 0.85) 15%, rgba(0, 0, 0, 0.2) 100%), url(${bannerWebp})`,
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Fallback for browsers that might struggle with CSS-based WebP background */}
            <div className="hidden">
                <picture>
                    <source srcSet={bannerWebp} type="image/webp" />
                    <img src={bannerPng} alt="Banner Fallback" />
                </picture>
            </div>

            <div className="container text-center lg:text-start relative z-10">
                <div className="space-y-6 lg:space-y-6">

                    {/* Welcome Text using primary #FDF14A */}
                    <p className="text-primary font-medium dm-sans text-lg lg:text-xl font-semibold">
                            Welcome to Hi-Tech Plast
                        </p>

                    {/* Industrial Heading */}
                    <h1 className="text-brandWhite unbounded text-3xl lg:text-5xl font-bold leading-[1.05] unbounded">
                        Advanced plastic <br className="hidden md:block" />
                        spool manufacturing <br className="hidden md:block" />
                        solutions.
                    </h1>

                    {/* Final Button */}
                    <div className="">
                        <Button to="/products" label="View all Products " className="w-fit" />
                    </div>
                </div>
            </div>

            {/* Bottom transition */}
        </section>
    );
};

export default HomeBanner;