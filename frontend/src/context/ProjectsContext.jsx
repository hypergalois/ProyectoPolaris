import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getProjectsRequest, getProjectsByUserRequest, getProjectsHomeRequest, getProjectRequest, createProjectRequest, deleteProjectRequest, updateProjectRequest } from "../api/projects";
import { getAwardsRequest } from "../api/awards";

const ProjectsContext = createContext();

export const useProjects = () => {
	const context = useContext(ProjectsContext);
	if (!context) {
		throw new Error("useProjects must be used within an ProjectsProvider");
	}
	return context;
};

export const ProjectsProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [awards, setAwards] = useState([]);

	const createProject = async (project) => {
		try {
			const res = await createProjectRequest(project);
			setProjects([...projects, res.data]);
		} catch (error) {
			console.log(error);
		}
	};

	const getProjects = async () => {
		try {
			const res = await getProjectsRequest();
			setProjects(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProjectsHome = async () => {
		try {
			const res = await getProjectsHomeRequest();
			setProjects(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProject = async (id) => {
		try {
			const res = await getProjectRequest(id);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	const getProjectsByUser = async (id) => {
		try {
			const res = await getProjectsByUserRequest(id);
			setProjects(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProject = async (id) => {
		try {
			await deleteProjectRequest(id);
			setProjects(projects.filter((project) => project.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const pinProjectRequest = async (id) => {
		try {
			const res = await updateProjectRequest(id, { pinned: true });
			setProjects(projects.map((p) => (p.id === id ? res.data : p)));
		} catch (error) {
			console.log(error);
		}
	};

	const unpinProjectRequest = async (id) => {
		try {
			const res = await updateProjectRequest(id, { pinned: false });
			setProjects(projects.map((p) => (p.id === id ? res.data : p)));
		} catch (error) {
			console.log(error);
		}
	};

	const updateProject = async (id, project) => {
		try {
			const res = await updateProjectRequest(id, project);
			setProjects(projects.map((p) => (p.id === id ? res.data : p)));
		} catch (error) {
			console.log(error);
		}
	};

	const getAwards = async () => {
		try {
			const response = await getAwardsRequest();
			setAwards(response.data);
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				awards,
				createProject,
				getProjects,
				getProjectsHome,
				getProject,
				getProjectsByUser,
				pinProjectRequest,
				unpinProjectRequest,
				deleteProject,
				updateProject,
				getAwards,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};
