import React from "react";
import ProfileProjects from "../components/ProfileComponents/ProfileProjects.jsx";
import ProfileUserManagement from "../components/ProfileComponents/ProfileUserManagement.jsx";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

function ProjectHomePage() {
	const { userRole, getUserRole } = useAuth();
	const location = useLocation()
	const email = location.state ? location.state.email : null;

	useEffect(() => {
		getUserRole();
	}, []);

	return (
		<>
			<div className="items-center">
				<div className="flex justify-center h-screen">
					<div className="mx-auto text-center w-2/3">
						<div className="text-4xl mb-4">
							<h1>Mis Proyectos</h1>
						</div>
						<div className="mb-4">
							<ProfileProjects email={email}/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectHomePage;
