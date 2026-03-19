import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Thoda delay zaroori hai taake home page ka content pehle render ho jaye
            setTimeout(() => {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [hash]);

    return null;
};

export default ScrollToHash;