import React from 'react';
import CalculatorForm from '../../ui/Forms/CalculatorForm';
import flangeDiameterPng from '../../../assets/img/flange-diameter.png';
import flangeDiameterWebp from '../../../assets/img/flange-diameter.webp';
import barrelDiameterPng from '../../../assets/img/barrel-diameter.png';
import barrelDiameterWebp from '../../../assets/img/barrel-diameter.webp';
import traverseLengthPng from '../../../assets/img/traverse-length.png';
import traverseLengthWebp from '../../../assets/img/traverse-length.webp';
const ReelCalculator = () => {
    return (
        <section ID="ReelCalculator" className="container py-16 md:py-28 ">
            {/* Using items-start to prevent vertical stretching */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-5 /*items-start */items-stretch">

                {/* Left Panel: Optimized Light Blue Part */}
                <div
                    className="p-6 flex flex-col items-center justify-center rounded-tl-[50px] rounded-br-[50px] rounded-tr-none rounded-bl-none w-full"
                    style={{ backgroundColor: '#0193DB' }}
                >
                    {/* Compact Image Grid - Taking full width */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-8 w-full place-items-center">
                        <picture>
                            <source srcSet={flangeDiameterWebp} type="image/webp" />
                            <img src={flangeDiameterPng} alt="Flange" className="w-full object-contain" />
                        </picture>
                        <picture>
                            <source srcSet={barrelDiameterWebp} type="image/webp" />
                            <img src={barrelDiameterPng} alt="Barrel" className="w-full object-contain" />
                        </picture>
                        <picture className="mt-2">
                            <source srcSet={traverseLengthWebp} type="image/webp" />
                            <img src={traverseLengthPng} alt="Traverse" className="w-full object-contain" />
                        </picture>
                    </div>
                </div>

                {/* Right Panel: Navy Section */}
                <div className="bg-[#002147]  flex flex-col justify-center  p-8 md:p-12 rounded-tl-[50px] rounded-br-[50px] rounded-tr-none rounded-bl-none shadow-xl">
                    <div className="self-center">
                    <CalculatorForm />
                    <p className="mt-8 text-base text-white font-dmsans leading-relaxed">
                        * Please verify this guide with actual put ups as variables of tension, lay, material type, etc. will affect capacity.
                    </p></div>
                </div>
            </div>
        </section>
    );
};

export default ReelCalculator;