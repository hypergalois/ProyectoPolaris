import { useState } from "react";

import InitialRegisterForm from "../../components/LoginRegisterForms/InitialRegisterForm.jsx";
import SecondaryRegisterForm from "../../components/LoginRegisterForms/SecondaryRegisterForm.jsx";
import HomePageLanding from "../../components/HomePageLanding.jsx";

import NavBarNoAuth from "../../components/Navbars/NavBarNoAuth.jsx";

import { Link } from "react-router-dom";
import LandingPageBar from "../../components/Navbars/LandingPageBar.jsx";

import Popup from "../../components/Popup.jsx";

const HomePageRegister = () => {
	// Vamos a manejar la visibilidad del popup del registro secundario
	const [openPopup, setOpenPopup] = useState(false);
	const [initialRegistrationData, setInitialRegistrationData] = useState({ email: "", fullName: "" });

	console.log(initialRegistrationData);

	const handleOpenPopup = (data) => {
		setInitialRegistrationData(data);
		setOpenPopup(true);
	};

	const handleClosePopup = () => {
		setOpenPopup(false);
	};

	return (
		<>
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="flex flex-col md:flex-row px-4 md:px-16 w-full mb-4">
				<div className="flex-1 mb-8 md:mb-0">
					<HomePageLanding />
				</div>
				<div className="flex-1 place-self-center text-center p-6 rounded-3xl bg-blue-600 text-white">
					<h1 className="mt-6 mb-4 text-3xl font-bold ">CREA TU CUENTA</h1>
					<h2 className="mb-6 text-xl">
						¿Ya tienes una cuenta?{" "}
						<Link className="underline decoration-solid decoration-1" to="/">
							Iniciar sesión
						</Link>
					</h2>
					<InitialRegisterForm onSuccess={handleOpenPopup} />
				</div>
			</div>
			<Popup title="CREA TU CUENTA" openPopup={openPopup} closePopup={handleClosePopup}>
				<SecondaryRegisterForm initialRegistrationData={initialRegistrationData} closePopup={handleClosePopup} />
			</Popup>
		</>
	);
};

export default HomePageRegister;
