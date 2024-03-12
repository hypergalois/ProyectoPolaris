import { useState } from "react";

import InitialRegisterForm from "../components/InitialRegisterForm";
import SecondaryRegisterForm from "../components/SecondaryRegisterForm";
import HomePageLanding from "../components/HomePageLanding";

import NavBarNoAuth from "../components/NavBarNoAuth";

import { Link } from "react-router-dom";
import LandingPageBar from "../components/LandingPageBar";

import Popup from "../components/Popup.jsx";

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
				<div className="flex-1 place-self-center text-center p-6 rounded-3xl bg-[#2d2d2d] text-white">
					<h1 className="mb-4 text-2xl font-bold">CREA TU CUENTA</h1>
					<h2 className="mb-4">
						¿Ya tienes una cuenta?{" "}
						<Link className="underline decoration-solid decoration-1" to="/">
							Iniciar sesión
						</Link>
					</h2>
					<InitialRegisterForm onSuccess={handleOpenPopup} />
				</div>
			</div>

			{/* <div className=" flex items-center justify-center">
				<button type="button" onClick={handleOpenPopup} className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
					Open dialog
				</button>
			</div> */}
			{/* <PopupSecondaryRegisterForm openPopup={openPopup} closePopup={handleClosePopup} initialRegistrationData={initialRegistrationData}></PopupSecondaryRegisterForm> */}
			{/* <Popup title="CREA TU CUENTA" openPopup={openPopup} closePopup={handleClosePopup}>
				<SecondaryRegisterForm initialRegistrationData={initialRegistrationData} closePopup={handleClosePopup} />
			</Popup> */}
			<Popup title="CREA TU CUENTA" openPopup={openPopup} closePopup={handleClosePopup}>
				<SecondaryRegisterForm initialRegistrationData={initialRegistrationData} closePopup={handleClosePopup} />
			</Popup>
		</>
	);
};

export default HomePageRegister;
