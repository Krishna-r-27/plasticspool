//import {
//    HiOutlineChatAlt2,
//} from "react-icons/hi";
//import { useEffect, useState } from "react";
//import api from "../../api/axios";

//export default function DashboardStats() {
//    const [totalInquiry, setTotalInquiry] = useState(0);

//    useEffect(() => {
//        fetchCount();
//    }, []);

//    const fetchCount = async () => {
//        try {
//            const res = await api.get("/Funding/count");
//            setTotalInquiry(res.data.total);
//        } catch (err) {
//            console.error("Error fetching count", err);
//        }
//    };

//    const stats = [
//        {
//            label: "Total Inquiry",
//            value: totalInquiry,
//            icon: HiOutlineChatAlt2
           
//        },
//    ];

//    return (
//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//            {stats.map((item, index) => {
//                const Icon = item.icon;
//                return (
//                    <div
//                        key={index}
//                        className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5"
//                    >
//                        {/* Left */}
//                        <div className="flex items-center gap-4">
//                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
//                                <Icon size={24} />
//                            </div>

//                            <div>
//                                <h2 className="text-2xl font-semibold text-gray-900">
//                                    {item.value}
//                                </h2>
//                                <p className="text-sm text-gray-500">
//                                    {item.label}
//                                </p>
//                            </div>
//                        </div>

                      
                        
//                    </div>
//                );
//            })}
//        </div>
//    );
//}