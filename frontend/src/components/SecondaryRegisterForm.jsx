import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAreas } from "../context/AreasContext";
import { useState, useEffect } from "react";

const SecondaryRegisterForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm();
	// Pongo registerUser para evitar colisiones con el hook register
	const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
	const { degrees, getDegrees, errors: areasErrors } = useAreas();
	const navigate = useNavigate();
	const location = useLocation();

	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [showValidation, setShowValidation] = useState(false);

	const password = watch("password");
	const password2 = watch("password2");

	// Queremos que se muestre el mensaje de error si el usuario ha escrito algo en los campos de contraseña en ambos campos
	useEffect(() => {
		if (password && password2) {
			setShowValidation(true);
		}

		const match = password === password2 && password?.length > 0;
		setPasswordsMatch(match);
	}, [password, password2, clearErrors, setError, showValidation]);

	const { email, fullName } = location.state || {};
	// console.log(location.state);

	const isUdEmailUtad = email.endsWith("@u-tad.com");
	const isUdEmailLive = email.endsWith("@live.u-tad.com");

	// No entiendo que signfica 1, puede que se corresponda en el enum pero no es nada legible, TODO CAMBIARLO
	const [academicRole, setAcademicRole] = useState("1"); // Define academicRole state

	const departments = [];

	const [degreeOptions, setDegreeOptions] = useState([]);

	const years = [];

	for (let year = 2012; year <= 2022; year++) {
		years.push(year + "/" + (year + 1));
	}

	const handleAcademicRoleChange = (event) => {
		setAcademicRole(event.target.value);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		getDegrees();
	}, []);

	useEffect(() => {
		if (degrees) {
			const newDegreeOptions = degrees.map((degree) => ({
				value: degree.id,
				label: degree.name,
			}));
			setDegreeOptions(newDegreeOptions);
		}
	}, [degrees]);

	const onSubmit = (data) => {
		console.log(data);
	};
	// const onSubmit = handleSubmit(async (data) => {
	// 	data.fullName = data.username + " " + data.usersecondname + " " + data.userthirdname;
	// 	delete data.username;
	// 	delete data.usersecondname;
	// 	delete data.userthirdname;
	// 	data.user = !data.user ? data.email.split("@")[0] : data.user;
	// 	await registerUser(data);
	// });

	return (
		<div className="text-black">
			<div>
				{registerErrors.map((error, index) => (
					<div key={index}>{error.message}</div>
				))}
			</div>
			<div>
				{areasErrors.map((error, index) => (
					<div className="mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl h-12"
						type="email"
						value={email}
						{...register("email", {
							required: true,
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "El correo no es válido",
							},
						})}
						disabled
					/>
				</div>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl h-12"
						type="text"
						value={fullName}
						{...register("fulName", {
							required: true,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="*Nombre completo"
					/>
					{errors.fullName && <p className="mb-2">Hace falta un nombre</p>}
				</div>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl h-12"
						type="text"
						{...register("username", {
							required: false,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="Nombre de usuario (opcional)"
					/>
					{errors.user && <p className="mb-2">Tiene que tener entre 3 y 20 caracteres</p>}
				</div>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl h-12"
						type="password"
						{...register("password", {
							required: "La contraseña es obligatoria",
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="*Contraseña"
					/>
					{errors.password && <p className="mb-2">{errors.password.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl h-12"
						type="password"
						{...register("password2", {
							required: "Tienes que repetir la contraseña",
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="*Contraseña (repetir)"
					/>
					{errors.password2 && <p className="mb-2">{errors.password2.message}</p>}
				</div>
				{showValidation && (passwordsMatch ? <span className="mb-4 block">Las contraseñas coinciden ✅</span> : <span className="mb-4 block">Las contraseñas no coinciden ❌</span>)}
				{isUdEmailLive && (
					<div className="mb-4 flex">
						<div className="w-full">
							<select
								className="w3-select w-full p-4 rounded-2xl"
								{...register("academicRole", {
									required: true,
									minLength: 3,
								})}
								name="academicRole"
								defaultValue="1"
								onChange={handleAcademicRoleChange}
							>
								<option value="1" disabled hidden>
									Cargo
								</option>
								<option value="ALUMN">Alumno</option>
								<option value="ALUMNI">Exalumno</option>
							</select>
							{errors.academicRole && <p className="mb-2">Hace falta un cargo</p>}
						</div>
						{academicRole == "ALUMNI" && (
							<div className="flex-none w-1/2">
								<select
									className="w-full p-4 rounded-2xl"
									{...register("promocion", {
										required: true,
										minLength: 3,
									})}
									name="promocion"
									defaultValue=""
								>
									<option value="" disabled hidden>
										Promocion
									</option>
									{years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								{errors.promocion && <p className="mb-2">Hace falta un cargo</p>}
							</div>
						)}
					</div>
				)}
				{isUdEmailUtad && (
					<div className="mb-4 flex">
						<div className="w-full">
							<select
								className="w3-select w-full p-4 rounded-2xl"
								{...register("academicRole", {
									required: true,
									minLength: 3,
								})}
								name="academicRole"
								defaultValue="1"
								onChange={handleAcademicRoleChange}
							>
								<option value="1" disabled hidden>
									Cargo
								</option>
								<option value="PROFESSOR">Profesor</option>
								<option value="COORDINATOR">Coordinador</option>
								<option value="EMPLOYEE">Departamento</option>
							</select>
							{errors.academicRole && <p className="mb-2">Hace falta un cargo</p>}
						</div>
						{academicRole == "EMPLOYEE" && (
							<div className="flex-none w-1/2">
								<select
									className="w-full p-4 rounded-2xl"
									{...register("departamento", {
										required: true,
										minLength: 3,
									})}
									name="departamento"
									defaultValue=""
								>
									<option value="" disabled hidden>
										Que departamento?
									</option>
									{departments.map((departments) => (
										<option key={departments} value={departments}>
											{departments}
										</option>
									))}
								</select>
								{errors.departamento && <p className="mb-2">Hace falta un cargo</p>}
							</div>
						)}
					</div>
				)}
				<div className="mb-4">
					<select
						className="w3-select text-black w-full p-4 rounded-2xl overflow-hidden"
						{...register("grade", {
							required: true,
							minLength: 3,
						})}
						name="grade"
						defaultValue=""
					>
						<option value="" disabled hidden>
							Grados
						</option>
						{degreeOptions.map(({ value, label }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
					{errors.grade && <p className="mb-2">Hace falta un cargo</p>}
				</div>
				<div className="mb-4">
					<button className="w-full p-4 rounded-xl bg-blue-600 hover:bg-[#3f3f3f] text-white font-bold" type="submit">
						REGISTRARSE
					</button>
				</div>
			</form>
		</div>
	);
};

export default SecondaryRegisterForm;
