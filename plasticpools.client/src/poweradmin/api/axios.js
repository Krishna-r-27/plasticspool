import axios from "axios";
export const IMAGE_BASE_URL = "https://www.plasticspool.com";
//export const IMAGE_BASE_URL = "https://localhost:7067";
const api = axios.create({
    baseURL: "/api",
    //baseURL: "https://www.plasticspool.com/api",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export default api
    