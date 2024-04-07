import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm, useController, useFieldArray, FormProvider } from "react-hook-form";

import { useProjects } from "../../context/ProjectsContext.jsx";
import { useAreas } from "../../context/AreasContext.jsx";

import { courseOptions } from "../../config/util.js";

import Stepper from "../Helpers/Stepper.jsx";

import { selectStylesCustom } from "../../config/util.js";

const ProjectFormStep3 = ({ returnStep, advanceStep, currentStep, updateProjectData, projectData }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowLeft") {
				handleSubmit(onSubmit)();
				returnStep();
			} else if (event.key === "ArrowRight") {
				handleSubmit(onSubmit)();
				advanceStep();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [returnStep, advanceStep]);

	const methods = useForm({
		defaultValues: projectData.step3,
	});

	const {
		register,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = methods;

	// Obtenemos los datos de la API
	const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();

	const [degreeOptions, setDegreeOptions] = useState([]);
	const [academicCourseOptions, setAcademicCourseOptions] = useState([]);
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [awardOptions, setAwardOptions] = useState([]);

	// Obtenemos el grado actual para obtener las asignaturas de ese grado especifico
	// Lo comento hasta que este el backend para las asignaturas por grado
	// const currentDegree = watch("degree");
	const currentDegree = undefined;
	// console.log(currentDegree);

	// Carga de opciones de DEGREE
	useEffect(() => {
		const getDegreeOptions = async () => {
			try {
				await getDegrees();
				const options = degrees.map(({ id, name }) => ({
					value: id,
					label: name,
				}));
				setDegreeOptions(options);
			} catch (error) {
				console.log(error);
				console.log("Error fetching options for degrees.");
			}
		};

		getDegreeOptions();
	}, []);

	// Carga de opciones de ACADEMIC COURSE
	useEffect(() => {
		setAcademicCourseOptions(generateAcademicCourseOptions(2010));
	}, []);

	const generateAcademicCourseOptions = (startYear) => {
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const academicCourseOptions = [];

		const currentStartAcademicCourse = currentMonth < 8 ? currentYear - 1 : currentYear;

		for (let year = startYear; year <= currentStartAcademicCourse; year++) {
			const nextYear = year + 1;
			const academicCourse = `${year}/${nextYear}`;
			academicCourseOptions.unshift({ value: academicCourse, label: academicCourse });
		}

		return academicCourseOptions;
	};

	// Carga de opciones de AWARD
	useEffect(() => {
		const getAwardOptions = async () => {
			try {
				const awardsList = await getAwards();
				const options = awardsList.map(({ id, name }) => ({
					value: id,
					label: name,
				}));
				setAwardOptions(options);
			} catch {
				console.log("Error fetching options");
			}
		};

		getAwardOptions();
	}, []);

	// Carga de opciones de SUBJECT
	// Esta es la version más avanzada para que se carguen las asignaturas de un grado en concreto
	useEffect(() => {
		const getSubjectOptions = async () => {
			// console.log(currentDegree);
			if (currentDegree) {
				console.log("Current degree, fetching subjects by degree");
				try {
					const subjectsList = await getSubjectsByDegree(currentDegree);
					const options = subjectsList.map(({ id, name }) => ({
						value: id,
						label: name,
					}));
					setSubjectOptions(options);
				} catch {
					console.log("Error fetching options");
				}
			} else {
				console.log("No current degree, fetching all subjects");
				try {
					const subjectsList = await getSubjects();
					const options = subjectsList.map(({ id, name }) => ({
						value: id,
						label: name,
					}));
					setSubjectOptions(options);
				} catch {
					console.log("Error fetching options");
				}
			}
		};

		getSubjectOptions();
	}, [currentDegree]);

	const {
		fields: linkFields,
		append: appendLink,
		remove: removeLink,
		update: updateLink,
	} = useFieldArray({
		control,
		name: "externalLinks",
	});

	const {
		field: { value: academicCourseValue, onChange: academicCourseOnChange },
	} = useController({
		name: "academicCourse",
		control,
		rules: {
			required: "Se requiere un curso académico",
		},
	});

	const {
		field: { value: awardsValue, onChange: awardsOnChange },
	} = useController({
		name: "awards",
		control,
	});

	const onSubmit = (data) => {
		const stepThreeData = {};

		stepThreeData.degree = data.degree;
		stepThreeData.personalProject = data.personalProject;
		stepThreeData.subject = data.subject;
		stepThreeData.academicCourse = data.academicCourse;
		stepThreeData.externalLinks = data.externalLinks;
		stepThreeData.awards = data.awards;

		console.log(stepThreeData);
		updateProjectData("step3", stepThreeData);
	};

	return (
		<>
			<Stepper currentStep={currentStep} />

			<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-2">
				{/* GRADO (CARRERA) */}
				<div className="mb-2 w-full mx-auto col-span-2">
					<div className="pt-2 flex flex-col">
						<Controller
							name="degree"
							control={control}
							defaultValue=""
							rules={{ required: "Se requiere un grado" }}
							render={({ field }) => (
								<Select
									{...field}
									options={degreeOptions}
									placeholder="Selecciona un grado"
									className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
									menuPortalTarget={document.body}
									styles={selectStylesCustom}
								/>
							)}
						/>
					</div>
					{errors.degree && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.degree.message}</p>}
				</div>
				{/* PROYECTO PERSONAL */}
				<div className="mb-2 w-full mx-auto">
					<div className="flex pt-2 gap-4 items-center">
						<label htmlFor="personalProject" className="text-blue-400 text-xs font-semibold">
							Proyecto personal
						</label>
						<Controller name="personalProject" control={control} defaultValue={false} render={({ field }) => <input {...field} type="checkbox" className="form-checkbox" />} />
					</div>
				</div>
				{/* ASIGNATURA */}
				<div className="mb-2 w-full mx-auto">
					<div className="flex flex-col">
						<Controller
							name="subject"
							control={control}
							defaultValue=""
							rules={{ required: "Se requiere una asignatura" }}
							render={({ field }) => (
								<Select
									{...field}
									options={subjectOptions}
									placeholder="Selecciona una asignatura"
									className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
									menuPortalTarget={document.body}
									styles={selectStylesCustom}
								/>
							)}
						/>
					</div>
					{errors.subject && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.subject.message}</p>}
				</div>
				{/* PREMIOS */}
				<div className="mb-2 w-full mx-auto">
					<div className="flex flex-col">
						<Controller
							name="awards"
							control={control}
							defaultValue={[]}
							render={({ field }) => (
								<Select
									{...field}
									options={awardOptions}
									isMulti
									placeholder="Selecciona los premios"
									className="w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									// Ajuste para la selección múltiple
									value={awardOptions.filter((option) => field.value.includes(option.value))}
									onChange={(vals) => field.onChange(vals.map((val) => val.value))}
								/>
							)}
						/>
					</div>
					{errors.awards && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.awards.message}</p>}
				</div>
				{/* CURSO ACADÉMICO */}
				<div className="mb-4 md:col-span-1">
					<Select
						options={academicCourseOptions}
						value={academicCourseValue ? academicCourseOptions.find(({ value }) => value === academicCourseValue) : academicCourseValue}
						onChange={(option) => academicCourseOnChange(option ? option.value : option)}
						className="w-full  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					{errors.academicCourse && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.academicCourse.message}</p>}
				</div>
				{/* ENLACES EXTERNOS */}
				<div className="mb-4 md:col-span-2 outline outline-blue-400">
					<div className="m-3">
						<label className="block text-blue-400 text-sm font-bold mb-2">Enlaces a recursos externos</label>
						{linkFields.map((field, index) => (
							<div key={field.id}>
								<div className="flex items-center gap-2">
									<input
										type="url"
										{...register(`externalLinks.${index}.link`)}
										placeholder="URL"
										className="shadow appearance-none  w-full py-2 px-3 mb-2 text-blue-500 placeholder-blue-500 leading-tight focus:outline-none focus:shadow-outline outline outline-blue-400 text-xs font-bold"
									/>
									<button
										type="button"
										onClick={() => {
											removeLink(index);
										}}
										className="ml-2 bg-red-700 hover:bg-red-600 text-white text-sm font-bold py-1 px-2 rounded"
									>
										Eliminar
									</button>
								</div>
								{errors.externalLinks?.[index]?.link && <p className="mb-2 mt-4 text-red-600 font-semibold">{errors.externalLinks[index].link.message}</p>}
							</div>
						))}
						<div className="flex justify-center mt-4">
							<button type="button" onClick={() => appendLink({ link: "" })} className="mt-2 h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm">
								Añadir recurso externo
							</button>
						</div>
					</div>
				</div>
				Miniatura resumen archivos del proyecto
			</form>

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
						handleSubmit(onSubmit)();
						returnStep();
					}}
				>
					ANTERIOR
				</button>
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						handleSubmit(onSubmit)();
						advanceStep();
					}}
				>
					SIGUIENTE
				</button>
			</div>
		</>
	);
};

export default ProjectFormStep3;
