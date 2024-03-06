import { axiosInstance } from "./axios";

export const getRequests = () => axiosInstance.get("/requests");

export const getRequestsByStatus = (status) => axiosInstance.get(`/requests/status/${status}`);

export const acceptRequest = (id) => axiosInstance.post(`/requests/accept/${id}`);

export const rejectRequest = (id) => axiosInstance.post(`/requests/reject/${id}`);