import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_CLIENT_URL,
    withCredentials:true,
})
export default axiosInstance;