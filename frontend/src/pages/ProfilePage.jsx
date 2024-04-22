import React from "react";
import ProfileDetails from "../components/ProfileComponents/ProfileDetails.jsx";
import ProfileProjects from "../components/ProfileComponents/ProfileProjects.jsx";
import ProfileUserManagement from "../components/ProfileComponents/ProfileUserManagement.jsx";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function ProjectHomePage() {

	return (
		<>

			<ProfileDetails />

		</>
	);
}

export default ProjectHomePage;
