import LoginForm from "../components/LoginForm";
import LandingPageBar from "../components/LandingPageBar.jsx";

import NavBarNoAuth from "../components/NavBarNoAuth.jsx";

import { Link } from "react-router-dom";
import LandingPageAnimation from "../components/LandingPageAnimation.jsx";

const HomePage = () => {
	return (
		<div className="items-center h-screen">
			<LandingPageAnimation />
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="flex justify-center">
				<div className="mx-auto text-center">
					<div className="text-8xl text-[#858585] font-bold mb-8">
						<h1>¡Bienvenido!</h1>
					</div>
					<div className="text-xl font-semibold mb-16">
						<h2>Descubre y conecta con los proyectos que están dando forma al futuro digital en U-Tad</h2>
					</div>
					<LoginForm />
					<footer className="text-sm">
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
		</div>
	);
};

export default HomePage;
