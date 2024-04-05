import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResetPasswordForm from "../components/ResetPasswordForm";
import NavBarNoAuth from "../components/Navbars/NavBarNoAuth";
import LandingPageBar from "../components/Navbars/LandingPageBar";
import { Link, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
	// Necesito: 1. Verificar el token que me llega por URL
	// 2. Si es válido, mostrar el formulario de cambio de contraseña
	// 3. Mandar la nueva contraseña junto con el token por si acaso

	const [searchParams] = useSearchParams();
	// console.log(searchParams.toString());
	const resetToken = searchParams.get("resetToken");
	console.log(resetToken);

	return (
		<>
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="mx-auto max-w-lg p-4 rounded-3xl bg-[#858585] text-white text-center mt-12">
				<h1 className="mb-4 text-2xl font-bold">REESTABLECER CONTRASEÑA</h1>
				<h2 className="mb-4">Escribe tu nueva contraseña dos veces.</h2>
				<ResetPasswordForm resetToken={resetToken} />
			</div>
		</>
	);
};

export default ResetPasswordPage;
