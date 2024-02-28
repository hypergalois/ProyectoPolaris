import React from "react";
import { useUser } from "../context/UserContext";
import { useProjects } from "../context/ProjectsContext";
import { useState, useEffect } from "react";

const ProfileRequests = ({ project }) => {

	const { profil, getProfile, errors: profileErrors } = useUser();
	const { projects, getProjectsByUser, errors: proyectsErrors } = useProjects();

	useEffect(()  => {
        getProfile()
    }, [])

	useEffect(() => {
        if (profil.id) {
			getProjectsByUser(profil.id);
		}
    }, [profil.id])

	useEffect(() => {
        if (projects) {
			console.log("Proyectos: ",projects);
		}
    }, [projects])

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<h1>Projects</h1>
			{projects.map((objeto) => (
				<div key={objeto.id}>
					<div>
						<strong>ID: {objeto.id}</strong>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProfileRequests;
