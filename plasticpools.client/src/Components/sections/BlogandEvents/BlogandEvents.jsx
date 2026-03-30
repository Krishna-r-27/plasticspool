import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import api, { IMAGE_BASE_URL } from "../../../poweradmin/api/axios";

import BlogCard from "../../ui/BlogCard/BlogCard";
import Button from '../../ui/Button/Button'; 

const btnClass = "cursor-pointer text-[#252525] outline-none flex-shrink-0";

const PrevArrowSVG = () => (
    <svg width="45" height="45" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3.33325H16.3333C21.6667 3.33325 25 6.66658 25 11.9999V18.7499H17.6L21.05 15.2999C21.3 15.0499 21.4167 14.7333 21.4167 14.4166C21.4167 14.0999 21.3 13.7833 21.05 13.5333C20.5667 13.0499 19.7667 13.0499 19.2833 13.5333L13.7 19.1166C13.2167 19.5999 13.2167 20.3999 13.7 20.8833L19.2833 26.4666C19.7667 26.9499 20.5667 26.9499 21.05 26.4666C21.5333 25.9833 21.5333 25.1833 21.05 24.6999L17.6 21.2499H25V27.9999C25 33.3333 21.6667 36.6666 16.3333 36.6666H12.0167C6.68333 36.6666 3.35 33.3333 3.35 27.9999V11.9999C3.33333 6.66658 6.66667 3.33325 12 3.33325Z" fill="currentColor" />
        <path d="M35.4167 18.75C36.1001 18.75 36.6667 19.3167 36.6667 20C36.6667 20.6833 36.1001 21.25 35.4167 21.25H25.0001V18.75H35.4167Z" fill="currentColor" />
    </svg>
);

const NextArrowSVG = () => (
    <svg width="45" height="45" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 3.33325H23.6667C18.3333 3.33325 15 6.66658 15 11.9999V18.7499H22.4L18.95 15.2999C18.7 15.0499 18.5833 14.7333 18.5833 14.4166C18.5833 14.0999 18.7 13.7833 18.95 13.5333C19.4333 13.0499 20.2333 13.0499 20.7167 13.5333L26.3 19.1166C26.7833 19.5999 26.7833 20.3999 26.3 20.8833L20.7167 26.4666C20.2333 26.9499 19.4333 26.9499 18.95 26.4666C18.4667 25.9833 18.4667 25.1833 18.95 24.6999L22.4 21.2499H15V27.9999C15 33.3333 18.3333 36.6666 23.6667 36.6666H27.9833C33.3167 36.6666 36.65 33.3333 36.65 27.9999V11.9999C36.6667 6.66658 33.3333 3.33325 28 3.33325Z" fill="currentColor" />
        <path d="M4.5835 18.75C3.90016 18.75 3.3335 19.3167 3.3335 20C3.3335 20.6833 3.90016 21.25 4.5835 21.25H15.0002V18.75H4.5835Z" fill="currentColor" />
    </svg>
);
 

const BlogandEvents = () => {
    const swiperRef = useRef(null);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await api.get("https://www.plasticspool.com/api/blog/list");
            //const res = await api.get("api/blog/list");

            // sirf visible blogs
            const filtered = res.data.filter(b => b.visible);

            /*  setBlogs(filtered.slice(0, 6));  */
            setBlogs(filtered);
        } catch (err) {
            console.error("Error fetching blogs", err);
        }
    };
    return (
        <section className="relative bg-white overflow-x-hidden pb-16 md:pb-28">
            <div className="container flex items-center justify-between flex-col md:flex-row pb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002147] font-unbounded pb-6">
                    Blogs & Events
                </h2>
                <Button label="View all" to="/blog" />
            </div>

            <div className="container relative overflow-visible lg:px-12">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    loop={true}
                    speed={1000}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                >
                    {blogs.map((blog, index) => (
                        <SwiperSlide key={index}>
                            <BlogCard
                                title={blog.title}
                                imagePng={`${IMAGE_BASE_URL}/${blog.image}`}
                                imageWebp={`${IMAGE_BASE_URL}/${blog.image}`}
                                to={`/blog/${blog.slug}`} // ✅ slug use
                                variant="blog"
                                className="p-0 m-0"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Desktop arrows — lg+ only */}
                <button
                    className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 ${btnClass}`}
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <PrevArrowSVG />
                </button>

                <button
                    className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 ${btnClass}`}
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <NextArrowSVG />
                </button>

                {/* Mobile arrows — below swiper, hidden on lg+ */}
                <div className="flex lg:hidden justify-center items-center gap-6 mt-6">
                    <button onClick={() => swiperRef.current?.slidePrev()} className={btnClass}>
                        <PrevArrowSVG />
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()} className={btnClass}>
                        <NextArrowSVG />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogandEvents;
 