import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://codex-dvij2.sevalla.app/api',
    withCredentials:true,
})
export default axiosInstance;