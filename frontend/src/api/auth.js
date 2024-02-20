import { axiosInstance } from "./axios";

// TODO Crear peticiones para el registro y login de usuarios y verificacion

export const registerRequest = ( email, password, username, fullName, academicRole, academicCourse, department, promotion ) => axiosInstance.post("/register", email, password, username, fullName, academicRole, academicCourse, department, promotion );

export const loginRequest = (email, password) => axiosInstance.post("/login", email, password);

export const verifyTokenRequest = () => axiosInstance.get("/verify");

export const logoutRequest = () => axiosInstance.post("/logout");
