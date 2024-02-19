import { axiosInstance } from "./axios";

export const getDegreesRequest = () => axiosInstance.get("/degrees/names/form")

export const getAreasRequest = () => axiosInstance.get("/areas")
