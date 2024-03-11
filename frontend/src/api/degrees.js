import { axiosInstance } from "./axios";

export const getDegreesRequest = () => axiosInstance.get("/degrees/names/form");

export const getDegreesByAreaRequest = (areaId) => axiosInstance.get(`/degrees/area/${areaId}`);