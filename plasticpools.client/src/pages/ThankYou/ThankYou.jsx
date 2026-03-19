import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import Button from '../../Components/ui/Button/Button';


const thankYouContent = [
    {
        id: "heading",
        type: "heading",
        text: "Thank you for getting in touch!",
    },
    {
        id: "message",
        type: "body",
        text: "We have received your inquiry and we will revert back to you.",
    },
    {
        id: "greeting",
        type: "body",
        text: "Have a great day!",
    },
    {
        id: "signature",
        type: "signature",
        text: "Team – Hi-Tech Plast",
    },
];

const ThankYou = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [visible, setVisible] = useState([]);

    useEffect(() => {
        thankYouContent.forEach((_, i) => {
            setTimeout(() => {
                setVisible((prev) => [...prev, i]);
            }, i * 350);
        });
    }, []);

    return (
        <main className="bg-white">
            <InnerBanner title="Thank You" breadcrumb="Thank You" />

            <section className="py-16 md:py-28">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">

                        {/* Animated checkmark */}
                        <div className="flex justify-center mb-10">
                            <div className="w-20 h-20 rounded-full bg-[#002147] flex items-center justify-center shadow-lg ">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Array-driven content with staggered fade-in */}
                        <div className="space-y-4">
                            {thankYouContent.map((item, index) => {
                                const isVisible = visible.includes(index);

                                if (item.type === "heading") {
                                    return (
                                        <h2
                                            key={item.id}
                                            className={`text-2xl md:text-3xl font-bold text-[#002147] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {item.text}
                                        </h2>
                                    );
                                }

                                if (item.type === "signature") {
                                    return (
                                        <p
                                            key={item.id}
                                            className={`text-base font-bold text-[#002147] mt-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {item.text}
                                        </p>
                                    );
                                }

                                return (
                                    <p
                                        key={item.id}
                                        className={`text-base leading-relaxed text-gray-600 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        {item.text}
                                    </p>
                                );
                            })}
                        </div>



                    </div>
                </div>
            </section>
        </main>
    );
};

export default ThankYou;