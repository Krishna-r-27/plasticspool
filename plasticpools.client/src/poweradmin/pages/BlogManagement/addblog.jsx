import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TinyEditor from "../../components/Forms/TinyEditor";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { IMAGE_BASE_URL } from "../../api/axios";

const AddBlog = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    // ================= STATE =================
    const [title, setTitle] = useState("");
    const [description1, setDescription1] = useState("");
   
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [metaDesc, setMetaDesc] = useState("");
    const [visible, setVisible] = useState("yes");

    const [loading, setLoading] = useState(false);



    // ================= LOAD DATA =================
    useEffect(() => {
        document.title = isEdit ? "Edit Blog | PowerAdmin" : "Add Blog | PowerAdmin";
        if (isEdit) loadBlog();
    }, [id]);


    const loadBlog = async () => {
        try {
            const res = await api.get(`/blog/get/${id}`);
            const b = res.data;

            setTitle(b.title);
            setDescription1(b.description1);
         
            setSeoTitle(b.seo_Title);
            setMetaDesc(b.seo_Meta_Description);
            setVisible(b.visible ? "yes" : "no");
            setExistingImage(b.image);
        } catch (err) {
            console.error(err);
        }
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Title is required");
            return;
        }
        if (!isEdit && !image) {
            alert("Please upload a Blog Image!");
            return;
        }
        const cleanDesc = description1.replace(/<[^>]*>/g, "").trim();
        if (!cleanDesc) {
            alert("Description 1 is required!");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("Title", title);
            formData.append("Description1", description1);
           
            formData.append("Seo_Title", seoTitle);
            formData.append("Seo_Meta_Description", metaDesc);
            formData.append("Visible", visible === "yes");

            if (image) formData.append("Image", image);

            if (isEdit) {
                await api.put(`/blog/update/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post("/blog/add/", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            navigate("/poweradmin/view-blog");

        } catch (err) {
            console.error(err);
            alert(isEdit ? "Update failed" : "Save failed");
        } finally {
            setLoading(false);
        }
    };

    // ================= UI =================
    return (
        <div className="min-h-screen">
            <PageHeader
                title={isEdit ? "Edit Blog" : "Add Blog"}
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin/poweradmin" },
                    { label: isEdit ? "Edit Blog" : "Add Blog" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold">
                    {isEdit ? "Edit Blog" : "Add Blog"}
                </h2>

                {/* TITLE */}
                <div className="mt-4">
                    <label className="font-medium">
                        Blog Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                {/* IMAGE */}
                <div className="mt-6">
                    <label className="font-medium">Blog Image <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full rounded border px-2 py-1"
                    />
                </div>

                {/* EXISTING IMAGE */}
                {isEdit && existingImage && (
                    <div className="mt-4">
                        <p className="font-medium mb-2">Existing Image</p>
                        <img
                             
                            src={`${IMAGE_BASE_URL}/${existingImage}`}
                            className="h-28 w-28 rounded object-cover border"
                        />
                    </div>
                )}

                {/* VISIBLE */}
                <div className="mt-6">
                    <p className="font-medium">Display on Frontend? <span className="text-red-500">*</span></p>
                    <label className="mr-4">
                        <input
                            type="radio"
                            checked={visible === "yes"}
                            onChange={() => setVisible("yes")}
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={visible === "no"}
                            onChange={() => setVisible("no")}
                        /> No
                    </label>
                </div>

                {/* DESCRIPTION 1 */}
                <div className="mt-6">
                    <label className="font-medium">Description 1 <span className="text-red-500">*</span></label>
                    <TinyEditor value={description1} onChange={setDescription1} />
                </div>

                {/* DESCRIPTION 2 */}
                 

                {/* SEO */}
                <SeoMetaSection
                    seoTitle={seoTitle}
                    setSeoTitle={setSeoTitle}
                    metaTags={metaDesc}
                    setMetaTags={setMetaDesc}
                />

                {/* SUBMIT */}
                <div className="mt-8 text-right">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="rounded-lg bg-indigo-600 px-6 py-2 text-white"
                    >
                        {loading ? "Saving..." : "Save Blog"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;