import { axiosInstance } from "./axios";

export const getAwardsRequest = () => axiosInstance.get("/awards");