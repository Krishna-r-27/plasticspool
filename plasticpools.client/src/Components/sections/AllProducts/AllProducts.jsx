import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCT_CATEGORIES, ALL_PRODUCTS } from '../../Content/ProductsData';
import ProductCard from '../../ui/ProductCard/ProductCard';

const AllProducts = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('enameled');

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        const validIds = PRODUCT_CATEGORIES.map(c => c.id);

        if (validIds.includes(hash)) {
            // Small delay — lets the page render first, same as ScrollHandler
            setTimeout(() => {
                setActiveTab(hash);
            }, 50);
        } else {
            setActiveTab('enameled');
        }
    }, [location.hash]);

    const currentProducts = ALL_PRODUCTS[activeTab] || [];

    return (
        <section className="pt-16 md:pt-28">
            <div className="container mx-auto">

                {/* Category Tabs */}
                <div className="flex flex-wrap flex-col sm:flex-row gap-4 mb-8">
                    {PRODUCT_CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`px-6 py-3 rounded-tl-[15px] rounded-br-[15px] font-body text-base font-bold transition-all duration-300 ${activeTab === category.id
                                    ? 'bg-[#002147] text-[#FDF14A]'
                                    : 'bg-white text-[#252525] border border-[#002147]'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Note */}
                <div className="mb-10">
                    <p className="font-body text-slate-600 text-base leading-relaxed text-center lg:text-left">
                        <span className="font-bold text-[#1e293b]">Note:</span> Click on photo for dimensions of that spool.
                        All dimensions are in millimetre (MM).
                    </p>
                </div>

                {/* Grid */}
                {currentProducts.length > 0 ? (
                    <div className={`grid gap-4 space-y-8 w-[75%] sm:w-full mx-auto ${(activeTab === 'customized' || activeTab === 'cable' || activeTab === 'pu-pipes')
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
                        }`}>
                        {currentProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                title={product.title}
                                mainImg={product.mainImg}
                                popupImg={product.popupImg}
                                {...product}
                                categoryId={activeTab}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                        <p className="font-body text-slate-400">No products available in this category yet.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default AllProducts;