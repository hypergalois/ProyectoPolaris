// NO SE USA BORRAR
import LandingPageBar from "../../components/Navbars/LandingPageBar";
import NavBarNoAuth from "../../components/Navbars/NavBarNoAuth";
import SecondaryRegisterForm from "../../components/LoginRegisterForms/SecondaryRegisterForm";

const HomePageRegisterDetails = () => {
	return (
		<>
			<NavBarNoAuth />
			<div className="items-center">
				<LandingPageBar />
				<div className="flex justify-center">
					<div className="mx-auto text-center">
						<div className="mb-4 text-5xl font-bold">
							<h1>CREA TU CUENTA</h1>
						</div>
						<SecondaryRegisterForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePageRegisterDetails;
