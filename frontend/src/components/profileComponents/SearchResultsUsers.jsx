import React from "react";
import { useForm, Controller } from "react-hook-form";

function SearchResultsUsers(props) {
	const { filteredUsers } = props;

	const {
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onChange = handleSubmit(async () => {});

	return (
		<div className="container mx-auto m-8 ">
			{filteredUsers ? (
				filteredUsers.map((user) => (
					<div key={user.id} className="flex justify-between space-x-4 mb-4">
						<div className="items-center">{user.username}</div>
						<div className="flex space-x-4 items-center justify-end">
							{" "}
							{/* Alineación a la derecha */}
							<button onClick={onChange} className="h-14 px-3 sm:px-6 bg-blue-600 hover:bg-blue-400 text-white font-bold">
								Modificar
							</button>
							<button onClick={onChange} className="h-14 px-3 sm:px-6 bg-blue-600 hover:bg-blue-400 text-white font-bold">
								Eliminar
							</button>
						</div>
					</div>
				))
			) : (
				<p>No users found.</p>
			)}
		</div>
	);
}

export default SearchResultsUsers;
