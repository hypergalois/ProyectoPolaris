import LoginForm from "../components/LoginForm";
import HomePageBar from "../components/HomePageBar";
import HomePageAnimation from "../components/HomePageAnimation";

import NavBarNoAuth from "../components/NavBarNoAuth.jsx";

import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="items-center h-screen">
			<HomePageAnimation />
			<NavBarNoAuth />
			<HomePageBar />
			<div className="flex justify-center">
				<div className="mx-auto text-center">
					<div className="text-8xl text-[#858585] font-bold mb-8">
						<h1>¡Bienvenido!</h1>
					</div>
					<div className="text-xl font-semibold mb-12">
						<h2>Descubre y conecta con los proyectos que están dando forma al futuro digital en U-Tad</h2>
					</div>
					<LoginForm />
					<footer className="text-xl">
						<p>
							¿Olvidaste tu contraseña?{" "}
							<a className="underline decoration-solid decoration-1" href="/forgot-password">
								Recupérala
							</a>
						</p>
						<p>
							¿Eres nuevo en U-Tad?{" "}
							<Link className="underline decoration-solid decoration-1" to="/register">
								Registrate
							</Link>
						</p>
					</footer>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
