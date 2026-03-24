import axios from "axios";
export const IMAGE_BASE_URL = "https://dotcompreview.com/plasticspool";
//export const IMAGE_BASE_URL = "https://localhost:7067";
const api = axios.create({
  //  baseURL: "/api",
    baseURL: "/plasticspool/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
    