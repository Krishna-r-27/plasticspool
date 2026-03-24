import {
    HiOutlineArrowLeft,
    HiOutlineMail,
    HiOutlineUser,
} from "react-icons/hi";
import { FiCalendar } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function FundingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "View Funding Application | PowerAdmin";
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const res = await api.get(`/Funding/${id}`);
            setData(res.data);
        } catch (error) {
            console.error("Failed to load data", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!data) return <div className="p-6">Application not found</div>;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Funding Application Details</h2>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                    <HiOutlineArrowLeft />
                    Back
                </button>
            </div>

            {/* BASIC INFO */}
            <Section title="Basic Information">
                <DetailItem label="Name" value={data.name} />
                <DetailItem  label="Email" value={data.email} />
                <DetailItem label="LinkedIn" value={data.linkedin} />
                <DetailItem label="Stage" value={data.stage} />
            </Section>

            {/* DESCRIPTION */}
            <FullWidth label="Describe business or venture" value={data.description} />

            {/* FUNDING */}
            <Section title="Funding Details">
                <DetailItem label="Funding Types" value={data.funding_types?.join(", ")} />
                <DetailItem label="Total amount of funding are seeking" value={data.amount} />
                <DetailItem label="primary problem of business or venture aims to solve" value={data.problem} />
                <DetailItem label="Milestones to achieve with this funding" value={data.milestones?.join(", ")} />

            </Section>

            {/* MARKET */}
            <Section title="Market & Revenue">
                <DetailItem label="Target Market Size" value={data.market_size} />
                <DetailItem label="Projected revenue for the next 1-3 years" value={data.revenue} />
            </Section>

            {/* TEAM */}
            <div className="mt-8">
                <h3 className="font-semibold mb-3">Team Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.team_exp &&
                        Object.entries(data.team_exp).map(([key, val]) => (
                            <DetailItem key={key} label={key} value={val} />
                        ))}
                </div>
            </div>

            {/* COMPETITIVE */}
            <Section title="Competitive & Financial">
                <DetailItem label="Competitive Advantage" value={data.competitive_advantage} />
                <DetailItem label="Percentage of equity Equity Offered" value={data.equity} />
                <DetailItem label="Timeline for achieving profitability" value={data.profitability_timeline} />
                <DetailItem label="Competitive landscape of business/venture" value={data.competitive_landscape} />
                <DetailItem label="Return on Investment" value={data.roi} />
                <DetailItem
                    icon={<FiCalendar />}
                    label="Submitted At"
                    value={formatDate(data.submitted_at)}
                />
            </Section>
            {/*<DetailItem*/}
            {/*    icon={<FiCalendar />}*/}
            {/*    label="Submitted At"*/}
            {/*    value={formatDate(data.submitted_at)}*/}
            {/*/>*/}
            {/* META */}
            {/*<Section title="Meta">*/}
            {/*    <DetailItem*/}
            {/*        icon={<FiCalendar />}*/}
            {/*        label="Submitted At"*/}
            {/*        value={formatDate(data.submitted_at)}*/}
            {/*    />*/}
            {/*    <DetailItem*/}
            {/*        icon={<FiCalendar />}*/}
            {/*        label="Updated At"*/}
            {/*        value={formatDate(data.updated_at)}*/}
            {/*    />*/}
            {/*    <DetailItem label="Status" value={data.status} />*/}
            {/*</Section>*/}

        </div>
    );
}

//   Section wrapper
const Section = ({ title, children }) => (
    <div className="mt-8">
        <h4 className="font-semibold mb-3">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

// Normal field
const DetailItem = ({ icon, label, value }) => (
    <div className="flex gap-3 border rounded-xl p-4 bg-gray-50">
        {icon && <div className="text-indigo-500">{icon}</div>}
        <div>
            <p className="text-base text-gray-500">{label}</p>
            <p className="font-medium">{value || "-"}</p>
        </div>
    </div>
);

//   Full width field (for description)
const FullWidth = ({ label, value }) => (
    <div className="mt-6 border rounded-xl p-4 bg-gray-50">
        <p className="text-base text-gray-500">{label}</p>
        <p className="mt-1">{value || "-"}</p>
    </div>
);

//   Date format
const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-IN");
};

export default FundingDetails;