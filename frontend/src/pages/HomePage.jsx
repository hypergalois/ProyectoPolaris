import React, { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import ProjectCard from "../components/ProjectCard";

function HomePage() {
	const { projects, getProjectsHome } = useProjects();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProjectsHome().then(() => setLoading(false));
	}, []);

	if (projects.length === 0) {
		return <p>No hay proyectos para mostrar</p>;
	}

	return (
		<>
			<h1>Estos serían los proyectos más destacados</h1>
			{loading ? (
				<p>Cargando proyectos...</p>
			) : (
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default HomePage;
