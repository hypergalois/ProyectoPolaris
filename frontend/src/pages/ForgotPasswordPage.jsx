import React from "react";
import NavBarNoAuth from "../components/NavBarNoAuth";
import InitialRegisterForm from "../components/InitialRegisterForm";
import { Link } from "react-router-dom";

function ForgotPassword() {
	return (
		<>
			<NavBarNoAuth />
			<div className="mx-auto max-w-lg p-4 rounded-3xl bg-[#858585] text-white text-center">
				<h1 className="mb-4 text-2xl font-bold">CREA TU CUENTA</h1>
				<h2 className="mb-4">
					Ya tienes una cuenta?{" "}
					<Link className="underline decoration-solid decoration-1" to="/">
						Iniciar sesión
					</Link>
				</h2>
				<InitialRegisterForm />
			</div>
		</>
	);
}

export default ForgotPassword;
