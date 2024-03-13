import LoginForm from "../components/LoginForm";
import LandingPageBar from "../components/LandingPageBar.jsx";

import NavBarNoAuth from "../components/NavBarNoAuth.jsx";

import { Link } from "react-router-dom";
import LandingPageAnimation from "../components/LandingPageAnimation.jsx";

const HomePage = () => {
	return (
		<>
			<NavBarNoAuth />
			<LandingPageAnimation />
			<LandingPageBar />

			<div className="flex flex-col justify-center items-center w-full px-4 ">
				<div className="mx-auto text-center">
					<div className="text-5xl md:text-8xl font-bold mb-4 md:mb-8">
						<h1>¡Bienvenido!</h1>
					</div>
					<div className="text-lg md:text-xl font-semibold mb-8 md:mb-16">
						<h2>Descubre y conecta con los proyectos que están dando forma al futuro digital en U-Tad</h2>
					</div>
					<LoginForm />
					<footer className="text-sm mt-8 md:mt-12">
						<p>
							¿Olvidaste tu contraseña?{" "}
							<Link className="underline decoration-solid decoration-1" to="/forgot-password">
								Recupérala
							</Link>
						</p>
						<p>
							¿Eres nuevo en U-Tad?{" "}
							<Link className="underline decoration-solid decoration-1" to="/register">
								Regístrate
							</Link>
						</p>
					</footer>
				</div>
			</div>
		</>
	);
};

export default HomePage;
