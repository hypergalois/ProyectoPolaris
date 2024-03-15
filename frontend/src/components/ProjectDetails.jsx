import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext";

const ProjectDetails = () => {
	const { id: projectId } = useParams();

	const [project, setProject] = useState(null);

	const { getProject } = useProjects();

	useEffect(() => {
		const setNewProject = async () => {
			const newProject = await getProject(projectId);
			setProject(newProject);
		};

		setNewProject();
	}, [projectId]);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{project.title}</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h2 className="text-xl font-bold mb-2">Description</h2>
					<p className="text-gray-700">{project.description}</p>
					<h2 className="text-xl font-bold mt-4 mb-2">Awards</h2>
					<ul className="list-disc list-inside">
						{project.awardsId.map((awardId, index) => (
							<li key={awardId}>{awardId}</li>
						))}
					</ul>
					<h2 className="text-xl font-bold mt-4 mb-2">External Links</h2>
					<ul className="list-disc list-inside">
						{project.externalLinks.map((link, index) => (
							<li key={link}>
								<a href={link}>{link}</a>
							</li>
						))}
					</ul>
					<h2 className="text-xl font-bold mt-4 mb-2">Uploaded Content</h2>
					<ul className="list-disc list-inside">
						{project.uploadedContent.map((content, index) => (
							<li key={content}>{content}</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className="text-xl font-bold mb-2">Project Details</h2>
					<p>
						<strong>Personal Project:</strong> {project.personalProject ? "Yes" : "No"}
					</p>
					<p>
						<strong>Academic Course:</strong> {project.academicCourse}
					</p>
					<p>
						<strong>Course:</strong> {project.course}
					</p>
					<p>
						<strong>Letter:</strong> {project.letter}
					</p>
					<p>
						<strong>Subject ID:</strong> {project.subjectId}
					</p>
					<p>
						<strong>Degree ID:</strong> {project.degreeId}
					</p>
					<p>
						<strong>Implied Students:</strong> {project.impliedStudentsIDs.join(", ")}
					</p>
					<p>
						<strong>Implied Professors:</strong> {project.impliedProfessorsIDs.join(", ")}
					</p>
					<p>
						<strong>Created At:</strong> {project.createdAt}
					</p>
					<p>
						<strong>Updated At:</strong> {project.updatedAt}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
