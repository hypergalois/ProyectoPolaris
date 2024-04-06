import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function VerifyEmailPage() {
	// Tenemos que comprobar los parametros de la url
	// En un useEffect comprobamos si el token es valido, y si lo es, cambiamos el estado de isEmailVerified
	// http://localhost:5173/verify-email?verifyToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvc2UuZGVsZ2FkbzJAbGl2ZS51LXRhZC5jb20iLCJpYXQiOjE3MDk3NzYzMDgsImV4cCI6MTcwOTgxMjMwOH0.3cN5X75U7-z7VnimzXn9tH9oyb-RqrT4U2D8NN-qcQc
	const [searchParams] = useSearchParams();
	const verifyToken = searchParams.get("verifyToken");
	console.log(verifyToken);
	const navigate = useNavigate();
	const { isEmailVerified, verifyEmail } = useAuth();

	useEffect(() => {
		console.log("Los searchParams son:", searchParams);
		if (verifyToken) verifyEmail(verifyToken);
	}, [verifyToken, verifyEmail]);

	useEffect(() => {
		console.log("isEmailVerified:", isEmailVerified);
		if (isEmailVerified) navigate("/home");
	}, [isEmailVerified]);

	return (
		<>
			<div className="text-center grid min-h-full place-items-center px-6 my-16 py-32 sm:py-32 lg:px-8">
				<p className="text-base font-semibold text-blue-600">Verificación</p>
				<h1 className="mt-4 text-8xl font-bold tracking-tight text-[#858585] sm:text-5xl">Verifica tu email</h1>
				<p className="mt-6 text-base leading-7 text-blue-600">Por favor, haz click en el link que hemos enviado a tu correo (checkea el spam)</p>
				<div className="mt-10 items-center justify-center">
					<button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
						Reenviar email
					</button>
				</div>
			</div>
		</>
	);
}

export default VerifyEmailPage;
