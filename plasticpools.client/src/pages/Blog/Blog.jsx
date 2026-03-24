import React, { useEffect, useState } from 'react';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import BlogCard from '../../Components/ui/BlogCard/BlogCard';
import api, { IMAGE_BASE_URL } from "../../poweradmin/api/axios";

const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await api.get("/blog/list");

             
            const filtered = res.data.filter(b => b.visible);

            setBlogs(filtered);

        } catch (err) {
            console.error("Error fetching blogs", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <InnerBanner title="Blog" breadcrumb="Blog" />

            <main className="w-full py-16 lg:py-24 bg-white">
                <div className="container">

                    {/* HEADER */}
                    <div className="mb-12">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002147] mb-2">
                            Latest Insights & Industry News
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                            Stay informed with the latest updates from Hi-Tech Plast.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="text-center py-10">Loading blogs...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">

                            {blogs.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    title={blog.title}

                                    //   IMAGE FIX
                                    imagePng={`${IMAGE_BASE_URL}/${blog.image}`}
                                    imageWebp={`${IMAGE_BASE_URL}/${blog.image}`}

                                    //   future detail page ke liye
                                    to={`/blog/${blog.slug}`}

                                    variant="blog"
                                />
                            ))}

                        </div>
                    )}

                </div>
            </main>
        </>
    );
};

export default Blog;