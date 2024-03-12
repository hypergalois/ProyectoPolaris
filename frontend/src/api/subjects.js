import { axiosInstance } from "./axios";

export const getSubjectsRequest = () => axiosInstance.get("/subjects");

export const getSubjectsByDegreeRequest = (degreeId) => axiosInstance.get(`/subjects/${degreeId}`);