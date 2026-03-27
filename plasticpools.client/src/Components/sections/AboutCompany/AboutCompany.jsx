
import React from 'react';
//import { FiArrowUpRight } from 'react-icons/fi';
//import { Link } from 'react-router-dom';
import Button from '../../ui/Button/Button';

const AboutCompany = ({
    title,
    description,
    mainImageWebp,
    mainImagePng,
    buttonText = "Know More",
    buttonLink = "/about-us",
    showButton = true,
    showTitle = true
}) => {
    return (
        <section className="py-10 md:py-28 bg-white font-dmsans overflow-hidden">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row items-center lg:gap-24">

                    {/* Left Side: Desktop Image (Visible only on 1024px and above) */}
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <div className="relative inline-block w-full">
                            <picture>
                                <source srcSet={mainImageWebp} type="image/webp" />
                                <img
                                    src={mainImagePng}
                                    alt={title}
                                    className="w-full h-auto object-contain"
                                />
                            </picture>
                        </div>
                    </div>

                    {/* Right Side: Content Area */}
                    <div className="w-full lg:w-1/2 text-center lg:text-start">
                        {/* Heading */}
                        {showTitle && (
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002147] font-unbounded leading-tight py-6 lg:py-8">
                                {title}
                            </h2>
                        )}

                        {/* Mobile Image: Only visible on screens < 1024px, placed BELOW heading */}
                        <div className="block lg:hidden mb-8">
                            <div className="relative inline-block w-full">
                                <picture>
                                    <source srcSet={mainImageWebp} type="image/webp" />
                                    <img
                                        src={mainImagePng}
                                        alt={title}
                                        className=" w-[80%] md:w-[65%] mx-auto h-auto object-contain"
                                    />
                                </picture>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="text-[#555555]">
                            <div className="whitespace-pre-line text-base">
                                {description}
                            </div>
                        </div>

                        {/* Button logic */}
                        {showButton && (
                            <div className="pt-8 flex justify-center lg:justify-start">
                                <Button
                                    to={buttonLink}
                                    label={buttonText}
                                    className="w-fit"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCompany;


/*import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button/Button';

const AboutCompany = ({
    title,
    description,
    mainImageWebp,
    mainImagePng,
    buttonText = "Know More",
    buttonLink = "/products",
    showButton = true, // Control prop
    showTitle = true
}) => {
    return (
        <section className="py-16 md:py-28 bg-white font-dmsans overflow-hidden">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row items-center lg:gap-24">

                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative inline-block w-full">
                            <picture>
                                <source srcSet={mainImageWebp} type="image/webp" />
                                <img
                                    src={mainImagePng}
                                    alt={title}
                                    className="w-full h-auto object-contain"
                                />
                            </picture>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-start">
                        {showTitle && (
                            <h2 className="text-2xl md:text-3xl lg:text-4xll font-bold text-[#002147] font-unbounded leading-tight py-8">
                                {title}
                            </h2>)}
                        <div className="text-[#555555]">
                            <div className="whitespace-pre-line text-base ">
                                {description}
                            </div>
                        </div>

                        {showButton && (
                            <div className="pt-4 flex justify-center lg:justify-start">
                                <Button
                                    to={buttonLink}
                                    label={buttonText}
                                    className="w-fit"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
   );
};

export default AboutCompany;*/