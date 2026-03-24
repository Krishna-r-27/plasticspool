import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

const MultiImageUpload = ({
    label = "Upload Images",
    required = false,
    maxSizeMB = 2,
    onChange,
}) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    const handleFiles = (selectedFiles) => {
        const validFiles = [];

        for (let file of selectedFiles) {
            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(`Each file must be under ${maxSizeMB}MB`);
                return;
            }
            validFiles.push({
                file,
                preview: URL.createObjectURL(file),
            });
        }

        setError("");
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        onChange?.(updatedFiles.map((f) => f.file));
    };

    const handleInputChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onChange?.(updated.map((f) => f.file));
    };

    return (
        <div className="mt-6">
            <label className="mb-2 block font-medium text-gray-700  dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Upload Box */}
            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex w-full cursor-pointer flex-col items-center justify-center
        rounded-xl border-2 border-dashed border-gray-300 bg-gray-50  dark:bg-gray-800  px-6 py-5
        text-center transition hover:border-indigo-400 hover:bg-indigo-50"
            >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <FiUpload className="h-5 w-5 text-gray-600" />
                </div>

                <p className="text-base font-medium text-gray-800  dark:text-white">
                    Drag & Drop Images Here
                </p>
                <p className="mt-1 text-sm text-gray-500  dark:text-white">
                    PNG, JPG, SVG - Multiple allowed
                </p>

                <span className="mt-2 text-sm font-medium text-indigo-600 underline  dark:text-white">
                    Browse Files
                </span>

                <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.svg"
                    className="hidden"
                    onChange={handleInputChange}
                />
            </label>

            {/* Error */}
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

            {/* Preview Grid */}
            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {files.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg border bg-white p-2"
                        >
                            <img
                                src={item.preview}
                                alt="preview"
                                className="h-28 w-full rounded-md object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
                            >
                                <FiX size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <p className="mt-2 text-sm text-gray-500 dark:text-white">
                Max size {maxSizeMB}MB per image | Recommended: 600 * 600 px
            </p>
        </div>
    );
};

export default MultiImageUpload;
