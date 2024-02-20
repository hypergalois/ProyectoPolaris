import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const SecondaryRegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// Pongo registerUser para evitar colisiones con el hook register
	const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const { email } = location.state || {};
	const isUdEmailUtad = email.endsWith("@u-tad.com");
	const isUdEmailLive = email.endsWith("@live.u-tad.com");

	const [academicRole, setAcademicRole] = useState("1"); // Define academicRole state

	const departments = [];
	//const degrees = degreesRequest();
	//console.log(degrees.then())
	const years = [];
	for (let year = 2012; year <= 2022; year++) {
		years.push(year + "/" + (year + 1));
	}

	// Handler for select change event
	const handleAcademicRoleChange = (event) => {
		setAcademicRole(event.target.value); // Update academicRole state
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated, navigate]);

	const onSubmit = handleSubmit(async (data) => {
		await registerUser(data);
	});

	return (
		<div className="text-black">
			<div>
				{registerErrors.map((error, index) => (
					<div key={index}>{error.message}</div>
				))}
			</div>
			<form onSubmit={onSubmit}>
				<input type="hidden" value={email} name="email" />
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl"
						type="text"
						{...register("username", {
							required: true,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="Nombre"
					/>
					{errors.username && <p className="mb-2">Hace falta un nombre de usuario</p>}
				</div>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl"
						type="text"
						{...register("usersecondname", {
							required: true,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="Apellidos"
					/>
					{errors.usersecondname && <p className="mb-2">Hace falta los apellidos</p>}
				</div>
				<div className="mb-4">
					<input
						className="w-full p-4 rounded-2xl"
						type="text"
						{...register("user", {
							required: false,
							minLength: 3,
							maxLength: 20,
						})}
						placeholder="Usuario (opcional)"
					/>
				</div>
				{isUdEmailLive && (
					<div className="mb-4 flex">
						<div className="w-full">
							<select className="w3-select w-full p-4 rounded-2xl" name="academicRole" defaultValue="1" onChange={handleAcademicRoleChange}>
								<option value="1" disabled hidden>
									Cargo
								</option>
								<option value="STUDENT">Alumno</option>
								<option value="EXSTUDENT">Exalumno</option>
							</select>
							{errors.academicRole && <p className="mb-2">Hace falta un cargo</p>}
						</div>
						{academicRole == "EXSTUDENT" && (
							<div className="flex-none w-1/2">
								<select className="w-full p-4 rounded-2xl" name="promocion" defaultValue="">
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
							<select className="w3-select w-full p-4 rounded-2xl" name="academicRole" defaultValue="1" onChange={handleAcademicRoleChange}>
								<option value="1" disabled hidden>
									Cargo
								</option>
								<option value="TEACHER">Profesor</option>
								<option value="COORDINATOR">Coordinador</option>
								<option value="DEPARTAMENT">Departamento</option>
							</select>
							{errors.academicRole && <p className="mb-2">Hace falta un cargo</p>}
						</div>
						{academicRole == "DEPARTAMENT" && (
							<div className="flex-none w-1/2">
								<select className="w-full p-4 rounded-2xl" name="departamento" defaultValue="">
									<option value="" disabled hidden>
										Que departamento?
									</option>
									{departments.map((departments) => (
										<option key={departments} value={departments}>
											{departments}
										</option>
									))}
								</select>
								{errors.job && <p className="mb-2">Hace falta un cargo</p>}
							</div>
						)}
					</div>
				)}
				<div className="mb-4">
					<select className="w3-select text-black w-full p-4 rounded-2xl overflow-hidden" name="grade" defaultValue="1">
						<option value="1" disabled hidden>
							Titulación
						</option>
						<option value="VIDEOJUEGOS">VIDEOJUEGOS</option>
						<option value="ANIMACIÓN">ANIMACIÓN</option>
						<option value="EFECTOS VISUALES">EFECTOS VISUALES</option>
						<option value="DISEÑO DIGITAL">DISEÑO DIGITAL</option>
						<option value="REALIDAD VIRTUAL">REALIDAD VIRTUAL</option>
						<option value="INGENIERÍA">INGENIERÍA</option>
						<option value="FÍSICA Y MATEMÁTICAS">FÍSICA Y MATEMÁTICAS</option>
						<option value="CIBERSEGURIDAD">CIBERSEGURIDAD</option>
						<option value="INTELIGENCIA ARTIFICIAL">INTELIGENCIA ARTIFICIAL</option>
						<option value="NEGOCIO Y MARKETING">NEGOCIO Y MARKETING</option>
					</select>
					{errors.grade && <p className="mb-2">Hace falta un grado</p>}
				</div>
				<div className="mb-4">
					<button className="w-full p-4 rounded-xl bg-[#333333] text-white" type="submit">
						Registrarse
					</button>
				</div>
			</form>
		</div>
	);
};

export default SecondaryRegisterForm;
