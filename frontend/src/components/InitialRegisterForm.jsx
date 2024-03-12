import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InitialRegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	// eslint-disable-next-line no-unused-vars
	const [email, setEmail] = useState("");
	const { existEmail, getExistEmail, errors: userErrors } = useAuth();
	const navigate = useNavigate();

	const getExistEmailRequest = async (email) => {
		getExistEmail({ email: email });
		return await existEmail;
	};

	const onSubmit = (data) => {
		navigate(`/register/details`, { state: { email: data.email } });
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
			<div className="mb-4 text-black">
				<input
					className="w-full md:w-7/12 p-3 rounded-2xl"
					type="text"
					{...register("username", {
						required: true,
						minLength: 3,
						maxLength: 20,
					})}
					placeholder="Nombre"
				/>
				{errors.username && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un nombre de usuario</p>}
			</div>
			<div className="mb-4 text-black">
				<input
					className="w-full md:w-7/12 p-3 rounded-2xl"
					type="email"
					{...register("email", {
						required: true,
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@(u-tad\.com|live\.u-tad\.com)$/i,
							message: "El correo tiene que ser de la Utad",
						},
						validate: {
							checkUrl: async () => (await getExistEmailRequest(getValues("email"))) || "El correo ya esta en uso",
						},
					})}
					placeholder="Correo de la Utad"
				/>
				{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.email.message}</p>}
			</div>
			<div className="mb-8">
				<p className="text-xs">Creando una cuenta aceptas los Términos de Uso y la Política de Privacidad.</p>
			</div>
			<div className="mb-4">
				<button type="submit" className="w-full md:w-7/12 h-12 rounded-xl bg-blue-600 hover:bg-[#3f3f3f] text-white font-semibold">
					Registrarse
				</button>
			</div>
		</form>
	);
};

export default InitialRegisterForm;
