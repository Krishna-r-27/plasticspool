import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';


const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sitemapData = [
        {
            title: "Home",
            path: "/",
            desc: "Incorporated in 1995, Hi-Tech Plast manufactures cost-effective and efficient Plastic Reels, Bobbins, and Spools for various industrial purposes. Admired for quality products and prompt services across India."
        },
        {
            title: "About Us",
            path: "/about-us",
            desc: "Learn about Hi-Tech Plast's journey since 1995 — our mission, values, state-of-the-art manufacturing facilities, and our dedicated team of professionals committed to quality and on-time delivery."
        },
        {
            title: "Products",
            path: "/products",
            desc: "Explore our range of Plastic Reels, Bobbins, and Spools made from recycled Polypropylene (PP) for packing Winding Wires, Welding Wires, and Jari/Metal Threads — designed for hassle-free unwinding on high-speed machines."
        },
        {
            title: "Calculator",
            path: "/calculator",
            desc: "Use our online calculator to estimate reel and bobbin specifications based on your winding wire requirements. Get quick, accurate calculations to support your procurement decisions."
        },
        {
            title: "Blog",
            path: "/blog",
            desc: "Stay updated with the latest news, industry insights, and articles from Hi-Tech Plast on plastic reels, winding wire packaging, manufacturing trends, and more."
        },
        {
            title: "FAQ",
            path: "/faq",
            desc: "Find answers to frequently asked questions about our Plastic Reels, Bobbins, and Spools — including material specifications, ordering process, delivery timelines, and customisation options."
        },
        {
            title: "Contact Us",
            path: "/contact-us",
            desc: "Get in touch with Hi-Tech Plast for product inquiries, pricing, and delivery information. We're here to assist you with all your plastic reel and bobbin requirements.",
            email: "info@hitechplast.com"
        }
    ];

    return (
        <main className="sitemap-wrapper bg-white">

            <InnerBanner title="404" breadcrumb="404" />

            {/* Content List */}
            <section className="py-16 md:py-28">
                <div className="container">

                        {/* 👇 Only addition */}
                        <h2 className="text-2xl font-bold text-[#002147] mb-6">
                           Error 404, Page Not Found Please Get redirected
                        </h2>

                        {sitemapData.map((item, index) => (
                            <div key={index} className="py-2">
                                <Link to={item.path} className="group inline-block">
                                    <h3 className="font-secondary text-[#002147] text-lg font-bold capitalize">
                                        {item.title}
                                    </h3>
                                </Link>

                                <p className="leading-relaxed text-gray-600">
                                    {item.desc}
                                </p>

                                {item.email && (
                                    <div className="mt-1">
                                        <p className="text-gray-600">
                                            Email:{" "}
                                            <a href={`mailto:${item.email}`} className="hover:underline">
                                                {item.email}
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
            </section>
        </main>
    );
};

export default NotFound;