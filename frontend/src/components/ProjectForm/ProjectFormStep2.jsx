import React from "react";
import { useEffect } from "react";

import Stepper from "../Stepper.jsx";
import TagsInputComponent from "../TagsInputComponent.jsx";

import { useForm, useController, useFieldArray, FormProvider } from "react-hook-form";

const ProjectFormStep2 = ({ returnStep, advanceStep, currentStep }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowLeft") {
				returnStep();
			} else if (event.key === "ArrowRight") {
				advanceStep();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [returnStep, advanceStep]);

	const methods = useForm({
		defaultValues: {
			impliedStudents: [{ student: "" }],
			impliedProfessors: [],
		},
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = methods;

	const {
		fields: studentFields,
		append: appendStudent,
		remove: removeStudent,
		update: updateStudent,
	} = useFieldArray({
		control,
		name: "impliedStudents",
	});

	const {
		fields: professorFields,
		append: appendProfessor,
		remove: removeProfessor,
		update: updateProfessor,
	} = useFieldArray({
		control,
		name: "impliedProfessors",
	});

	const onSubmit = (data) => {
		const formData = new FormData();

		const impliedStudents = data.impliedStudents ? data.impliedStudents.map(({ student }) => student).filter((value) => value.trim().length !== 0) : [];
		formData.append("impliedStudents", JSON.stringify(impliedStudents));

		const impliedProfessors = data.impliedTeachers ? data.impliedProfessors.map(({ professor }) => professor).filter((value) => value.trim().length !== 0) : [];
		formData.append("impliedTeachers", JSON.stringify(impliedProfessors));
	};

	return (
		<>
			<Stepper currentStep={currentStep} />
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white  rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-2">
					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Estudiantes implicados</label>
						{studentFields.map((field, index) => (
							<div key={field.id}>
								<div className="flex items-center gap-2">
									<input
										type="email"
										{...register(`impliedStudents.${index}.student`, {
											required: index === 0 ? "Se requiere por lo menos un estudiante implicado" : false,
											pattern: {
												value: /^[\w-]+(\.[\w-]+)*@live\.u-tad\.com$/,
												message: "Introduce una dirección de correo electrónico válida",
											},
										})}
										placeholder="Estudiante implicado"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									{index > 0 && (
										<button
											type="button"
											onClick={() => {
												removeStudent(index);
											}}
											className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
										>
											Eliminar
										</button>
									)}
								</div>
								{errors.impliedStudents?.[index]?.student && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.impliedStudents[index].student.message}</p>}
							</div>
						))}
						<div className="flex justify-center mt-4">
							<button type="button" onClick={() => appendStudent({ student: "" })} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
								Añadir estudiante
							</button>
						</div>
					</div>

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Profesores implicados</label>
						{professorFields.map((field, index) => (
							<div key={field.id}>
								<div className="flex items-center gap-2">
									<input
										type="email"
										{...register(`impliedProfessors.${index}.professor`, {
											pattern: {
												value: /^[\w-]+(\.[\w-]+)*@u-tad\.com$/,
												message: "Introduce una dirección de correo electrónico válida",
											},
										})}
										placeholder="Profesor implicado"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
									<button
										type="button"
										onClick={() => {
											removeProfessor(index);
										}}
										className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
									>
										Eliminar
									</button>
								</div>
								{errors.impliedProfessors?.[index]?.professor && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.impliedProfessors[index].professor.message}</p>}
							</div>
						))}
						<div className="flex justify-center mt-4">
							<button type="button" onClick={() => appendProfessor({ professor: "" })} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
								Añadir profesor
							</button>
						</div>
					</div>
				</form>
			</div>

			<div className="flex justify-end gap-4">
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						console.log("Guardar borrador");
					}}
				>
					GUARDAR BORRADOR
				</button>
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						returnStep();
					}}
				>
					ANTERIOR
				</button>
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						advanceStep();
					}}
				>
					SIGUIENTE
				</button>
			</div>
		</>
	);
};

export default ProjectFormStep2;
