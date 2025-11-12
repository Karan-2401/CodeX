import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_CLIENT_URL+'/api',
    withCredentials:true,
})
export default axiosInstance;