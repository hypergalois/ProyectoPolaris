import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const signupRequest = user => axiosInstance.post("/signup", user);

export const loginRequest = user => axiosInstance.post("/login", user);