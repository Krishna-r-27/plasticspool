import { useState, useEffect } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import Swal from 'sweetalert2';

function FundingTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Funding Applications | PowerAdmin";
        fetchData();
    }, []);

    //   GET LIST API
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get("/Funding/listapp");
            setData(res.data);
        } catch (err) {
            console.error("Error fetching funding data", err);
        } finally {
            setLoading(false);
        }
    };

    //   DELETE API
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this application!",
            icon: 'warning',
            width: '400px',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                toast.promise(
                    api.delete(`/Funding/${id}`),
                    {
                        loading: 'Deleting application...',
                        success: () => {
                            fetchData();
                            return 'Application deleted successfully';
                        },
                        error: 'Failed to delete application',
                    }
                );
            }
        });
    };

    //  TABLE COLUMNS
    const columns = [
        { title: "NAME", data: "name" },
        { title: "EMAIL", data: "email" },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onView={() =>
                            navigate(`/poweradmin/view-inquiry/${row.id}`)
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <PageHeader
                title="Attended Funding Applications"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Funding Applications" }
                ]}
            />

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <AppDataTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search applications..."
                />
            </div>
        </div>
    );
}

export default FundingTable;