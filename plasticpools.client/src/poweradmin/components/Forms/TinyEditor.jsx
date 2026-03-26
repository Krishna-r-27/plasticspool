import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../context/ThemeContext";

const TinyEditor = ({ value, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Editor
            key={theme} // 🔥 re-mount on toggle
            apiKey="vlsaumovx6o0d05ga5sq0g7xiudfvly9shujx8boq9qndic4"
            value={value}
            init={{
                height: 250,
                menubar: false,

                skin: isDark ? "oxide-dark" : "oxide",
                content_css: isDark ? "dark" : "default",

                plugins: [
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    "code",
                ],

                toolbar:
                    "undo redo | blocks | bold italic underline | " +
                    "bullist numlist | link media table | emoticons charmap | code",
            }}
            onEditorChange={(content) => onChange?.(content)}
        />
    );
};

export default TinyEditor;
