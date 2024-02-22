import LandingPageBar from "../components/LandingPageBar";
import NavBarNoAuth from "../components/NavBarNoAuth";
import SecondaryRegisterForm from "../components/SecondaryRegisterForm";

const HomePageRegister = () => {
	return (
		<>
			<NavBarNoAuth />
			<div className="bg-[#858585] text-white  items-center">
				<LandingPageBar />
				<div className="flex justify-center h-screen">
					<div className="mx-auto text-center">
						<div className="text-4xl mb-4">
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
