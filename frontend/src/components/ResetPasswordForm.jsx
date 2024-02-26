import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ResetPasswordForm = () => {
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
		await resetPassword(data);
	};

	return (
		<div>
			<div>
				{forgotPasswordErrors.map((error, index) => (
					<div key={index}>{error.message}</div>
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
						{...register("password", {
							required: true,
							minLength: 3,
						})}
						placeholder="Contraseña (repetir)"
						autoComplete="current-password"
					/>
					{errors.password && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta una contraseña</p>}
				</div>
				<div className="mb-4">
					<button className="w-8/12 h-14 px-6 rounded-xl bg-[#333333] text-white font-semibold" type="submit">
						Reestablecer contraseña
					</button>
				</div>
			</form>
		</div>
	);
};

export default ResetPasswordForm;
