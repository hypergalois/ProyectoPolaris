import React from "react";
import ProjectCard from "../Cards/ProjectCard.jsx";

function SearchResults({ filteredProjects }) {
	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filteredProjects.length > 0 ? (
					filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
				) : (
					<div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center text-center p-10">
						<p className="font-bold text-blue-500 mb-6">No projects found</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default SearchResults;
