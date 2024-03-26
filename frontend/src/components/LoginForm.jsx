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
		console.log(data);
		await loginUser(data);
	};

	return (
		<div>
			<div>
				{loginErrors.map((error, index) => (
					<div className="mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="p-4">
				<div className="mb-4 w-full md:w-11/12">
					<div className="pt-2 border flex flex-col bg-white">
						<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
							Correo de la U-Tad
						</label>
						<input
							id="email"
							className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold"
							type="email"
							{...register("email", {
								required: true,
								pattern: /^\S+@\S+$/i,
							})}
							placeholder="nombre.apellido@live.u-tad.com"
							autoComplete="email"
						/>
					</div>
					{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un email</p>}
				</div>

				<div className="mb-4 w-full md:w-11/12">
					<div className="pt-2 border flex flex-col bg-white">
						<label htmlFor="password" className="text-blue-400 text-xs text-left ml-3 font-semibold">
							Contraseña
						</label>
						<input
							id="password"
							className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold"
							type="password"
							{...register("password", {
								required: true,
								minLength: 3,
							})}
							placeholder="*Contraseña"
							autoComplete="current-password"
						/>
					</div>
					{errors.password && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta una contraseña</p>}
				</div>

				<div className="mb-4">
					<button className="w-full sm:w-5/12 h-12 px-3 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-400 text-white font-bold" type="submit">
						INICIAR SESIÓN
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
