import { axiosInstance } from "./axios";

// TODO: Crear peticioens para obtener los proyectos

export const getDegreesRequest = () => axiosInstance.get("/degrees/names/form")
