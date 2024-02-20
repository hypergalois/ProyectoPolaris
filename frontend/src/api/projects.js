import { axiosInstance } from "./axios";

// TODO: Crear peticioens para obtener los proyectos

export const postProjectsRequest = project => axiosInstance.post("/projects", project);
