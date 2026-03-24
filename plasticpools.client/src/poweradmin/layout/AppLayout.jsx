import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const AppLayout = () => {
    // Mobile sidebar (overlay)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Desktop collapse (icons only)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <AppSidebar
                open={sidebarOpen}
                collapsed={sidebarCollapsed}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Content area */}
            <div className="relative flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <AppHeader
                    onMenuClick={() => {
                        // Mobile: toggle overlay
                        if (window.innerWidth < 1024) {
                            setSidebarOpen(!sidebarOpen);
                        } else {
                            // Desktop: toggle collapse
                            setSidebarCollapsed(!sidebarCollapsed);
                        }
                    }}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-[#f9fafb] dark:bg-gray-900">
                    <Outlet />
                </main>

                <AppFooter/>
            </div>
        </div>
    );
};

export default AppLayout;
