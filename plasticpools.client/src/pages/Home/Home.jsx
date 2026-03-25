import React from 'react';
import HomeBanner from "../../Components/layout/HomeBanner/HomeBanner";

// Asset Imports
import homeAboutWebp from '../../assets/img/about-iso-new-img-1.webp';
import homeAboutPng from '../../assets/img/about-iso-new-img-1.png';
import AboutCompany from '../../Components/sections/AboutCompany/AboutCompany';
import ReelCalculator from '../../Components/sections/ReelCalculator/ReelCalculator';
import ProductSection from '../../Components/sections/ProductSection/ProductSection';
import BlogandEvents from '../../Components/sections/BlogandEvents/BlogandEvents';



const Home = () => {
    // Description text for the About Section
    const aboutData = {
        title: "About Company",
        description: `Hi-Tech Plast was incorporated to manufacture cost-effective and efficient Plastic Reels for various purposes. Our company is admired for our quality products and prompt services by our valued clients. After creating a niche in the Domestic Market, we are also planning to increase our horizon in the International Market. Our customer list includes number of satisfied reputed winding wire manufacturers of India, which is a proof of our efficiency and quality work.`,
        buttonText:"Know more" , // Custom label
    buttonLink:"/products"
    };

    return (
        <main className="bg-brandWhite">
            {/* Hero Section */}
            <HomeBanner />

            {/* Reusable About Company Section */}
            <AboutCompany 
                title={aboutData.title}
                description={aboutData.description}
                mainImageWebp={homeAboutWebp}
                mainImagePng={homeAboutPng}
            />
            <ProductSection />
            <div id="calculator" >
            <ReelCalculator /></div>
            <BlogandEvents />
            {/* Aap yahan doosre sections add kar sakte hain */}
        </main>
    );
};

export default Home;