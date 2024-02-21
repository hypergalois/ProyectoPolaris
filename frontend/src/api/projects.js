import { axiosInstance } from "./axios";

// TODO: Crear peticioens para obtener los proyectos

export const postProjectsRequest = (projectData, token) => axiosInstance.post("/projects", projectData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }
});
