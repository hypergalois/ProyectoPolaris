import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Popup from "../components/Popup";
import SecondaryRegisterForm from "../components/SecondaryRegisterForm";

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
	const [emailChecked, setemailChecked] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [InitialRegisterData, setInitialRegisterData] = useState(false);

	const handleClosePopup = () => {
		setOpenPopup(false);
	};

	const onSubmit = async (data) => {
		try {
			const emailExists = await getExistEmail(data);
			// console.log(emailExists);
			if (emailExists) {
				setError("email", { message: "El correo ya está en uso." });
				return;
			}
			setInitialRegisterData(data);
			setOpenPopup(true);
			setemailChecked(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
			<div>
				{userErrors.map((error, index) => (
					<div className="mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>

			<div className="mb-4 w-full md:w-11/12">
				<div className="pt-2 border flex flex-col bg-white">
					<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
						Correo de la U-Tad
					</label>
					<input
						id="email"
						className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
						type="email"
						{...register("email", {
							required: true,
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@(u-tad\.com|live\.u-tad\.com)$/i,
								message: "El correo tiene que ser de la U-Tad",
							},
							validated: () => !emailChecked,
						})}
						placeholder="nombre.apellido@live.u-tad.com"
					/>
				</div>
				{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.email.message}</p>}
			</div>

			<div className="mb-8 w-full md:w-11/12">
				<Link to="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran" className="underline">
					<p className="text-xs">Creando una cuenta aceptas los Términos de Uso y la Política de Privacidad.</p>
				</Link>
			</div>

			<div className="mb-8 w-full md:w-11/12">
				<button type="submit" onClick={onSubmit} className="w-full p-4 bg-[#001C44] hover:bg-[#0f2645] text-white font-bold">
					Registrarse
				</button>
				<Popup title="CREAR TU USUARIO" openPopup={openPopup} closePopup={handleClosePopup}>
					<SecondaryRegisterForm closePopup={handleClosePopup} initialRegistrationData={InitialRegisterData} />
				</Popup>
			</div>
		</form>
	);
};

export default InitialRegisterForm;
