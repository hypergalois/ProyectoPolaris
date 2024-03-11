import { axiosInstance } from "./axios";

export const getAreasRequest = () => axiosInstance.get("/areas");

export const getDegreesRequest = () => axiosInstance.get("/degrees/names/form");

export const getDegreesByAreaRequest = (areaId) => axiosInstance.get(`/degrees/area/${areaId}`);

export const getAwardsRequest = () => axiosInstance.get("/awards");
