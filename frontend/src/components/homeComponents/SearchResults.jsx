import React from "react";
import ProjectCard from "../ProjectCardTest";

function SearchResults(props) {
    const { filteredProjects } = props;

    return (
        <div className="container mx-auto mx-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;