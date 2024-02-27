import React from "react";
import { useUser } from "../context/UserContext";
import { useProjects } from "../context/ProjectsContext";
import { useState, useEffect } from "react";

const ProfileDetails = ({ project }) => {

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



	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<h1>Details</h1>
			{Object.entries(profil).map(([key, value]) => (
				<div key={key}>
				<strong>{key}:</strong> {value}
				</div>
			))}
		</div>
	);
};

export default ProfileDetails;
