import { axiosInstance } from "./axios";

export const postProjectsRequest = (projectData, token) =>
	axiosInstance.post("/projects", projectData, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});

export const getProjectsRequest = () => axiosInstance.get("/projects");

export const getProjectsHomeRequest = () => axiosInstance.get("/projects/home");

export const getProjectRequest = (id) => axiosInstance.get(`/projects/${id}`);

export const createProjectRequest = (project) => axiosInstance.post("/projects", project);

export const updateProjectRequest = (id, project) => axiosInstance.put(`/projects/${id}`, project);

export const deleteProjectRequest = (id) => axiosInstance.delete(`/projects/${id}`);

// Estas son para la busqueda
export const getProjectsByUser = (userId) => axiosInstance.get(`/projects/user/${userId}`);

export const getProjectsByCategory = (category) => axiosInstance.get(`/projects/category/${category}`);

export const getProjectsByKeyword = (keyword) => axiosInstance.get(`/projects/keyword/${keyword}`);

export const getProjectsByDate = (date) => axiosInstance.get(`/projects/date/${date}`);

export const getProjectsByTitle = (title) => axiosInstance.get(`/projects/title/${title}`);
