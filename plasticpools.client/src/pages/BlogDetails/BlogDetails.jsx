import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import RelatedBlogs from '../../Components/sections/RelatedBlogs/RelatedBlogs';
import api, { IMAGE_BASE_URL } from "../../poweradmin/api/axios";

const BlogDetails = () => {

    const { slug } = useParams(); // ✅ slug le rahe hai
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {
        try {
            const res = await api.get(`/blog/getbyslug/${slug}`);
            setBlog(res.data);
        } catch (err) {
            console.error("Error fetching blog", err);
        }
    };

    if (!blog) return <div className="text-center py-10">Loading...</div>;

    return (
        <>
            <InnerBanner title="Blog" breadcrumb="Blog" />

            <main className="py-16 md:py-28 bg-white blog-detail">
                <div className="container">

                    <div className="block">

                        {/* IMAGE */}
                        <div className="hidden lg:block lg:float-left lg:w-1/2 lg:mr-18 lg:mb-4">
                            <img
                                src={`${IMAGE_BASE_URL}/${blog.image}`}
                                alt={blog.title}
                                className="w-full aspect-square object-cover rounded-tl-[40px] rounded-br-[40px]"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="blog-content">
                            <h1 className="text-3xl font-semibold mb-6">
                                {blog.title}
                            </h1>

                            <div className="block lg:hidden mb-8 text-center">
                                <img
                                    src={`${IMAGE_BASE_URL}/${blog.image}`}
                                    alt={blog.title}
                                    className="w-[70%] mx-auto rounded"
                                />
                            </div>

                            {/*<p className="text-gray-700 leading-[1.8]">*/}
                            {/*    {blog.description1}*/}
                            {/*</p>*/}
                            <div
                                className="text-gray-700 leading-[1.8] blog-html"
                                dangerouslySetInnerHTML={{ __html: blog.description1 }}
                            />
                        </div>

                        <div className="clear-both"></div>
                    </div>

                </div>
            </main>

            <RelatedBlogs currentSlug={slug} />
        </>
    );
};

export default BlogDetails;