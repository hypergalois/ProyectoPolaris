import InitialRegisterForm from "../components/InitialRegisterForm";
import HomePageLanding from "../components/HomePageLanding";

import NavBarNoAuth from "../components/NavBarNoAuth";

import { Link } from "react-router-dom";
import LandingPageBar from "../components/LandingPageBar";

const HomePageRegister = () => {
	return (
		<>
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="flex px-8">
				<div className="flex-1">
					<HomePageLanding />
				</div>
				<div className="flex-1 place-self-center text-center p-4 rounded-3xl bg-[#858585] text-white">
					<h1 className="mb-4 text-2xl font-bold">CREA TU CUENTA</h1>
					<h2 className="mb-4">
						Ya tienes una cuenta?{" "}
						<Link className="underline decoration-solid decoration-1" to="/">
							Iniciar sesión
						</Link>
					</h2>
					<InitialRegisterForm />
				</div>
			</div>
		</>
	);
};

export default HomePageRegister;
