import { axiosInstance } from "./axios";

export const signupRequest = user => axiosInstance.post("/signup", user);

// etc