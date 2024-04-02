import { axiosInstance } from "./axios";

export const registerRequest = (email, password, username, fullName, academicRole, academicCourse, department, promotion) => axiosInstance.post("/register", email, password, username, fullName, academicRole, academicCourse, department, promotion);

export const loginRequest = (email, password) => axiosInstance.post("/login", email, password);

export const verifyTokenRequest = () => axiosInstance.get("/verify");

export const logoutRequest = () => axiosInstance.post("/logout");

export const forgotPasswordRequest = (email) => axiosInstance.post("/forgotPassword", email);

export const resetPasswordRequest = (token, password) => axiosInstance.post("/resetPassword", token, password);

export const verifyEmailRequest = (token) => axiosInstance.post("/verifyEmail", token);

export const checkEmailRequest = (email) => axiosInstance.post("/checkEmailRegister", email);

export const getProfileRequest = () => axiosInstance.post("/profile");

export const getUserRequest = (email) => axiosInstance.post("/getUser", email);

export const getUserRoleRequest = () => axiosInstance.get("/getUserRole");