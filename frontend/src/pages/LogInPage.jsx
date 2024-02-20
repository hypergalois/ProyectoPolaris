import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

// TODO Falta modificar el formulario para que se adapte al login
const LogInPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// Pongo registerUser para evitar colisiones con el hook register
	const { login: loginUser, isAuthenticated, errors: loginErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated, navigate]);

	const onSubmit = handleSubmit(async (data) => {
		await loginUser(data);
	});

	return (
		<div>
			<div>
				{loginErrors.map((error, index) => (
					<div key={index}>{error.message}</div>
				))}
			</div>
			<h1>Hacer Log In</h1>
			<form onSubmit={onSubmit}>
				<p>Email</p>
				<input
					type="email"
					{...register("email", {
						required: true,
						pattern: /^\S+@\S+$/i,
					})}
				/>
				{errors.email && <p>Hace falta un email</p>}

				<p>Password</p>
				<input
					type="password"
					{...register("password", {
						required: true,
						minLength: 6,
					})}
				/>
				{errors.password && <p>Hace falta una contraseña</p>}

				<button type="submit">Log In</button>
			</form>
		</div>
	);
};

export default LogInPage;
