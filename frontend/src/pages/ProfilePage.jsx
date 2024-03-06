import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileProjects from "../components/ProfileProjects";
import ProfileUserManagement from "../components/ProfileUserManagement";

function ProjectHomePage() {
	return (
		<>
			<h1>PerfilePage</h1>
			<ProfileDetails/>
			<ProfileProjects/>
			<ProfileUserManagement/>
		</>
	);
}

export default ProjectHomePage;
