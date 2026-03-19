import React, { useEffect, useState } from 'react';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';

const faqData = [
    {
        id: 1,
        question: "What materials are used to manufacture your plastic reels?",
        answer: "Our reels are manufactured using 100% recycled Polypropylene (PP). This ensures they are lightweight, durable, and eco-friendly. All reels carry our brand name and are engineered to withstand the demands of high-speed winding machines without cracking or deforming.",
    },
    {
        id: 2,
        question: "What types of wires are compatible with your reels and bobbins?",
        answer: "Our Plastic Reels, Bobbins, and Spools are designed for packing Winding Wires, Welding Wires, and Jari/Metal Threads. The smooth edges and well-finished parting lines ensure hassle-free unwinding across all wire types on high-speed machines.",
    },
    {
        id: 3,
        question: "Do you offer custom sizes or specifications?",
        answer: "Yes, we offer customisation based on your specific winding requirements. You can share your wire gauge, reel dimensions, and capacity needs with us, and our team will work with you to deliver the right product. Use our Calculator page for quick estimates.",
    },
    {
        id: 4,
        question: "What is the minimum order quantity (MOQ)?",
        answer: "Our MOQ varies based on the reel type and size. Please get in touch with our team via the Contact Us page or email us directly to discuss your order requirements and we will provide a tailored quote.",
    },
    {
        id: 5,
        question: "How do you ensure the quality of your products?",
        answer: "We follow Total Quality Management (TQM) at every stage of our production process. A dedicated team of supervisors and analysts monitors manufacturing closely to ensure nothing leaves our unit below standard. We have never compromised on quality since our inception in 1995.",
    },
    {
        id: 6,
        question: "Where are your products manufactured?",
        answer: "All our products are manufactured at our facility in India using state-of-the-art machinery. Our highly developed distribution network ensures timely and safe delivery to customers across the country and internationally.",
    },
    {
        id: 7,
        question: "Are your reels suitable for high-speed winding machines?",
        answer: "Absolutely. Our reels are specifically engineered for use on high-speed winding machines. The smooth edges and precision-finished parting lines eliminate snagging during unwinding, ensuring consistent, uninterrupted operation.",
    },
    {
        id: 8,
        question: "Do you supply to international markets?",
        answer: "We have established a strong presence in the domestic market and are actively expanding into international markets. If you are an overseas buyer, please reach out to us and we will be happy to discuss export possibilities and logistics.",
    },
    {
        id: 9,
        question: "How long does delivery take?",
        answer: "Delivery timelines depend on the order size, product type, and destination. Our highly developed distribution and marketing system is built to ensure prompt and safe delivery. Contact us for a specific delivery estimate based on your location.",
    },
    {
        id: 10,
        question: "How can I place an order or get a quote?",
        answer: "You can reach us through the Contact Us page on our website or email us directly. Share your requirements — including reel type, size, and quantity — and our team will respond promptly with pricing and availability.",
    },
];

const FAQItem = ({ item, isOpen, onToggle }) => {
    return (
        <div
            className={`border-b border-gray-200 transition-all duration-300 ${isOpen ? 'bg-[#f7f9fc]' : 'bg-white'}`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left group"
            >
                {/* Number + Question */}
                <div className="flex items-start gap-4">
                    <span className={`text-sm font-bold mt-0.5 min-w-[28px] transition-colors duration-300 ${isOpen ? 'text-[#002147]' : 'text-gray-300'}`}>
                        {String(item.id).padStart(2, '0')}
                    </span>
                    <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? 'text-[#002147]' : 'text-gray-800 group-hover:text-[#002147]'}`}>
                        {item.question}
                    </span>
                </div>

                {/* Toggle Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#002147] rotate-45' : 'bg-gray-100 group-hover:bg-[#002147] group-hover:text-white'}`}>
                    <svg
                        width="14" height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}
                    >
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </button>

            {/* Answer - smooth expand */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600 leading-relaxed text-base pl-[52px] pr-6 pb-5">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openId, setOpenId] = useState(1); // first open by default

    const handleToggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <main className="bg-white">
            <InnerBanner title="FAQ" breadcrumb="FAQ" />

            <section className="py-16 md:py-28">
                <div className="container">

                    {/* Section Header */}
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#002147] mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed">
                            Everything you need to know about our products, ordering process, and delivery. Can't find an answer? <a href="/contact-us" className="text-[#002147] font-medium underline underline-offset-2">Contact us</a>.
                        </p>
                    </div>

                    {/* Accordion */}
                    <div className=" border-t border-gray-200 rounded-sm overflow-hidden shadow-sm">
                        {faqData.map((item) => (
                            <FAQItem
                                key={item.id}
                                item={item}
                                isOpen={openId === item.id}
                                onToggle={() => handleToggle(item.id)}
                            />
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
};

export default FAQ;