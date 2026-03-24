import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

DataTable.use(DT);

function AppDataTable({ data, columns, searchPlaceholder = "Search..." }) {
    return (
        <DataTable
            data={data}
            columns={columns}
            className="w-full text-sm stripe hover nowrap"
            options={{
                autoWidth: false,   // ✅ REQUIRED FOR COLUMN WIDTHS
                scrollCollapse: true,
                pageLength: 10,
                lengthMenu: [10, 25, 50, 100],
                pagingType: "simple_numbers",

                language: {
                    lengthMenu: "_MENU_ entries per page",
                    search: "",
                    searchPlaceholder,
                },

                dom: `
                  <"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
                    l
                    f
                  >
                  rt
                  <"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4"
                    i
                    p
                  >
                `,

                initComplete: function () {
                    const lengthSelect =
                        document.querySelector(".dt-length select");
                    if (lengthSelect) {
                        lengthSelect.className =
                            "border rounded-lg px-3 py-2 text-sm focus:outline-none bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)]";
                    }

                    const searchInput =
                        document.querySelector(".dt-search input");
                    if (searchInput) {
                        searchInput.className =
                            "border rounded-lg px-4 py-2 w-64 text-sm focus:outline-none bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)]";
                    }
                },
            }}
        />
    );
}

export default AppDataTable;
