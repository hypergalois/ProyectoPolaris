import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";

const ProfileDetails = ({ project }) => {
	const { profile, getProfile, errors: profileErrors } = useAuth();

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div className="max-w rounded overflow-hidden shadow-lg">
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
