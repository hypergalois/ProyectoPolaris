import React from "react";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";

const ProfileDetails = ({ project }) => {

	const { profil, getProfile, errors: profileErrors } = useUser();

	useEffect(() => {
        getProfile()
    }, [])

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<h1>Details</h1>
			<p>{profil}</p>
		</div>
	);
};

export default ProfileDetails;
