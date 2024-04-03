import React from "react";
import ProjectCard from "../ProjectCardTest";

function SearchResultsUsers(props) {
    const { filteredUsers } = props;

    return (
        <div className="container mx-auto mx-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((project) => (
                        <div key={project.id}>{project.id} {JSON.stringify(project)}</div>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResultsUsers;