import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";
import { rolesEnum } from "../../config/util.js";

const ProjectCard = ({ project }) => {
	const { pinProjectRequest } = useProjects();
	const { userRole, getUserRole } = useAuth();

	useEffect(() => {
		getUserRole();
	}, []);

	if (userRole === null) return null;

	const navigate = useNavigate();

	const handleClick = (projectId) => {
		// Navegar a otra página al hacer clic
		navigate(`/projects/${projectId}`);
	};

	const handlePin = () => {
		pinProjectRequest(project.id);
	};

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<img className="w-full" src={"http://localhost:5173/full-logo-utad.webp"} onClick={() => handleClick(project.id)} alt={project.title} />
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2" onClick={() => handleClick(project.id)}>
					{project.title}
				</div>
				<p className="text-gray-700 text-base">{project.description}</p>
			</div>
			<div className="px-6 pt-4 pb-2">
				{/* Si esperas tener 'studentsInvolved' pero no está en tus datos, asegúrate de incluir una lógica condicional o un valor predeterminado */}
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Estudiantes: {project.studentsInvolved || "No especificado"}</span>
				{/* Asegúrate de acceder a la propiedad 'name' del objeto 'degree' si existe, de lo contrario muestra un mensaje o valor predeterminado */}
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Titulación: {project.degree ? project.degree.name : "No especificada"}</span>
				{/* Corrige la propiedad que quieres mostrar, 'subject' en lugar de todo el objeto 'project' */}
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Asignatura: {project.subject || "No especificada"}</span>
			</div>
			{userRole === rolesEnum.ADMIN && (
				<div className="px-6 py-4 flex">
					<button onClick={handlePin} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
						{project.pinned ? "Pinned" : "Pin"}
					</button>
				</div>
			)}
		</div>
	);
};

export default ProjectCard;
