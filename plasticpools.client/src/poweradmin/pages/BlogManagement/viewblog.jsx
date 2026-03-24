import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import Swal from "sweetalert2";

function BlogTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Blog Management | PowerAdmin";
        fetchData();
    }, []);

    // ================= GET LIST =================
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get("/blog/list");
            setData(res.data);
        } catch (err) {
            console.error("Error fetching blogs", err);
        } finally {
            setLoading(false);
        }
    };

    // ================= DELETE =================
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to delete this Blog!",
            icon: 'warning',
            width: '400px',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                container: 'dark:bg-gray-900',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    api.delete(`/blog/delete/${id}`),
                    {
                        loading: "Deleting blog...",
                        success: () => {
                            fetchData();
                            return "Blog deleted successfully";
                        },
                        error: "Failed to delete blog",
                    }
                );
            }
        });
    };

    // ================= COLUMNS =================
    const columns = [
        { title: "TITLE", data: "title" },
        {
            title: "VISIBLE",
            data: "visible",
            render: (val) =>
                `<span class="${val ? "text-green-600" : "text-red-500"
                } font-medium">
                    ${val ? "Yes" : "No"}
                </span>`,
        },

        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() =>
                            navigate(`/poweradmin/edit-blog/${row.id}`)
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
                title="Blog Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin/dashboard" },
                    { label: "Blog Management" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <AppDataTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search blog..."
                />
            </div>
        </div>
    );
}

export default BlogTable;