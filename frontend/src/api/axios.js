import axios from "axios";

const API = "http://localhost:4000/api";

export const axiosInstance = axios.create({
    baseURL: API,
    withCredentials: true,
    timeout: 10000
});