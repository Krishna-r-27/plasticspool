import { Link } from "react-router-dom";
import { HiPlus, HiOutlinePhotograph, HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";

const DashboardHeader = () => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200  bg-white p-6 backdrop-blur dark:bg-gray-900/40 dark:border-gray-800 ">

            {/* Welcome Text */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Welcome back, Admin 👋
                </h1>
                <p className="mt    -1 text-gray-400">
                    Here’s what’s happening in your system today
                </p>
            </div>

            {/* Quick Actions */}
            {/*<div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">*/}
            {/*    <QuickAction*/}
            {/*        to="/poweradmin/add-product"*/}
            {/*        icon={<HiPlus />}*/}
            {/*        label="Add Product"*/}
            {/*        color="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"*/}
            {/*    />*/}
            {/*    <QuickAction*/}
            {/*        to="/poweradmin/add-blog"*/}
            {/*        icon={<MdOutlinePostAdd />}*/}
            {/*        label="Add Blog"*/}
            {/*        color="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"*/}
            {/*    />*/}
            {/*    <QuickAction*/}
            {/*        to="/poweradmin/add-blog"*/}
            {/*        icon={<HiOutlinePhotograph />}*/}
            {/*        label="Add Banner"*/}
            {/*        color="bg-pink-500/10 text-pink-400 hover:bg-pink-500/20"*/}
            {/*    />*/}
            {/*    <QuickAction*/}
            {/*        to="/poweradmin/page-content"*/}
            {/*        icon={<HiOutlineDocumentText />}*/}
            {/*        label="Add Page"*/}
            {/*        color="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};

const QuickAction = ({ to, icon, label, color }) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium transition ${color}`}
        >
            <span className="text-lg">{icon}</span>
            {label}
        </Link>
    );
};

export default DashboardHeader;
