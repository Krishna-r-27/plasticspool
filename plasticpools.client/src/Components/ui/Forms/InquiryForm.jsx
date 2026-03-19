import React, { useState } from 'react';
import Button from '../../ui/Button/Button';

const InquiryForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        address: "",
        message: "",
        captcha: ""
    });

    const universalRadius = "rounded-tl-[20px] rounded-br-[20px] rounded-tr-none rounded-bl-none";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div className="w-full bg-[#002147] p-8 md:p-12 rounded-[30px]  text-center lg:text-start">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded text-white mb-10 tracking-tight uppercase">
                Quick Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name*"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="Company*"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Contact Number*"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    />
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                />

                <textarea
                    name="message"
                    rows="4"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] min-h-[130px] ${universalRadius}`}
                ></textarea>

                {/* --- Updated Captcha Grid Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
                    {/* First Input Field (Instead of Div) */}
                    <input
                        type="text"
                        readOnly // Optional: Agar aap chahte hain backend dev hi ise handle kare
                        placeholder="Place Captcha Image Here"
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    />

                    {/* Large Input Field (Right) */}
                    <input
                        type="text"
                        name="captcha"
                        placeholder="Solve Captcha"
                        required
                        value={formData.captcha}
                        onChange={handleChange}
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    />
                </div>

                <div className="pt-4 flex justify-center lg:justify-start">
                    <Button
                        label="Send Message"
                        to={null}
                        onClick={handleSubmit}
                        variant="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default InquiryForm;