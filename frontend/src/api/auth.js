import { axiosInstance } from "./axios";

export const signupRequest = user => axiosInstance.post("/signup", user);

export const loginRequest = user => axiosInstance.post("/login", user);