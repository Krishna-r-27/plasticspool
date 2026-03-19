import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout & Pages
import Navbar from './Components/layout/Navbar/Navbar';
import Footer from './Components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import ContactSection from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import Products from './pages/Products/Products';
import Sitemap from './pages/Sitemap/Sitemap';
import NotFound from './pages/NotFound/NotFound';
import ScrollHandler from './Components/utility/ScrollHandler';
import ThankYou from './pages/ThankYou/ThankYou';
import FAQ from './pages/FAQ/FAQ';


function App() {
    return (
        <BrowserRouter  basename="/plasticspool">
            <ScrollHandler /> 
            <div className="flex flex-col min-h-screen font-dmsans selection:bg-navy selection:text-white">

                <Navbar />

                <main className="flex-grow">
                    <Routes>
                        {/* Matches Navigation Items in Image */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact-us" element={<ContactSection />} />
                        <Route path="/blog-detail" element={<BlogDetails />} />
                        <Route path="/sitemap" element={<Sitemap />} />
                        <Route path="/thank-you" element={<ThankYou />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="/*" element={<NotFound />} />

                    </Routes>
                </main>

                <Footer />

            </div>
        </BrowserRouter>
    );
}

export default App;