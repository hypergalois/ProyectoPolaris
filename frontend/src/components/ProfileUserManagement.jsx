import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SearchUsers from "../components/profileComponents/SearchUsers";
import SearchResultsUsers from "../components/profileComponents/SearchResultsUsers";

const ProfileUserManagement = ({ project }) => {

	//const { users, getUsers } = useAuth();
	const [ users, setUsers ] = useState([]);
	const [ userSearch, setUserSearch ] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		//Promise.all([getUsers()]).then(() => setLoading(false));
		setUsers([{"id":"asdasdasdd"}])
		setLoading(false)
	}, []);

	useEffect(() => {
		if(users){

			setUserSearch(users.filter((user) => {
				const searchMatch = user.id.includes(searchQuery);
				return searchMatch;
			}))

		}
	}, [searchQuery]);

	return (
		<div className="max-w rounded overflow-hidden shadow-lg">
			<h1>User Management</h1>
			<SearchUsers
				setSearchQuery={setSearchQuery}
			/>
			{loading ? <p></p> : <SearchResultsUsers filteredUsers={userSearch} />}
		</div>
	);
};

export default ProfileUserManagement;
