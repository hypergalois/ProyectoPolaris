import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getProjectsRequest, getProjectsByUser, getProjectsHomeRequest, getProjectRequest, createProjectRequest, deleteProjectRequest, updateProjectRequest } from "../api/projects";

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
	const [requestedProject, setRequestedProject] = useState({});

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
			setRequestedProject(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProjectsByUser = async (id) => {
		try {
			const res = await getProjectsByUser(id);
			setRequestedProject(res.data);
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

	const updateProject = async (id, project) => {
		try {
			const res = await updateProjectRequest(id, project);
			setProjects(projects.map((p) => (p.id === id ? res.data : p)));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				requestedProject,
				createProject,
				getProjects,
				getProjectsHome,
				getProject,
				getProjectsByUser,
				deleteProject,
				updateProject,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};
