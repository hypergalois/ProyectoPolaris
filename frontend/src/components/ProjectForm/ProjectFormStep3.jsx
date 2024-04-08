import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm, useController, useFieldArray, FormProvider } from "react-hook-form";
import DropzoneInput from "../Helpers/DropzoneInput.jsx";

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
		setValue,
		handleSubmit,
		formState: { errors },
	} = methods;

	// Obtenemos los datos de la API
	const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();

	const [degreeOptions, setDegreeOptions] = useState([]);
	const [academicCourseOptions, setAcademicCourseOptions] = useState([]);
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [awardOptions, setAwardOptions] = useState([]);

	// Si es proyecto personal deshabilitamos el campo de asignatura
	const isPersonalProject = watch("personalProject");

	// UseEffect para poner un valor a subject cuando sea proyecto personal
	useEffect(() => {
		if (isPersonalProject) {
			setValue("subject", {
				value: "Proyecto Personal",
				label: "Proyecto Personal",
			});
		} else if (!isPersonalProject) {
			setValue("subject", {
				value: "Elige la asignatura",
				label: "Elige la asignatura",
			});
		}
	}, [isPersonalProject, setValue]);

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
				// console.log(options);
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
					// console.log(options);
					setSubjectOptions(options);
				} catch {
					console.log("Error fetching options");
				}
			}
		};

		getSubjectOptions();
	}, []);
	// En el array deberia ir currentDegree, pero no se si se renderiza de nuevo si cambia

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

	// Ojo que cuando este proyecto personal true, hay que ver que se hace con la asignatura
	const onSubmit = (data) => {
		const stepThreeData = {};

		// Ojo, se podria crear el objeto directamente
		stepThreeData.degree = data.degree;
		stepThreeData.personalProject = data.personalProject;
		stepThreeData.subject = data.subject;
		stepThreeData.academicCourse = data.academicCourse;
		stepThreeData.externalLinks = data.externalLinks;
		stepThreeData.awards = data.awards;
		stepThreeData.thumbnail = data.thumbnail;
		stepThreeData.summary = data.summary;
		stepThreeData.projectFiles = data.projectFiles;

		// const stepThreeData = {
		// 	degree: data.degree,
		// 	personalProject: data.personalProject,
		// 	subject: data.subject,
		// 	academicCourse: data.academicCourse,
		// 	externalLinks: data.externalLinks,
		// 	awards: data.awards,
		// 	// Directamente guardamos los archivos recibidos del formulario
		// 	thumbnail: data.thumbnail,
		// 	summary: data.summary,
		// 	projectFiles: data.projectFiles,
		// };

		// // Agrega los archivos del proyecto a FormData
		// const files = data.uploadedContent ? [...data.uploadedContent] : [];
		// // Cambio de nombre del archivo del thumbnail
		// if (data.thumbnail[0]) {
		// 	const type = data.thumbnail[0].name.split(".").pop();
		// 	const thumbnail = new File([data.thumbnail[0]], `thumbnail.${type}`, { type });
		// 	files.push(thumbnail);
		// }
		// // Se juntan todos los archivos en un array

		// files.forEach((file) => formData.append("files", file));

		// console.log(data, Object.fromEntries(formData.entries()));

		console.log(stepThreeData);
		updateProjectData("step3", stepThreeData);
	};

	return (
		<>
			<Stepper currentStep={currentStep} />

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-2 mx-auto items-center">
					{/* GRADO (CARRERA) */}
					<div className="mb-2 w-full mx-auto col-span-2">
						<div className="pt-2 flex flex-col">
							<Controller
								name="degree"
								control={control}
								rules={{ required: "Se requiere un grado" }}
								render={({ field }) => (
									<Select
										{...field}
										options={degreeOptions}
										placeholder="Elige el grado"
										className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
										menuPortalTarget={document.body}
										styles={selectStylesCustom}
										value={degreeOptions.find((option) => option.value === field.value)}
										onChange={(option) => field.onChange(option.value)}
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
								Proyecto personal (no tiene asignatura)
							</label>
							<Controller
								name="personalProject"
								control={control}
								defaultValue={false}
								render={({ field: { onChange, onBlur, value, ref } }) => <input type="checkbox" className="form-checkbox" ref={ref} onBlur={onBlur} onChange={(e) => onChange(e.target.checked)} checked={value} />}
							/>
						</div>
					</div>

					{/* ASIGNATURA */}
					<div className="mb-2 w-full mx-auto col-span-1">
						<div className="flex flex-col">
							<Controller
								name="subject"
								control={control}
								rules={{ required: !isPersonalProject ? "Se requiere una asignatura" : undefined }}
								render={({ field }) => (
									<Select
										{...field}
										options={subjectOptions}
										className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
										menuPortalTarget={document.body}
										styles={selectStylesCustom}
										isDisabled={isPersonalProject}
										placeholder="Elige la asignatura"
										value={subjectOptions.find((option) => option.value === field.value)}
										onChange={(option) => field.onChange(option.value)}
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
										className="outline-none border-none bg-transparent w-full pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent" // Estilos consistentes con los otros Selects
										menuPortalTarget={document.body}
										styles={selectStylesCustom}
										value={awardOptions.filter((option) => Array.isArray(field.value) && field.value.includes(option.value))}
										onChange={(vals) => field.onChange(vals.map((val) => val.value))}
									/>
								)}
							/>
						</div>
						{errors.awards && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.awards.message}</p>}
					</div>

					{/* CURSO ACADÉMICO */}
					<div className="mb-2 md:col-span-1">
						<Controller
							name="academicCourse"
							control={control}
							rules={{ required: "Se requiere un curso académico" }}
							render={({ field }) => (
								<Select
									{...field}
									options={academicCourseOptions}
									value={academicCourseOptions.find((option) => option.value === field.value)}
									onChange={(val) => field.onChange(val.value)}
									className="outline-none border-none bg-transparent w-full pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
									menuPortalTarget={document.body}
									styles={selectStylesCustom}
								/>
							)}
						/>
						{errors.academicCourse && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.academicCourse.message}</p>}
					</div>

					{/* ENLACES EXTERNOS */}
					<div className="mb-2 md:col-span-2 outline outline-blue-400">
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

					{/* THUMBNAIL */}
					<div className="mb-2 md:col-span-1 outline outline-blue-400">
						<div className="m-3">
							<label className="block text-blue-400 text-sm font-bold mb-2">Thumbnail</label>
							<DropzoneInput name="thumbnail" placeholder={"Arrastra y suelta tu thumbnail aquí."} maxFiles="1" accept={{ "image/jpeg": [], "image/png": [] }} />
							{errors.thumbnail && (
								<p className="mb-2 mt-4 text-red-500 font-semibold">
									{errors.thumbnail.message}
									{console.log(errors.thumbnail)}
								</p>
							)}
						</div>
					</div>

					{/* RESUMEN */}
					<div className="mb-2 md:col-span-1 outline outline-blue-400">
						<div className="m-3">
							<label className="block text-blue-400 text-sm font-bold mb-2">Resumen del proyecto</label>
							<DropzoneInput name="summary" placeholder={"Arrastra y suelta tu resumen (pdf/doc) aquí."} maxFiles="1" />
							{errors.summary && (
								<p className="mb-2 mt-4 text-red-500 font-semibold">
									{errors.summary.message}
									{console.log(errors.summary)}
								</p>
							)}
						</div>
					</div>

					{/* ARCHIVOS DEL PROYECTO */}
					<div className="mb-4 md:col-span-2 outline outline-blue-400">
						<div className="m-3">
							<label className="block text-blue-400 text-sm font-bold mb-2">Archivos del proyecto</label>
							<DropzoneInput name="projectFiles" placeholder={"Arrastra y suelta tus archivos del proyecto aquí."} />
							{errors.projectFiles && (
								<p className="mb-2 mt-4 text-red-500 font-semibold">
									{errors.projectFiles.message}
									{console.log(errors.projectFiles)}
								</p>
							)}
						</div>
					</div>
				</form>
			</FormProvider>

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
