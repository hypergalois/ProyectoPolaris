import React from "react";
import ProfileDetails from "../components/ProfileComponents/ProfileDetails.jsx";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

function ProfilePage() {

	const location = useLocation()
	const email = location.state ? location.state.email : null;

	return (
		<>

			<ProfileDetails email={email}/>

		</>
	);
}

export default ProfilePage;
