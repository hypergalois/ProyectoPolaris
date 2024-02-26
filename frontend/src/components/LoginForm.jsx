// LoginComponent.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { login: loginUser, isAuthenticated, errors: loginErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	const onSubmit = async (data) => {
		await loginUser(data);
	};

	return (
		<div>
			<div>
				{loginErrors.map((error, index) => (
					<div key={index}>{error.message}</div>
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="p-4">
				<div className="mb-4">
					<input
						className="w-5/12 h-10 px-6 text-black p-3 rounded-2xl"
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
					<input
						className="w-5/12 h-10 px-6 text-black p-3 rounded-2xl"
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
				<div className="mb-4">
					<button className="w-5/12 h-10 px-6 rounded-xl bg-[#333333] text-white" type="submit">
						Iniciar sesión
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
