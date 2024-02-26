import { axiosInstance } from "./axios";

export const getRequests = () => axiosInstance.get("/requests");

export const getRequestsByStatus = (status) => axiosInstance.get(`/requests/status/${status}`);