import React, { useEffect } from 'react';
import AboutCompany from '../../Components/sections/AboutCompany/AboutCompany';
import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import { setSEO } from "../../Components/utility/seo";
// Page specific images
import homeAboutWebp from '../../assets/img/about-iso-new-img-1.webp';
import homeAboutPng from '../../assets/img/about-iso-new-img-1.png';

const aboutData = {
    description: `In the year 1995, Hi-Tech Plast was incorporated to manufacture cost-effective and efficient Plastic Reels for various purposes. Our company is admired for our quality products and prompt services by our valued clients. After creating a niche in the Domestic Market, we are also planning to increase our horizon in the International Market. Our customer list includes number of satisfied reputed winding wire manufacturers of India, which is a proof of our efficiency and quality work.

Our company holds into manufacturing of Plastic Reels/Bobbins/Spools for packing Winding Wires, Welding Wires, Jari /Metal Threads etc.

The Reels which possess our brand name, are made from recycled Polypropylene (PP). All Reels have smooth edges and well finished parting line to ensure hassle free unwinding on high speed winding machines. Hi-Tech Plast is a team of dedicated professionals offering value pricing, on-time delivery, and superior service to our customers. State-of-art facilities and sophisticated machines for manufacturing reels and bobbins have made our products the most preferred products in the market. Moreover, a highly developed distribution and marketing system is ready to ensure prompt and safe delivery.

As far as the quality of our products is concerned, we have never compromised nor shall ever compromise. To ensure that our goods maintain its quality and durability, we have a team of supervisors and analysts, who involve themselves at every step of our production process. A team of quality conscious professionals keep a constant watch on the manufacturing process to ensure that nothing but the best leaves our production unit. Total Quality Management is used to ensure our ability to thrive in the increasingly competitive marketplace, we are committed to meeting the production and product requirements of each customer.`,
};

function About() {
    useEffect(() => {
        setSEO({
            title: "About Us | Plastic Spool Manufacturer in Gujarat",
            description: "Experienced plastic spool manufacturer offering reels and bobbins for industrial use. Focused on quality, precision, and custom solutions across applications.",
            keywords: "about plastic spool company, spool manufacturer Gujarat, industrial plastic reel company, bobbin manufacturer India, custom spool manufacturer, plastic spool industry experience, reel manufacturer Vadodara, plastic packaging solutions",
            image: "https://www.plasticspool.com/plasticspool-hi-tech-plast-logo.png",
            url: "https://www.plasticspool.com/about-us"
        });
    }, []);

    return (
        <main className="bg-white">
            {/* Ab sirf title aur breadcrumb pass karna hai */}
            <InnerBanner title="About Us" breadcrumb="About Us" />

            <section className="about">
                <AboutCompany
                    description={aboutData.description}
                    mainImageWebp={homeAboutWebp}
                    mainImagePng={homeAboutPng}
                    showButton={false}
                    showTitle={false}
                />
            </section>
        </main>
    );
}

export default About;