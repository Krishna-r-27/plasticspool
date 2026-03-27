import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import { ThemeProvider } from "./poweradmin/context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignIn from "./poweradmin/pages/SignIn/SignIn";
import Dashboard from "./poweradmin/pages/Dashboard/Dashboard";
import InquiryTable from "./poweradmin/pages/InquiryManagement/InquiryTable";
import InquiryTab from "./poweradmin/pages/InquiryManagement/inquiryattended";
import InquiryDetails from "./poweradmin/pages/InquiryManagement/InquiryDetails";
import AddBlog from "./poweradmin/pages/BlogManagement/addblog";
import EditBlog from "./poweradmin/pages/BlogManagement/addblog";
import Viewblog from "./poweradmin/pages/BlogManagement/viewblog";
import AppLayout from "./poweradmin/layout/AppLayout"; 
function AppContent() {
    const location = useLocation();

    //   FIX: slash lagana zaroori hai
    const isAdminRoute = location.pathname.startsWith("/poweradmin");

    return (
        <div className="flex flex-col min-h-screen font-dmsans selection:bg-navy selection:text-white">

            <ScrollHandler />

            {/* Navbar */}
            {!isAdminRoute && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/poweradmin/signin" element={<SignIn />} /> 
                    <Route
                        path="/poweradmin"
                        element={
                            <ProtectedRoute>
                                <ThemeProvider>
                                    <AppLayout />
                                    </ThemeProvider>
                            </ProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="inquiry" element={<InquiryTable />} />
                        <Route path="attended-inquiry" element={<InquiryTab />} />
                        <Route path="view-inquiry/:id" element={<InquiryDetails />} />
                        <Route path="add-blog" element={<AddBlog />} />
                        <Route path="edit-blog/:id" element={<EditBlog />} />
                        <Route path="view-blog" element={<Viewblog />} /> 
                    </Route> 
                    {/* Public */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact-us" element={<ContactSection />} />
                    {/*<Route path="/blog-detail" element={<BlogDetails />} />*/}
                    <Route path="/blog/:slug" element={<BlogDetails />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main> 
            {/* Footer */}
            {!isAdminRoute && <Footer />} 
        </div>
    );
} 
export default AppContent;