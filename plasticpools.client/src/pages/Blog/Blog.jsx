import React from 'react';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import BlogCard from '../../Components/ui/BlogCard/BlogCard';
import { BlogData } from '../../Components/Content/BlogData';


const Blog = () => {
    return (
        <>

            <InnerBanner title="Blog" breadcrumb="Blog" />
        <main className="w-full py-16 lg:py-24 bg-white">
            <div className="container">

                <div className="mb-12 ">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002147] mb-2">
                        Latest Insights & Industry News
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Stay informed with the latest updates from Hi-Tech Plast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {BlogData.map((blog, index) => (
                        <BlogCard
                            key={index}
                            title={blog.title}
                            imagePng={blog.imagePng}
                            imageWebp={blog.imageWebp}
                            to={blog.to}
                            variant="blog"
                        />
                    ))}
                </div>
            </div>
        </main></>
    );
};

export default Blog;