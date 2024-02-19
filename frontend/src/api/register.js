import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const degreesRequest = () => axiosInstance.get("/degrees/names/form");