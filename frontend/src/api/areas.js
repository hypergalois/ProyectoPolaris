import { axiosInstance } from "./axios";

export const getAreasRequest = () => axiosInstance.get("/areas");