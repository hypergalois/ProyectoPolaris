import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext";

const ProjectDetails = ({ project: projectPopUp }) => {
	const projectId = projectPopUp.id;

	const { getProject, setProject, project } = useProjects();

	useEffect(() => {
        console.log("ProjectId", projectId)
        getProject(projectId);
        console.log("Projecto::::", project);
	}, [projectId]);

	return (
		<div className="container mx-auto p-0">
            <div className="container p-0 relative">
                <img src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800" alt={projectPopUp.title} className="w-full rounded-2xl" style={{ filter: 'brightness(0.9)' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <h1 className="text-3xl font-bold ml-6 absolute bottom-0 left-0 text-white p-4">{projectPopUp.title}</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">Description</h2>
                    <p className="text-gray-700">{projectPopUp.description}</p>
                    
                    <h2 className="text-xl font-bold mt-4 mb-2">Awards</h2>
					<ul className="list-disc list-inside">
                        {projectPopUp.awardsId && projectPopUp.awardsId.length > 0 ? (
                            projectPopUp.awardsId.map((awardId, index) => (
                                <li key={awardId}>{awardId}</li>
                            ))
                        ) : (
                            <p>Sin premios</p>
                        )}
					</ul>


                </div>
                {/* Resto del contenido */}
            </div>
        </div>
	);
};

export default ProjectDetails;
