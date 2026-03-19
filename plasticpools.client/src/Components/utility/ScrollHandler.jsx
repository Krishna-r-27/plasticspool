import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    // Only scroll if a real element exists with that id
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                    // No matching element (e.g. #customized is a tab, not a DOM id)
                    // Just scroll to top of page
                    window.scrollTo(0, 0);
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollHandler;