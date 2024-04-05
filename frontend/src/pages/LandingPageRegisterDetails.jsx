import LandingPageBar from "../components/LandingPageBar";
import NavBarNoAuth from "../components/Navbars/NavBarNoAuth";
import SecondaryRegisterForm from "../components/SecondaryRegisterForm";

const HomePageRegister = () => {
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

export default HomePageRegister;
