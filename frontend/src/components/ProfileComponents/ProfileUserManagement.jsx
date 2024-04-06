import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import SearchUsers from "./SearchUsers.jsx";
import SearchResultsUsers from "./SearchResultsUsers.jsx";

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
