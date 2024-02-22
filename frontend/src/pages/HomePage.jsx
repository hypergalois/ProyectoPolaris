import React from "react";
import { useProjects } from "../context/ProjectsContext";
import { useState, useEffect } from "react";
// import { ProjectCard } from "../components/ProjectCard";
import ProjectCard from "../components/ProjectCard";

function HomePage() {
	// Creo datos de prueba hasta que funcione bien el formulario
	const exampleProjects = [
		{
			id: 1,
			title: "Desarrollo de una aplicación móvil educativa",
			description: "Este proyecto consiste en el desarrollo de una aplicación móvil que facilita el aprendizaje de matemáticas para estudiantes de secundaria.",
			thumbnail: "https://pbs.twimg.com/profile_images/1669466617409880067/ErRoSTXm_400x400.jpg",
			studentsInvolved: "4 estudiantes",
			degree: "Ingeniería Informática",
			subject: "Desarrollo de Aplicaciones Móviles",
		},
		{
			id: 2,
			title: "Sistema de gestión de biblioteca digital",
			description: "Un sistema web que permite a los usuarios buscar, reservar y prestar libros digitales de forma eficiente.",
			thumbnail: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt2882a55d0f632468/6567ab7cae7c62040a028867/GOAL_-_Blank_WEB_-_Facebook_(31).jpg?auto=webp&format=pjpg&width=3840&quality=60",
			studentsInvolved: "3 estudiantes",
			degree: "Ingeniería del Software",
			subject: "Gestión de Proyectos de Software",
		},
		{
			id: 3,
			title: "Análisis de datos en el deporte",
			description: "Proyecto de análisis de datos que utiliza estadísticas de deportes para predecir resultados de partidos y rendimiento de jugadores.",
			thumbnail: "https://s.yimg.com/ny/api/res/1.2/j7cmTIAA0R8T_K42DMOk7A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQwMA--/https://media.zenfs.com/en/the_telegraph_258/c88dd3240087eedbc83ca919108964eb",
			studentsInvolved: "5 estudiantes",
			degree: "Ciencias de la Actividad Física y del Deporte",
			subject: "Estadística Aplicada al Deporte",
		},
	];

	return (
		<>
			<h1>Estos serian los proyectos mas destacados</h1>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{exampleProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>
		</>
	);
}

// Ojo, esta es la home de despues de auth
export default HomePage;
