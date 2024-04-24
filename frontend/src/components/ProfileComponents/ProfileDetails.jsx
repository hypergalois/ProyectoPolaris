import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";

const ProfileDetails = ({ email }) => {
	const { user, getUser, getProfile, errors: profileErrors } = useAuth();


	useEffect(() => {
		if(email){
			getUser(email);
		}else{
			getProfile();
		}
	}, []);

	return (
		<>
			<div className="flex justify-center">
				<div className="w-2/3">
					<div className="flex justify-center mb-4 ">
						<div className="w-2/3">
							<div className="text-4xl mb-4">
								<h1>ProfilePage</h1>
							</div>
							<a>Mantén la privacidad de tus datos personales. 
								Cualquier usuario que pueda ver tus perfiles puede ver la información que añades aquí.</a>
							{Object.entries(user).map(([key, value]) => (
								<div key={key}>
									<strong>{key}:</strong> {value}
								</div>
							))}
						</div>
						<div className="w-1/3">
							<div className="text-4xl mb-4">
								<h1>ProfilePage</h1>
							</div>
						</div>
					</div>	
				</div>
			</div>
		</>
		
	);
};

export default ProfileDetails;
