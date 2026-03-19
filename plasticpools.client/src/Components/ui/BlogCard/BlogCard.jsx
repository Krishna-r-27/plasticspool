import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const BlogCard = ({
    title = "Spools for Enameled Wires",
    imagePng,
    imageWebp,
    to,
    className = "",
    variant = "product"
}) => {

    const Wrapper = to ? Link : 'div';

    return (
        <Wrapper to={to} className={`group flex flex-col w-full cursor-pointer ${className}`}>

            <div
                className={`relative bg-white border border-[#1e3a5f]/20 flex items-center justify-center overflow-hidden 
                    ${variant === 'product' ? 'aspect-square p-6' : 'aspect-[4/3] p-0'}`}
                style={{
                    borderTopLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    borderTopRightRadius: '0px',
                    borderBottomLeftRadius: '0px'
                }}
            >
                <picture className="w-full h-full">
                    <source srcSet={imageWebp} type="image/webp" />
                    <img
                        src={imagePng}
                        alt={title}
                        className={`w-full h-full transition-transform duration-500
                            ${variant === 'product' ? 'object-contain' : 'object-cover'}`}
                        loading="lazy"
                    />
                </picture>
            </div>

            <div className="flex items-center link-group justify-between mt-4 gap-3">
                <h3 className="text-xl font-semibold text-[#1A1A1A] leading-[1.5] font-sans transition-colors duration-300 group-hover:text-[#002147]">
                    {title}
                </h3>
                <div className="flex-shrink-0">
                    {/* No 'to' on Button — whole card is already a Link */}
                    <Button variant="arrow" to={to} />
                </div>
            </div>

        </Wrapper>
    );
};

export default BlogCard;