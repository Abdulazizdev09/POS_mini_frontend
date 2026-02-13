import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://192.168.0.59:3000"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
})
export default api