import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPasswordForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { forgotPassword, isAuthenticated, errors: forgotPasswordErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	const onSubmit = async (data) => {
		await forgotPassword(data);
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
				<div className="pt-2 mb-8 border flex flex-col bg-white">
					<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
						Correo de la U-Tad
					</label>
					<input
						className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
						type="email"
						{...register("email", {
							required: true,
							pattern: /^\S+@\S+$/i,
						})}
						placeholder="Correo"
						autoComplete="email"
					/>
					{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un email</p>}
				</div>
				<div className="mb-4">
					<button className="w-full p-4 bg-[#001C44] hover:bg-[#0f2645] text-white font-bold" type="submit">
						Enviar enlace de recuperación
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
