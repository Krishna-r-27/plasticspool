import React from 'react';
import InquiryForm from '../../ui/Forms/InquiryForm';

const Inquiry = () => {
    const borderColor = "border-[#002147]";
    const textColor = "text-[#002147]";

    const guidelines = [
        "Specifications and Dimensions are subject to change on account of Technical Development.",
        "We reserve the right to change the specifications and Dimensions without any prior Notification.",
        "Dimensions are round off to the nearest round Figure.",
        "All Spools are made from Polypropylene."
    ];

    return (
        <section className="py-16 md:py-28  bg-white font-body overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] items-start gap-12 lg:gap-20">

                    {/* Left Side: Technical Guidelines Box */}
                    <div className={`px-8 py-14 border-2 ${borderColor} rounded-tl-[30px] rounded-br-[30px] bg-white h-fit`}>
                        <ul className="space-y-4">
                            {guidelines.map((item, index) => (
                                <li key={index} className="flex items-start gap-x-3 group">
                                    {/* Custom Sharp Arrow Icon */}
                                    <span className={`${textColor} mt-1 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1`}>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M4 2L20 12L4 22L8 12L4 2Z" />
                                        </svg>
                                    </span>
                                    <p className="text-[#333333] text-base font-medium leading-relaxed">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side: Inquiry Form */}
                    <div className="w-full">
                        <InquiryForm />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Inquiry;