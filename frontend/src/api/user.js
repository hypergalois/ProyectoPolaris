import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const getEmailRequest = () => axiosInstance.get("/getEmail");

export const getProfileRequest = () => axiosInstance.get("/profile");