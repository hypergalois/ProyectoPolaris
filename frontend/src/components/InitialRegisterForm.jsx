import { useState } from "react";
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
	const { existEmail : emailTrue, getExistEmail, errors: userErrors } = useUser();
	const navigate = useNavigate();
	var noEmailUtad = true;

	const onSubmit = (data) => {
		// Actualiza el estado del email

		noEmailUtad = data.email.endsWith("@u-tad.com") || data.email.endsWith("@live.u-tad.com");

		if (noEmailUtad) {
			getExistEmail(data.email)
			console.log(emailTrue);
			if(emailTrue){
				setEmail(data.email);
				navigate(`/register/details`, { state: { email: data.email } });
			}
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{
						userErrors.map((error, index) =>
						(
							<div key={index}>{error.message}</div>

						))
					}

				</div>
				<div className="mb-4 text-black">
					<input
						className="w-5/12 p-4 rounded-2xl"
						type="text"
						{...register("username", {
							required: true,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="Nombre"
					/>
					{errors.username && <p className="mb-2 text-white">Hace falta un nombre de usuario</p>}
				</div>
				<div className="mb-4 text-black">
					<input
						className="w-5/12 p-4 rounded-2xl"
						type="email"
						{...register("email", {
							required: true,
							pattern: /^\S+@\S+$/i,
						})}
						placeholder="Correo de la Utad"
					/>
					{errors.email && <p className="mb-2 text-white">Hace falta un email</p>}
					{!noEmailUtad && <p className="mb-2 text-white">Tiene que ser @u-tad.com o @live.u-tad.com</p>}
				</div>
				<div className="mb-8">
					<p className="text-xs">Creando una cuenta aceptas los Términos de Uso y la Política de Privacidad.</p>
				</div>
				<div className="mb-4">
					<button type="submit" className="w-5/12 p-4 rounded-xl bg-[#333333] text-white">
						Registrarse
					</button>
				</div>
			</form>
		</div>
	);
};

export default InitialRegisterForm;
