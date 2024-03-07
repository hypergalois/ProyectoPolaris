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
				<div className="mb-8">
					<input
						className="w-8/12 h-10 px-6 text-black p-6 rounded-2xl"
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
					<button className="w-8/12 h-14 px-6 rounded-xl bg-[#2d2d2d] hover:bg-[#3f3f3f] text-white font-semibold" type="submit">
						Enviar enlace de recuperación
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
