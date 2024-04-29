import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProfileDetails = ({ email }) => {
	const { user, getUser, getProfile, errors: profileErrors } = useAuth();
	const [editable, setEditable] = useState(false)
	const [userData, setUserData] = useState(user);

	useEffect(() => {
		if(email){
			getUser({"email":email});
		}else{
			getProfile();
			setEditable(true)
		}
	}, []);

	useEffect(() => {
		setUserData(user);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleButtonClick = () => {
		console.log("hola")
		
	};	

	return (
		<>
			<div className="flex justify-center">
				<div className="w-2/3 mb-4 bg-white text-black rounded-xl p-4">
					<div className="flex justify-center mb-4 p-4">
						<div className="w-2/3">
							<div className="text-4xl mb-4 text-blue-500">
								<h1>ProfilePage</h1>
							</div>
							<div className="mb-4">
								<a>Mantén la privacidad de tus datos personales. 
								Cualquier usuario que pueda ver tus perfiles puede ver la información que añades aquí.</a>
							</div>
							{editable ? (
								<form>
									{Object.entries(userData).map(([key, value]) => (
										<div key={key} className="mb-4">
											<label className="block mb-1 font-bold">{key}</label>
											<input
												type="text"
												name={key}
												value={value}
												onChange={handleChange}
												className="block w-full px-3 py-2 border rounded-md"
											/>
										</div>
									))}
								</form>
							) : (
								<div>
									{Object.entries(userData).map(([key, value]) => (
										<div key={key} className="mb-4">
											<label className="block mb-1 font-bold">{key}</label>
											<span>{value}</span>
										</div>
									))}
								</div>
							)}
						</div>
						<div className="w-1/3 mb-4 p-4 relative">
							<div className="text-lg mb-4 absolute top-0 right-0" onClick={handleButtonClick}>
								<button className="text-white bg-blue-500 px-4 py-2 rounded-xl" onClick={handleButtonClick}>
									<Link
										to="/userProyects"
										state={{ email: user.email }}
									>
										Proyectos
									</Link>
								</button>
							</div>
						</div>
					</div>	
					{editable && (
						<div className="mb-4 p-4 relative">
							<div className="text-xl mb-4 absolute bottom-0 right-0" onClick={handleButtonClick}>
								<button className="text-white bg-blue-500 px-4 py-2 rounded-xl" onClick={handleButtonClick}>
									Guardar
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
		
	);
};

export default ProfileDetails;
