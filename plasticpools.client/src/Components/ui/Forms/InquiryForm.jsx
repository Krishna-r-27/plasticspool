import React, { useState, useEffect,useCallback } from 'react';
import Button from '../../ui/Button/Button';
import api from "../../../poweradmin/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const getRandom = () => Math.floor(Math.random() * 10) + 1;
     
    const [captchaData, setCaptchaData] = useState(() => {
        const n1 = getRandom();
        const n2 = getRandom();
        return { num1: n1, num2: n2, question: `${n1} + ${n2} = ?` };
    });
    const generateCaptcha = useCallback(() => {
        const num1 = getRandom();
        const num2 = getRandom();
        setCaptchaData({
            num1,
            num2,
            question: `${num1} + ${num2} = ?`
        });
    }, []);
    useEffect(() => {
    }, [generateCaptcha]);

    const universalRadius = "rounded-tl-[20px] rounded-br-[20px] rounded-tr-none rounded-bl-none";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handlePhoneKeyDown = (e) => {
        // Sirf Numbers, Backspace, Tab, aur Arrow keys allow karne ke liye
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const correctAnswer = captchaData.num1 + captchaData.num2;

        if (parseInt(formData.captcha) !== correctAnswer) {
            // 2. Alert ki jagah Error Toast
            toast.error("Captcha incorrect! ❌");
            generateCaptcha();
            return;
        }
        try {
            toast.success("Form Submitted successfully!");

            const res = await api.post("/inquiry/send", {
                name: formData.name,
                company: formData.company,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                message: formData.message
            });
            setFormData({
                name: "",
                company: "",
                phone: "",
                email: "",
                address: "",
                message: "",
                captcha: ""
            });
            

            // reset form
            

        } catch (err) {
            console.error(err);
            alert("Error sending message ❌");
        }
    };

    return (

        <div className="w-full bg-[#002147] p-6 md:p-12 rounded-[30px] mt-0 lg:mt-8 text-center lg:text-start">
            <ToastContainer position="top-right" autoClose={2500} />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded text-white mb-6 md:mb-10 tracking-tight uppercase">
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
                        onKeyDown={handlePhoneKeyDown}
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
                 
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
         
                    <input
                        name="captcha" 
                        type="tel"
                        value={formData.captcha}
                        onKeyDown={handlePhoneKeyDown}  
                        onChange={handleChange}
                        placeholder="Please Enter Captcha"
                        className={`w-full h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                    /> 
                    <input
                        type="text"
                       
                        disabled
                        value={captchaData.question}
                        onChange={handleChange}
                        className={`w-full md:w-[60%] lg:w-[40%] h-[55px] px-5 bg-white text-[#252525] outline-none font-bold text-base placeholder:text-[#252525] placeholder:font-[400] ${universalRadius}`}
                      
                    />
                </div>

                <div className="pt-4 flex justify-center lg:justify-start">
                    <Button
                        label="Send Message"
                        to={null}
                        variant="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default InquiryForm;