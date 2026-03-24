import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';

// 1. Dropdown Component (For Flange & Barrel only)
const CustomSelect = ({ label, unit, options, radiusClass, activeDropdown, setActiveDropdown, id, onChange }) => {
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
                                onClick={() => {
                                    setSelected(opt);

                                    const value = parseFloat(opt); // "600 mm" → 600
                                    onChange(value); // parent ko bhej

                                    setActiveDropdown(null);
                                }}
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
    const [flange, setFlange] = useState(0);
    const [barrel, setBarrel] = useState(0);
    const [traverse, setTraverse] = useState(0);
    const [cable, setCable] = useState(0);
    const [result, setResult] = useState("");
    // Mixed Radius: Top-Left: 15, Bottom-Right: 15
    const universalRadius = "rounded-tl-[15px] rounded-br-[15px] rounded-tr-none rounded-bl-none";
    const calculateReel = () => {
        if (!flange || !barrel || !traverse || !cable) {
            alert("Please fill all fields");
            return;
        }

        const diameter = flange;
        const width = traverse;
        const belly = barrel;

        const turns = Math.round(width / cable - 2);
        const layers = Math.round(((diameter - belly) / 2 - cable) / cable);
        const avgdia = (((diameter - (2 * cable)) - belly) / 2) + belly;
        const avgcirc = avgdia * Math.PI;
        const length = Math.round((avgcirc * layers * turns) / 1000);

        setResult(length + " Metres");
    };
    return (
        <div className="w-full">
            <h2 className=" text-2xl md:text-3xl lg:text-4xl text-center lg:start font-bold font-dmsans text-white mb-6 tracking-tight ">
                Reel Capacity Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                {/* SELECT FIELDS (Click to select) */}
                <CustomSelect
                    id="flange"
                    label="Flange Diameter"
                    unit="mm"
                    options={["600 mm", "800 mm", "1000 mm"]}
                    onChange={setFlange} // ✅ ADD
                    radiusClass={universalRadius}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                />
                <CustomSelect
                    id="barrel"
                    label="Barrel Diameter"
                    unit="mm"
                    options={["300 mm", "400 mm", "500 mm"]}
                    onChange={setBarrel} // ✅ ADD
                    radiusClass={universalRadius}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                />

                {/* TYPABLE INPUT FIELDS (Enabled for typing) */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-base text-white font-medium font-dmsans">Traverse Length: (mm)</label>
                    
                    <input
                        type="number"
                        value={traverse}
                        onChange={(e) => setTraverse(parseFloat(e.target.value))}
                        className={`w-full h-[48px] px-4 bg-white text-[#002147] outline-none font-bold text-base shadow-sm transition-all focus:ring-1 focus:ring-blue-300 ${universalRadius}`}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-base text-white font-medium font-dmsans">Cable Diameter: (mm)</label>
                    
                    <input
                        type="number"
                        value={cable}
                        onChange={(e) => setCable(parseFloat(e.target.value))}
                        className={`w-full h-[48px] px-4 bg-white text-[#002147] outline-none font-bold text-base shadow-sm transition-all focus:ring-1 focus:ring-blue-300 ${universalRadius}`}
                    />
                </div>
            </div>

            {/* RESULT SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-end gap-6 pt-2">
                <Button label="Calculate" onClick={calculateReel} to={null}  variant="submit" />
                <div className="flex flex-col gap-1.5">
                    <label className="text-base  text-white  font-medium font-dmsans">Maximum Length of Cable / Reel:</label>
                    <div className={`w-full h-[48px] bg-white flex items-center px-4 shadow-inner ${universalRadius}`}>
                        <span className="text-[#002147] font-bold opacity-30 text-base italic tracking-widest">{result || "---"}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CalculatorForm;