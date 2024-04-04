import React from "react";
import GroupIcon from "@mui/icons-material/Group"; // Asegúrate de instalar @mui/icons-material si aún no lo has hecho.

const ProjectCard = ({ project }) => {
	return (
		<div className="max-w-md md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto my-4 flex flex-col bg-white rounded-lg overflow-hidden shadow-lg">
			<div className="relative">
				<img className="w-full h-60 object-cover" src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800" alt="" />
				<span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md">Animación</span>
			</div>
			<div className="p-4 flex flex-col justify-end flex-grow">
				<h5 className="text-lg text-gray-900">{project.title}</h5>
				<p className="text-gray-700 flex items-center mt-2">
					<GroupIcon /> Nombre de los alumnos
				</p>
			</div>
		</div>
	);
};

export default ProjectCard;
