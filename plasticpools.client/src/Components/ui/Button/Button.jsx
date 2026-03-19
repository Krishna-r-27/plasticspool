import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to = "/calculator", onClick, label = "Calculator", variant = "default", className = "" }) => {

    const isArrow = variant === "arrow";
    const isSubmit = variant === "submit";

    const transitionClasses = `
        transition-all duration-300 ease-in-out
        group-hover:-translate-y-[3px] group-hover:scale-[1]
        hover:-translate-y-[3px] hover:scale-[1]
        active:scale-95 active:translate-y-0
        group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]
        hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] cursor-pointer
    `;

    const baseClasses = `group flex items-center justify-center font-dmsans ${transitionClasses}`;

    const variantClasses = isArrow
        ? `w-16 h-16 bg-[#F9F148] text-[#001F3F] 
           rounded-tl-[10px] rounded-br-[10px]
           group-hover:bg-navy group-hover:text-white cursor-pointer
           hover:bg-navy hover:text-white 
           border border-transparent hover:border-white/20`
        : isSubmit
            ? `gap-3 px-7 py-3.5 bg-primary text-[#222222] border border-transparent 
           hover:border-white/20 hover:bg-[#0193DB] hover:text-white
           rounded-tl-[30px] rounded-br-[30px] cursor-pointer
           w-fit mx-auto lg:mx-0`
            : `gap-3 px-7 py-3.5 bg-primary text-[#222222] border border-transparent 
           hover:border-brandWhite hover:bg-navy hover:text-brandWhite
           rounded-tl-[30px] rounded-br-[30px]
           w-fit mx-auto lg:mx-0`;

    const buttonStyle = !isArrow ? {
        borderRadius: '10px 0px 10px 0px',
    } : {};

    const content = (
        <>
            {!isArrow && (
                <span className="text-base font-medium tracking-tight">
                    {label}
                </span>
            )}
            <svg
                width={isArrow ? "26" : "18"}
                height={isArrow ? "26" : "18"}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 17L17 7M17 7H10M17 7V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 21H18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </>
    );

    const finalClasses = `${baseClasses} ${variantClasses} ${className}`;

    if (to) {
        return (
            <Link to={to} className={finalClasses} style={buttonStyle} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={finalClasses} style={buttonStyle}>
            {content}
        </button>
    );
};

export default Button;