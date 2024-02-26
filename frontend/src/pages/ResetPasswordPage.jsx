import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResetPasswordForm from "../components/ResetPasswordForm";
import NavBarNoAuth from "../components/NavBarNoAuth";
import LandingPageBar from "../components/LandingPageBar";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
	return (
		<>
			<NavBarNoAuth />
			<LandingPageBar />
			<div className="mx-auto max-w-lg p-4 rounded-3xl bg-[#858585] text-white text-center mt-16">
				<h1 className="mb-4 text-2xl font-bold">REESTABLECER CONTRASEÑA</h1>
				<h2 className="mb-4">Escribe tu nueva contraseña dos veces.</h2>
				<ResetPasswordForm />
			</div>
		</>
	);
};

export default ResetPasswordPage;
