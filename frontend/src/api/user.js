import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const getEmail = () => axiosInstance.get("/getEmail");

export const getProfile = () => axiosInstance.get("/profile");