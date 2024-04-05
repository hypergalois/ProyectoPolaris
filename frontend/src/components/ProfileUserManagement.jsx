import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SearchUsers from "./ProfileComponents/SearchUsers";
import SearchResultsUsers from "./ProfileComponents/SearchResultsUsers";

const ProfileUserManagement = ({ project }) => {
	const { users, getUsers } = useAuth();
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (searchQuery) {
			Promise.all([getUsers({ userName: searchQuery })]).then(() => {
				setLoading(false);
			});
		} else {
			setLoading(true);
		}
	}, [searchQuery]);

	return (
		<div className="container mx-auto">
			<h1>User Management</h1>
			<SearchUsers setSearchQuery={setSearchQuery} />
			{loading ? <p></p> : <SearchResultsUsers filteredUsers={users} />}
		</div>
	);
};

export default ProfileUserManagement;
