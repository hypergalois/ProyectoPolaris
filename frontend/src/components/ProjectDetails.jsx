import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext";

const ProjectDetails = ({ project: projectPopUp }) => {
	const projectId = projectPopUp.id;

	const { getProject, setProject, project } = useProjects();

	useEffect(() => {
        console.log("ProjectId", projectId)
        getProject(projectId);
        console.log(project)
	}, [projectId]);

	return (
		<div className="container mx-auto p-0">
            <div className="container p-0 relative">
                <img src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800" alt={project.title} className="w-full rounded-2xl" style={{ filter: 'brightness(0.9)' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                    <h1 className="text-3xl font-bold mb-8 absolute bottom-0 left-0 text-white p-4">{project.title}</h1>
                    <div className="absolute bottom-0 left-0 text-white p-4" style={{ zIndex: '1' }}>
                        {project.impliedStudentsIDs && project.impliedStudentsIDs.length > 0 && (
                            <div>
                                <p>{project.impliedStudentsIDs.join(', ')}</p>
                            </div>
                        )}
                    </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-6 pl-6">
                <div className="relative flex items-center">
                    <div className="rounded-full bg-blue-200 p-2 flex items-center justify-center">
                        <p className="text-lg font-bold">{project.degreeId}</p>
                    </div>

                    <div className="h-10 flex items-center justify-center">
                        <div className="w-1 h-10 bg-blue-500 mx-4"></div>
                    </div>

                    <p className="text-lg font-bold">{project.academicCourse}</p>

                    <div className="h-10 justify-center">
                        <div className="w-1 h-10 bg-blue-500 mx-4"></div>
                    </div>

                    <div className="flex ml-4">
                    <p className="text-lg font-bold">
                        {project.personalProject ? "Proyecto personal" : project.subjectId}
                    </p>
                </div>
                    
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 pr-6 pb-6">
                <div>
                    <div className="mt-4">
                        <p className="text-xl font-bold mb-2">Premios:</p>
            
                        {project.awardsId && project.awardsId.length > 0 ? (
                            <ul className="flex flex-wrap">
                                {project.awardsId.map((awardId, index) => (
                                    <li key={index} className="text-white gap-2 bg-blue-900 rounded-lg p-4">{awardId}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white">Sin premios</p>
                        )}
                    </div>

                    <h2 className="text-xl font-bold mb-2 mt-4">Descripcion:</h2>
                    <p className="text-gray-700">{project.description}</p>
                </div>
                
                <div>
                {project.keywords && project.keywords.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xl font-bold mb-2">Palabras clave:</p>

                        <ul className="flex flex-wrap">
                            {project.keywords.map((keyword, index) => (
                                <li key={index} className="text-blue-900 bg-blue-200 rounded-full py-1 px-4 m-1">{keyword}</li>
                            ))}
                        </ul>
                    </div>
                )}

                </div>
            </div>
        </div>
	);
};

export default ProjectDetails;
