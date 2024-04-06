import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProjects } from "../../context/ProjectsContext.jsx";
import { useState, useEffect } from "react";
import ProjectCard from "../Cards/ProjectCard.jsx";

const ProfileProjects = ({ props }) => {
	const { profile, getProfile, errors: profileErrors } = useAuth();
	const { projects, getProjectsByUser, errors: proyectsErrors } = useProjects();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProfile();
	}, []);

	useEffect(() => {
		if (profile.id) {
			console.log(profile.id);
			getProjectsByUser(profile.id).then(() => setLoading(false));
		}
	}, [profile]);

	useEffect(() => {
		if (projects) {
			console.log("Proyectos: ", projects);
		}
	}, [projects]);

	return (
		<div className="max-w rounded overflow-hidden shadow-lg">
			<h1>Projects</h1>
			{loading ? (
				<p>Cargando proyectos...</p>
			) : projects.length === 0 ? (
				<p>No hay proyectos para mostrar</p>
			) : (
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileProjects;
