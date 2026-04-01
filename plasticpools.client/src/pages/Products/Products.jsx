import React, { useEffect } from 'react';
import { setSEO } from "../../Components/utility/seo";

import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import AllProducts from '../../Components/sections/AllProducts/AllProducts';
import Inquiry from '../../Components/sections/Inquiry/Inquiry';


const Products = () => {

    useEffect(() => {
        setSEO({
            title: "Plastic Spools Manufacturer | Reels & Bobbins for Wires & Cables",
            description: "Explore plastic spools, reels, and bobbins for wires, cables, welding wire, and tubes. Designed for durability, precision, and efficient winding applications.",
            keywords: "plastic spools for wires, cable spool manufacturer, plastic reels for cables, bobbins for winding wires, welding wire spools, PU pipe spool, custom plastic reels, industrial bobbins, plastic spool products India",
            image: "https://www.plasticspool.com/plasticspool-hi-tech-plast-logo.png",
            url: "https://www.plasticspool.com/products"
        });
    }, []);

    return (
        <main className="min-h-screen">

            <InnerBanner title="Products" breadcrumb="Products" />
            <AllProducts />
            <Inquiry />
        </main>
    );
};

export default Products;