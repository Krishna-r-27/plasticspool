import React from 'react';

import InnerBanner from '../../Components/layout/InnerBanner/InnerBanner';
import AllProducts from '../../Components/sections/AllProducts/AllProducts';
import Inquiry from '../../Components/sections/Inquiry/Inquiry';


const Products = () => {
    return (
        <main className="min-h-screen">

            <InnerBanner title="Products" breadcrumb="Products" />
            <AllProducts />
            <Inquiry />
        </main>
    );
};

export default Products;