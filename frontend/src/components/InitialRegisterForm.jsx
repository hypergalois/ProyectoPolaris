import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InitialRegisterForm = ({ onSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
		clearErrors,
	} = useForm();

	const { existEmail, getExistEmail, errors: userErrors } = useAuth();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		// console.log(data);
		try {
			const emailExists = await getExistEmail({ email: data.email });
			// console.log(emailExists);
			if (emailExists) {
				setError("email", { message: "El correo ya está en uso." });
				return;
			}
			// Ahora ya no necesitamos navegar, sino que queremos que se abra el popup
			onSuccess(data);
			// navigate("/register/details", { state: { email: data.email, fullName: data.fullName } });
		} catch {
			console.log("Error al verificar el correo.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				{userErrors.map((error, index) => (
					<div className="mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>
			<div className="mb-4 mt-8 text-black">
				<input
					className="w-full md:w-9/12 p-3 rounded-2xl h-12"
					type="text"
					{...register("fullName", {
						required: true,
						minLength: 10,
						maxLength: 50,
					})}
					placeholder="*Nombre completo"
				/>
				{errors.username && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un nombre</p>}
			</div>
			<div className="mb-4 text-black">
				<input
					className="w-full md:w-9/12 p-3 rounded-2xl h-12"
					type="email"
					{...register("email", {
						required: true,
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@(u-tad\.com|live\.u-tad\.com)$/i,
							message: "El correo tiene que ser de la U-Tad",
						},
						validated: () => !emailChecked,
					})}
					placeholder="*Correo de la U-Tad"
				/>
				{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.email.message}</p>}
			</div>
			<div className="mb-8">
				<Link to="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran" className="underline">
					<p className="text-xs">Creando una cuenta aceptas los Términos de Uso y la Política de Privacidad.</p>
				</Link>
			</div>
			<div className="mb-4">
				<button type="submit" className="w-full md:w-9/12 h-12 rounded-xl bg-blue-600 hover:bg-blue-400 text-white font-bold">
					REGISTRARSE
				</button>
			</div>
		</form>
	);
};

export default InitialRegisterForm;
