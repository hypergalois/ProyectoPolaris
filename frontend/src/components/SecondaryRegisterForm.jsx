import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAreas } from "../context/AreasContext";
import { useState, useEffect } from "react";
import Select from "react-select";
// import { DevTool } from "@hookform/devtools";

import { selectStyles } from "../config/util";

const SecondaryRegisterForm = ({ initialRegistrationData, closePopup }) => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		clearErrors,
		setError,
		setValue,
		formState: { errors },
	} = useForm();
	// Pongo registerUser para evitar colisiones con el hook register
	const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
	const { degrees, getDegrees, errors: areasErrors } = useAreas();
	const navigate = useNavigate();

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

	const { email, fullName } = initialRegistrationData || { email: "", fullName: "" };

	const isEmailUtad = email.endsWith("@u-tad.com");
	const isEmailLive = email.endsWith("@live.u-tad.com");

	// No entiendo que signfica 1, puede que se corresponda en el enum pero no es nada legible, TODO CAMBIARLO
	const [academicRole, setAcademicRole] = useState("1"); // Define academicRole state

	// TODO: Poner aqui los departamentos
	const departments = ["Marketing", "Sistemas", "Administracion", "Finanzas", "Recursos Humanos", "Comunicacion", "Legal", "Tecnico", "Comercial", "Otros"];

	const [degreeOptions, setDegreeOptions] = useState([]);

	const years = [];

	for (let year = 2012; year <= 2025; year++) {
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

	useEffect(() => {
		register("grade", { required: "Este campo es obligatorio" });
	}, []);

	const onSubmit = handleSubmit(async (data) => {
		// Me da un error de required el email
		console.log("Registrando usuario");
		// console.log(data);
		data.username = !data.username ? email.split("@")[0] : data.username;
		// Supuestamente esta undefined asi que dirty hack
		// Dirty hack, en backend deberiamos solo coger campos que nos interesen
		// Si las contraseñas no coinciden no deberiamos enviarlas
		if (!passwordsMatch) {
			console.log("Las contraseñas no coinciden");
			return;
		}

		delete data.password2;
		data.email = email;
		console.log(data);

		// data.user = !data.user ? data.email.split("@")[0] : data.user;
		await registerUser(data);
		closePopup();
	});

	return (
		<div className="text-black justify-center items-center">
			<div>
				{registerErrors.map((error, index) => (
					<div key={index}>{error.message}</div>
				))}
			</div>
			<div>
				{areasErrors.map((error, index) => (
					<div className="mb-2 mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>
			<form onSubmit={onSubmit}>
				<div className="mb-4 pt-2 border flex flex-col bg-white">
					<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
						Correo de la U-Tad
					</label>
					<input
						className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
						type="email"
						value={email}
						{...register("email", {
							required: false,
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "El correo no es válido",
							},
						})}
						disabled
					/>
				</div>

				<div className="mb-4 pt-2 border flex flex-col bg-white">
					<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
						Nombre Completo
					</label>
					<input
						className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
						type="text"
						value={fullName}
						{...register("fullName", {
							required: true,
							minLength: 3,
							maxLength: 70,
							validate: (value) => value.split(" ").filter(Boolean).length >= 3 || "El nombre completo debe incluir al menos un nombre y dos apellidos",
						})}
						placeholder="*Nombre completo"
					/>
					{errors.fullName && <p className="mb-2 mt-4 text-red-500 font-semibold">El nombre completo debe incluir al menos un nombre y dos apellidos</p>}
				</div>

				<div className="mb-4 pt-2 border flex flex-col bg-white">
					<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
						Nombre de usuario (opcional)
					</label>
					<input
						className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
						type="text"
						{...register("username", {
							required: false,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="Nombre de usuario (opcional)"
					/>
					{errors.user && <p className="mb-2 mt-4 text-red-500 font-semibold">Tiene que tener entre 3 y 20 caracteres</p>}
				</div>

				<div className="flex">
					<div className="w-full mb-4 pt-2 border bg-white flex flex-col mr-6">
						<label htmlFor="password" className="text-blue-400 text-xs text-left ml-3 font-semibold">
							*Contraseña
						</label>
						<input
							className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
							type="password"
							{...register("password", {
								required: "La contraseña es obligatoria",
								minLength: 3,
								maxLength: 20,
							})}
							placeholder="*Contraseña"
						/>
						{errors.password && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.password.message}</p>}
					</div>

					<div className="w-full mb-4 pt-2 border bg-white flex flex-col">
						<label htmlFor="password2" className="text-blue-400 text-xs text-left ml-3 font-semibold">
							*Contraseña (repetir)
						</label>
						<input
							className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
							type="password"
							{...register("password2", {
								required: "Tienes que repetir la contraseña",
								minLength: 3,
								maxLength: 20,
							})}
							placeholder="*Contraseña (repetir)"
						/>
						{errors.password2 && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.password2.message}</p>}
					</div>
				</div>

				{showValidation && (passwordsMatch ? <span className="mb-4 block">Las contraseñas coinciden ✅</span> : <span className="mb-4 block">Las contraseñas no coinciden ❌</span>)}

				{isEmailLive && (
					<div className="mb-4 flex">
						<div className="w-full mb-4 pt-2 border flex flex-col bg-white">
							<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
								Cargo
							</label>
							<select
								className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
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
							{errors.academicRole && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un cargo</p>}
						</div>
						{academicRole == "ALUMNI" && (
							<div className="flex-none w-1/2 mb-4 ml-6 pt-2 border flex flex-col bg-white">
								<label
									htmlFor="email"
									className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
								>
									Promocion
								</label>
								<select
									className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
									{...register("promocion", {
										required: true,
										minLength: 3,
										required: true,
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
								{errors.promocion && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un cargo</p>}
							</div>
						)}
					</div>
				)}

				{isEmailUtad && (
					<div className="mb-4 flex">
						<div className="w-full mb-4 pt-2 border flex flex-col bg-white">
							<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
								Cargo
							</label>
							<select
								className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
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
							{errors.academicRole && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un cargo</p>}
						</div>
						{academicRole == "EMPLOYEE" && (
							<div className="flex-none w-1/2 ml-6 mb-4 pt-2 border flex flex-col bg-white">
								<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
									Departamento
								</label>
								<select
									className="w-full p-4 h-12 outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
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
								{errors.departamento && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un cargo</p>}
							</div>
						)}
					</div>
				)}

				<div className="mb-4 pt-2 border flex flex-col bg-white">
					<label htmlFor="email" className="text-blue-400 text-xs text-left ml-3 font-semibold">
						Grado
					</label>
					<Controller
						name="grade"
						control={control}
						rules={{ required: "Este campo es obligatorio" }}
						render={({ field }) => (
							<Select
								{...field}
								options={degreeOptions}
								onChange={(selectedOption) => {
									setValue("grade", selectedOption ? selectedOption.value : "");
								}}
								className="w-full border rounded-2xl leading-tight"
								styles={selectStyles}
								placeholder="Grados"
							/>
						)}
					/>
					{errors.grade && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.grade.message}</p>}
				</div>

				<div>
					<button type="submit" onClick={onSubmit} className="w-full h-14 px-3 sm:px-6 bg-blue-600 hover:bg-blue-400 text-white font-bold">
						Registrarse
					</button>
				</div>
			</form>
			{/* <DevTool control={control} /> */}
		</div>
	);
};

export default SecondaryRegisterForm;
