import React, { useEffect } from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "@fancyapps/ui/dist/carousel/carousel.arrows.css";

const ProductCard = ({ mainImg, popupImg, title, categoryId, isSquare, isVideo, videoSrc }) => {
    useEffect(() => {
        Fancybox.destroy();
        Fancybox.bind("[data-fancybox='gallery']", {
            DragMode: false,
            Carousel: {
                Thumbs: false,
            },
            zoom: false,
            Panzoom: false,
            contentClick: false,
            wheel: false,
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["close"],
                },
            },
        });

        return () => {
            Fancybox.destroy();
        };
    }, [mainImg]);

    if (!mainImg || !popupImg) return null;

    const currentCat = (categoryId || '').toLowerCase();

    const useWideRatio = ['customized', 'cable', 'pu-pipes'].includes(currentCat) && !isSquare;

    return (
        <div className="group flex flex-col items-center w-full">

            {isVideo ? (
                // ✅ Video Card
                <a
                    data-fancybox="gallery"
                    href={videoSrc}
                    data-type="html5video"                    data-caption={title}
                    className="w-full bg-white border border-[#002147] transition-all duration-500 flex items-center justify-center overflow-hidden cursor-pointer outline-none relative aspect-[38/25] "
                    style={{ borderRadius: '20px 0px 20px 0px' }}
                >
                    <picture className="w-full h-full flex items-center justify-center pointer-events-none">
                        <source srcSet={mainImg.webp} type="image/webp" />
                        <img
                            src={mainImg.png}
                            alt={title || "Video"}
                            className="w-full h-full object-cover"
                        />
                    </picture>

                </a>
            ) : (
                // ✅ Normal Product Card
                <button
                    data-fancybox="gallery"
                    data-src={popupImg.png}
                    data-thumb={popupImg.png}
                    data-caption={title ? `${title}` : 'Dimensions'}
                    className={`w-full bg-white border border-[#002147] transition-all duration-500 flex items-center justify-center overflow-hidden cursor-pointer outline-none relative 
                        ${useWideRatio ? 'aspect-[114/53] py-2 px-4' : 'aspect-square p-8'}`}
                    style={{ borderRadius: '20px 0px 20px 0px' }}
                >
                    {/* Product Image / Technical Diagram */}
                    <picture className="w-full h-full flex items-center justify-center pointer-events-none">
                        <source srcSet={mainImg.webp} type="image/webp" />
                        <img
                            src={mainImg.png}
                            alt={title || "Product Image"}
                            className="w-full h-full object-contain transform transition-transform duration-500 ease-in-out"
                        />
                    </picture>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#002147]/80 backdrop-blur-[3px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                        <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-500 delay-100 group-hover:-translate-y-2 ease-in-out">
                                <path d="M7 17L17 7M17 7H10M17 7V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </button>
            )}

            {title && (
                <h4 className="mt-4 font-body text-[#1e293b] text-md font-medium uppercase tracking-wide text-center group-hover:text-[#001f3f] transition-colors duration-300">
                    {title}
                </h4>
            )}
        </div>
    );
};

export default ProductCard;