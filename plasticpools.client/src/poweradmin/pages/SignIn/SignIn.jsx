import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppFooter from "../../layout/AppFooter";
import api, { IMAGE_BASE_URL } from "../../api/axios";

const SignIn = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/admin", {
                username,
                password,
            });

            //  success
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/poweradmin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col
            bg-[#f3f4f6] dark:bg-gray-900
            bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]
            dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:20px_20px]
            transition-colors"
        >
            {/* Center Content */}
            <div className="flex flex-1 items-center justify-center">
                {/* Card */}
                <div
                    className="w-full max-w-md rounded-md px-8 py-10 shadow-xl
                    bg-white dark:bg-slate-800
                    text-gray-800 dark:text-gray-100"
                >
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img

                            src={`${IMAGE_BASE_URL}/${"images/signin.png"}`}
                            alt="Logo"
                            className="h-24 w-auto object-contain"
                        />
                    </div>

                    {/* Title */}
                    <h2
                        className="text-center text-2xl font-medium mb-6
                        text-blue-800 dark:text-white"
                    >
                        Sign In
                    </h2>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full rounded px-4 py-2 text-sm
                                bg-blue-50 dark:bg-slate-700
                                border border-gray-200 dark:border-slate-600
                                text-gray-800 dark:text-gray-100
                                placeholder-gray-400
                                focus:outline-none focus:ring-2
                                focus:ring-blue-800 dark:focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded px-4 py-2 text-sm
                                bg-blue-50 dark:bg-slate-700
                                border border-gray-200 dark:border-slate-600
                                text-gray-800 dark:text-gray-100
                                placeholder-gray-400
                                focus:outline-none focus:ring-2
                                focus:ring-blue-800 dark:focus:ring-blue-500"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-start gap-6 mb-6"> {/* Yahan justify-start aur gap use kiya */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 text-sm font-semibold rounded bg-blue-800 hover:bg-blue-500 text-white transition disabled:opacity-60"
                            >
                                {loading ? "PLEASE WAIT..." : "SUBMIT"}
                            </button>

                            <div className="flex items-center gap-2 text-sm">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="accent-blue-500"
                                />
                                <label
                                    htmlFor="remember"
                                    className="cursor-pointer select-none text-gray-600 dark:text-gray-300"
                                >
                                    Remember
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <AppFooter />
        </div>
    );
};

export default SignIn;

//import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import AppFooter from "../../layout/AppFooter";
//import api, { IMAGE_BASE_URL } from "../../api/axios";

//const SignIn = () => {
//    const navigate = useNavigate();

//    const [username, setUsername] = useState("");
//    const [password, setPassword] = useState("");
//    const [loading, setLoading] = useState(false);
//    const [error, setError] = useState("");

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        setError("");
//        setLoading(true);

//        try {
//            const res = await api.post(/admin/login, {
//                username: username.trim(),
//                password: password.trim(),
//            });

//            // ✅ Save user
//            localStorage.setItem("user", JSON.stringify(res.data));

//            // ✅ Redirect
//            navigate(/poweradmin/dashboard);
//        } catch (err) {
//            console.error(err);
//            setError(err.response?.data?.message || "Invalid username or password");
//        } finally {
//            setLoading(false);
//        }
//    };

//    return (
//        <div className="min-h-screen flex flex-col bg-[#f3f4f6] dark:bg-gray-900">
//            <div className="flex flex-1 items-center justify-center">
//                <div className="w-full max-w-md rounded-md px-8 py-10 shadow-xl bg-white dark:bg-slate-800">

//                    {/* Logo */}
//                    <div className="flex justify-center mb-6">
//                        <img
//                            src={`${IMAGE_BASE_URL}/images/signin.png`}
//                            alt="Logo"
//                            className="h-24"
//                        />
//                    </div>

//                    <h2 className="text-center text-2xl font-medium mb-6 text-blue-800 dark:text-white">
//                        Sign In
//                    </h2>

//                    {error && (
//                        <div className="mb-4 text-sm text-red-600 text-center">
//                            {error}
//                        </div>
//                    )}

//                    <form onSubmit={handleSubmit}>
//                        {/* Username */}
//                        <input
//                            type="text"
//                            placeholder="Username"
//                            value={username}
//                            onChange={(e) => setUsername(e.target.value)}
//                            required
//                            className="w-full mb-4 px-4 py-2 border rounded"
//                        />

//                        {/* Password */}
//                        <input
//                            type="password"
//                            placeholder="Password"
//                            value={password}
//                            onChange={(e) => setPassword(e.target.value)}
//                            required
//                            className="w-full mb-6 px-4 py-2 border rounded"
//                        />

//                        <button
//                            type="submit"
//                            disabled={loading}
//                            className="w-full py-2 bg-blue-800 text-white rounded"
//                        >
//                            {loading ? "PLEASE WAIT..." : "SUBMIT"}
//                        </button>
//                    </form>
//                </div>
//            </div>

//            <AppFooter />
//        </div>
//    );
//};

//export default SignIn;
