import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Aqui muestro el fomrulario sea cual sea el estado de la verificacion del token, ya que se hace despues, se podria mejorar para que no se muestre el formulario si el token no es valido
const ResetPasswordForm = (resetToken) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { resetPassword, isAuthenticated, errors: forgotPasswordErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	const onSubmit = async (data) => {
		// console.log(resetToken);
		// console.log(data);
		if (data.password !== data.passwordRepeated) {
			return forgotPasswordErrors.push({ message: "Las contraseñas no coinciden." });
		}
		const resetData = {
			resetToken: resetToken.resetToken,
			password: data.password,
		};

		console.log(resetData);
		await resetPassword(resetData);
		navigate("/");
	};

	return (
		<div>
			<div>
				{forgotPasswordErrors.map((error, index) => (
					<div className="mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="p-4">
				<div className="mb-4">
					<input
						className="w-8/12 h-10 px-6 text-black p-6 rounded-2xl"
						type="password"
						{...register("password", {
							required: true,
							minLength: 3,
						})}
						placeholder="Contraseña"
						autoComplete="current-password"
					/>
					{errors.password && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta una contraseña</p>}
				</div>
				<div className="mb-8">
					<input
						className="w-8/12 h-10 px-6 text-black p-6 rounded-2xl"
						type="password"
						{...register("passwordRepeated", {
							required: true,
							minLength: 3,
						})}
						placeholder="Contraseña (repetir)"
						autoComplete="current-password"
					/>
					{errors.password && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta una contraseña</p>}
				</div>
				<div className="mb-4">
					<button className="w-8/12 h-14 px-6 rounded-xl bg-[#2d2d2d] hover:bg-[#3f3f3f] text-white font-semibold" type="submit">
						Reestablecer contraseña
					</button>
				</div>
			</form>
		</div>
	);
};

export default ResetPasswordForm;
