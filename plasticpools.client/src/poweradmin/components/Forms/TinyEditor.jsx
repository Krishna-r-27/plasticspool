import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../context/ThemeContext";

const TinyEditor = ({ value, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Editor
            key={theme} // 🔥 re-mount on toggle
            apiKey="3uc2a3cd1cu3wmf2pun16agsk8ilrfbwp9kw3xuqxaqz5yya"
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
