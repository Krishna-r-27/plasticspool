// src/pages/BlogDetails/BlogDetails.jsx
import React from 'react';
import { blogDetailsData } from '../../Components/Content/BlogDetailsData';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import RelatedBlogs from '../../Components/sections/RelatedBlogs/RelatedBlogs';

//import RelatedBlogs from './RelatedBlogs'; // Naya component import kiya

const BlogDetails = () => {
    const { title, imagePng, imageWebp, imageAlt, content } = blogDetailsData;

    return (
        <>
            <InnerBanner title="Blog" breadcrumb="Blog" />

            <main className="py-16 md:py-28  bg-white text-center lg:text-start blog-detail">
                <div className="container">
                    <div className="block">

                        {/* DESKTOP IMAGE - Only visible on lg (>1024px) */}
                        {/* Float logic stays here for desktop layout */}
                        <div className="hidden lg:block lg:float-left lg:w-1/2 lg:mr-18 lg:mb-4">
                            <picture className="block w-full">
                                <source srcSet={imageWebp} type="image/webp" />
                                <img
                                    src={imagePng}
                                    alt={imageAlt}
                                    className="w-full aspect-square object-cover rounded-tl-[40px] rounded-br-[40px] border-0 block"
                                />
                            </picture>
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="blog-content">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#002147] mb-6 leading-tight">
                                {title}
                            </h1>

                            {/* MOBILE/TABLET IMAGE - Only visible on screens < 1024px */}
                            {/* Placed specifically below the heading */}
                            <div className="block lg:hidden mx-auto w-[75%] mb-8">
                                <picture className="block w-full">
                                    <source srcSet={imageWebp} type="image/webp" />
                                    <img
                                        src={imagePng}
                                        alt={imageAlt}
                                        className=" w-[80%] md:w-[65%] mx-auto w-full aspect-square object-cover rounded-tl-[40px] rounded-br-[40px] border-0 block"
                                    />
                                </picture>
                            </div>

                            <div className="text-base leading-[1.8] text-gray-700">
                                {content.map((paragraph, index) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Clearfix ensures container doesn't collapse */}
                        <div className="clear-both"></div>
                    </div>
                </div>
            </main>

            {/* RELATED BLOGS SECTION */}
            <RelatedBlogs />
        </>
    );
};

export default BlogDetails;