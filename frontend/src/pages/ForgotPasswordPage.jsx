import React from "react";
import NavBarNoAuth from "../components/NavBarNoAuth";
import { Link } from "react-router-dom";
import LandingPageBar from "../components/LandingPageBar";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function ForgotPassword() {
	return (
		<>
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="mx-auto max-w-lg p-4 rounded-3xl bg-[#858585] text-white text-center mt-16">
				<h1 className="mb-4 text-2xl font-bold">REESTABLECER CONTRASEÑA</h1>
				<h2 className="mb-4">
					¿Te acordaste de la contraseña?{" "}
					<Link className="underline decoration-solid decoration-1" to="/">
						Iniciar sesión
					</Link>
				</h2>
				<ForgotPasswordForm />
			</div>
		</>
	);
}

export default ForgotPassword;
