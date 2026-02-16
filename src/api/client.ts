import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://192.168.0.59:3000"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
        'x-device-api-key': 'ttdev1_f0da4845-77ea-4e91-a3eb-357eede889e9_XrqdQCj2VF1Hm2wXvsLT1sn6rnlBT5QKeITyMLgEDZo',
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
})
export default api