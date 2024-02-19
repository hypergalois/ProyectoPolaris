import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const dregreesRequest = () => axiosInstance.get("/degrees/names/form");

export const logoutRequest = () => axiosInstance.post("/logout");