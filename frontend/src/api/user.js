import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const checkEmailRequest = (email) => axiosInstance.post("/checkEmail", email);

export const getProfileRequest = () => axiosInstance.get("/profile");