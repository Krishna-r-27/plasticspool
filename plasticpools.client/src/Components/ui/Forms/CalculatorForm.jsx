import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';

// 1. Dropdown Component (For Flange & Barrel only)
const CustomSelect = ({ label, unit, options, radiusClass, activeDropdown, setActiveDropdown, id }) => {
    const [selected, setSelected] = useState("0.00");
    const dropdownRef = useRef(null);
    const isOpen = activeDropdown === id;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (isOpen) setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setActiveDropdown]);

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={dropdownRef}>
            <label className="text-base font-medium text-white/90 font-dmsans">
                {label}: ({unit})
            </label>
            <div className="relative">
                <div
                    onClick={() => setActiveDropdown(isOpen ? null : id)}
                    className={`w-full h-[48px] px-4 bg-white text-[#002147] font-bold text-base flex items-center justify-between cursor-pointer ${radiusClass}`}
                >
                    {selected}
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#002147" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>
                {isOpen && (
                    <ul className={`absolute z-50 w-full mt-1 bg-white border border-gray-100 shadow-2xl overflow-hidden ${radiusClass}`}>
                        {options.map((opt, index) => (
                            <li
                                key={index}
                                onClick={() => { setSelected(opt); setActiveDropdown(null); }}
                                className="px-4 py-2.5 text-[#002147] text-base font-bold cursor-pointer transition-colors hover:bg-[#002147] hover:text-white"
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

// 2. Main Form Component
const CalculatorForm = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Mixed Radius: Top-Left: 15, Bottom-Right: 15
    const universalRadius = "rounded-tl-[15px] rounded-br-[15px] rounded-tr-none rounded-bl-none";

    return (
        <div className="w-full">
            <h2 className=" text-2xl md:text-3xl lg:text-4xl text-center lg:start font-bold font-dmsans text-white mb-6 tracking-tight ">
                Reel Capacity Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                {/* SELECT FIELDS (Click to select) */}
                <CustomSelect
                    id="flange" label="Flange Diameter" unit="mm"
                    options={["600 mm", "800 mm", "1000 mm"]}
                    radiusClass={universalRadius}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                />
                <CustomSelect
                    id="barrel" label="Barrel Diameter" unit="mm"
                    options={["300 mm", "400 mm", "500 mm"]}
                    radiusClass={universalRadius}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                />

                {/* TYPABLE INPUT FIELDS (Enabled for typing) */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-base text-white font-medium font-dmsans">Traverse Length: (mm)</label>
                    <input
                        type="number"
                        className={`w-full h-[48px] px-4 bg-white text-[#002147] outline-none font-bold text-base shadow-sm transition-all focus:ring-1 focus:ring-blue-300 ${universalRadius}`}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-base text-white font-medium font-dmsans">Cable Diameter: (mm)</label>
                    <input
                        type="number"
                        className={`w-full h-[48px] px-4 bg-white text-[#002147] outline-none font-bold text-base shadow-sm transition-all focus:ring-1 focus:ring-blue-300 ${universalRadius}`}
                    />
                </div>
            </div>

            {/* RESULT SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-end gap-6 pt-2">
                <Button label="Calculate" to="#" variant="submit" />
                <div className="flex flex-col gap-1.5">
                    <label className="text-base  text-white  font-medium font-dmsans">Maximum Length of Cable / Reel:</label>
                    <div className={`w-full h-[48px] bg-white flex items-center px-4 shadow-inner ${universalRadius}`}>
                        <span className="text-[#002147] font-bold opacity-30 text-base italic tracking-widest">---</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CalculatorForm;