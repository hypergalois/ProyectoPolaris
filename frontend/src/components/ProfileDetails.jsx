import React from "react";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

const ProfileDetails = ({ project }) => {
	const { profile, getProfile, errors: profileErrors } = useUser();

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<h1>Details</h1>
			{Object.entries(profile).map(([key, value]) => (
				<div key={key}>
					<strong>{key}:</strong> {value}
				</div>
			))}
		</div>
	);
};

export default ProfileDetails;
