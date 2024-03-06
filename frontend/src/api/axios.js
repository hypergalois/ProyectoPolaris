import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
// console.log("API", API);

export const axiosInstance = axios.create({
	baseURL: API,
	withCredentials: true,
	timeout: 10000,
});
