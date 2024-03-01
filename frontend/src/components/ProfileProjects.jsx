import React from "react";
import { useUser } from "../context/UserContext";
import { useProjects } from "../context/ProjectsContext";
import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";


const ProfileRequests = ({ project }) => {

	const { profil, getProfile, errors: profileErrors } = useUser();
	const { projects, getProjectsByUser, errors: proyectsErrors } = useProjects();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
        getProfile()
	}, []);


	useEffect(() => {
        if (profil.id) {
			getProjectsByUser(profil.id).then(() => setLoading(false));
		}
    }, [profil.id]);

	useEffect(() => {
        if (projects) {
			console.log("Proyectos: ",projects);
		}
    }, [projects])

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
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

export default ProfileRequests;
