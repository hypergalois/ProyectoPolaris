import React from "react";
import { useParams } from 'react-router-dom';

const ProjectDetails = ({ project }) => {

	const { id } = useParams();


	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			{id}
		</div>
	);
};

export default ProjectDetails;
