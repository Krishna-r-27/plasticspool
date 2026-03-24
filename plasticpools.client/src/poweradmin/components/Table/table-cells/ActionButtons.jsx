import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ActionButtons = ({ onView, onEdit, onDelete, onCustom, customLabel }) => {
    return (
        <div className="flex items-center gap-3">
            {onView && (
                <button
                    onClick={onView}
                    title="View"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-teal-400 text-teal-500 hover:bg-teal-50 transition"
                >
                    <FaEye size={16} />
                </button>
            )}

            {onEdit && (
                <button
                    onClick={onEdit}
                    title="Edit"
                    className="w-9 h-9 flex items-center justify-center rounded-full 
                   border border-emerald-400 text-emerald-500 hover:bg-emerald-50
 transition"
                >
                    <FaEdit size={16} />
                </button>
            )}
             

            {onDelete && (
                <button
                    onClick={onDelete}
                    title="Delete"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition"
                >
                    <MdDeleteForever size={18} />
                </button>
            )}
            {onCustom && (
                <button
                    onClick={onCustom}
                    title={customLabel || "Mark as Attended"}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-green-400 text-green-600 hover:bg-green-50 transition"
                >
                    {customLabel || "Mark as Attended"}
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
