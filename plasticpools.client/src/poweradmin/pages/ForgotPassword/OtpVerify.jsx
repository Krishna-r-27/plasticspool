import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "../../layout/AppFooter";

const OtpVerify = () => {
    return (
        <div
            className="min-h-screen flex flex-col
            bg-[#f3f4f6] dark:bg-gray-900
            bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]
            dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:20px_20px]"
        >
            {/* Center Content */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    className="w-full max-w-md rounded-md px-8 py-10 shadow-xl
                    bg-white dark:bg-slate-800"
                >
                    <h2
                        className="text-center text-2xl font-medium mb-2
                        text-blue-800 dark:text-white"
                    >
                        Enter OTP
                    </h2>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                        OTP sent to your email
                    </p>

                    {/* OTP input */}
                    <input
                        type="text"
                        maxLength="6"
                        placeholder="Enter 6-digit OTP"
                        className="w-full rounded px-4 py-2 text-center tracking-widest text-lg
                        bg-blue-50 dark:bg-slate-700
                        border border-gray-200 dark:border-slate-600
                        focus:outline-none focus:ring-2
                        focus:ring-blue-800 dark:focus:ring-blue-500"
                    />

                    <button
                        className="w-full mt-6 px-6 py-2 text-sm font-semibold rounded
                        bg-blue-800 hover:bg-blue-600
                        dark:bg-blue-800 dark:hover:bg-blue-600
                        text-white"
                    >
                        VERIFY OTP
                    </button>

                    <div className="text-center mt-6">
                        <Link
                            to="/signin"
                            className="text-sm text-blue-800 dark:text-blue-300 hover:underline"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <AppFooter />
        </div>
    );
};

export default OtpVerify;
