import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectRequest } from "../api/projects";

const ProjectDetails = () => {
	const { id : projectId } = useParams();

	const [project, setProject] = useState(null);

	useEffect(() => {
		const getProject = async () => {
			try {
				const res = await getProjectRequest(projectId);
				setProject(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		getProject();
	}, [projectId]);

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<h1>Details</h1>
			{ project ?
				Object.entries(project).map(([key, value]) => (
					<div key={key}>
						<strong>{key}:</strong> {value}
					</div>
				)) :
				<p>Project not found</p>
			}
		</div>
	);
};

export default ProjectDetails;
