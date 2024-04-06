import React from "react";
import ProjectDetails from "../components/ProjectDetails.jsx";

function ProjectDetail() {
	return (
		<div className="items-center">
			<div className="flex justify-center h-screen">
				<div className="mx-auto text-center">
					<h1>ProjectDetail</h1>
					<ProjectDetails />
				</div>
			</div>
		</div>
	);
}

export default ProjectDetail;
