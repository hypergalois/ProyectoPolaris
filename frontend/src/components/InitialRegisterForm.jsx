import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const InitialRegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// eslint-disable-next-line no-unused-vars
	const [email, setEmail] = useState("");
	const { existEmail, getExistEmail, errors: userErrors } = useUser();
	const navigate = useNavigate();
	var noEmailUtad = true;

	useEffect(() => {
        if (existEmail) {
			console.log("entra", existEmail)
			//navigate(`/register/details`, { state: { email: email } });
		}
    }, [existEmail])

	const onSubmit = (data) => {
		// Actualiza el estado del email
		
		noEmailUtad = data.email.endsWith("@u-tad.com") || data.email.endsWith("@live.u-tad.com");

		if (noEmailUtad) {
			getExistEmail(data);
			setEmail(data.email);
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
			<div className="mb-4 text-black">
				<input
					className="w-7/12 p-3 rounded-2xl"
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
					className="w-7/12 p-3 rounded-2xl"
					type="email"
					{...register("email", {
						required: true,
						pattern: /^\S+@\S+$/i,
					})}
					placeholder="Correo de la Utad"
				/>
				{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un email</p>}
				{!noEmailUtad && <p className="mb-2  mt-4 text-red-500 font-semibold">Tiene que ser @u-tad.com o @live.u-tad.com</p>}
			</div>
			<div className="mb-8">
				<p className="text-xs">Creando una cuenta aceptas los Términos de Uso y la Política de Privacidad.</p>
			</div>
			<div className="mb-4">
				<button type="submit" className="w-7/12 h-12  rounded-xl bg-[#333333] text-white font-semibold">
					Registrarse
				</button>
			</div>
		</form>
	);
};

export default InitialRegisterForm;
