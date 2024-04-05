import React from "react";
import NavBarNoAuth from "../../components/Navbars/NavBarNoAuth";
import { Link } from "react-router-dom";
import LandingPageBar from "../../components/Navbars/LandingPageBar";
import ForgotPasswordForm from "../../components/LoginRegisterForms/ForgotPasswordForm";
import { useAuth } from "../../context/AuthContext";

function ForgotPassword() {
	const { isResetTokenSent } = useAuth();

	return (
		<>
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="mx-auto max-w-xl place-self-center text-center p-6 rounded-3xl bg-blue-600 text-white mt-12">
				<h1 className="mb-4 text-3xl font-bold">REESTABLECER CONTRASEÑA</h1>
				{!isResetTokenSent ? (
					<>
						<h2 className="mb-6 text-xl">
							¿Te acordaste de la contraseña?{" "}
							<Link className="underline decoration-solid decoration-1" to="/">
								Iniciar sesión
							</Link>
						</h2>
						<ForgotPasswordForm />
					</>
				) : (
					<h1>Link de reset enviado correctamente</h1>
				)}
			</div>
		</>
	);
}

export default ForgotPassword;
