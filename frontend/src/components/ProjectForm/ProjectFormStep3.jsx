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
		defaultValues: {
			degree: "",
			personalProject: false,
			subject: "",
			academicCourse: "",
			course: "",
			//thumbnailFile: projectData.thumbnail ? [projectData.thumbnail] : [],
			//projectFiles: projectData.uploadedContent ? projectData.uploadedContent.map(filePath => getFile(filePath)) : [],
			// summaryFile: projectData.
			externalLinks: [],
		},
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
	const currentDegree = watch("degree");

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
			} catch {
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
	useEffect(() => {
		const getSubjectOptions = async () => {
			if (currentDegree) {
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
		field: { value: academicCourseValue, onChange: academicCourseOnChange, ...restAcademicCourseField },
	} = useController({
		name: "academicCourse",
		control,
		rules: {
			required: "Se requiere un curso académico",
		},
	});

	// const awardOptions = createAwardOptions(awards);
	// const subjectOptions = createSubjectOptions(subjects);
	// const degreeOptions = createDegreeOptions(degrees);
	// console.log(degrees);

	const {
		field: { value: awardsValue, onChange: awardsOnChange, ...restAwardsField },
	} = useController({
		name: "awards",
		control,
	});

	const onSubmit = (data) => {
		// Convert the degree and subject from an object to a string
		data.degree = data.degree.value;
		data.subject = data.subject.value;

		console.log(data);
		// Here you can handle the form submission.
		// For example, you can send the data to a server or update the state of your component.
	};

	return (
		<>
			<Stepper currentStep={currentStep} />

			<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded px-8 pt-6 mb-2">
				<div className="mb-2 w-full mx-auto">
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

				<div className="mb-2 w-full mx-auto">
					<div className="flex pt-2 gap-4 items-center">
						<label htmlFor="personalProject" className="text-blue-400 text-xs font-semibold">
							Proyecto personal
						</label>
						<Controller name="personalProject" control={control} defaultValue={false} render={({ field }) => <input {...field} type="checkbox" className="form-checkbox" />} />
					</div>
				</div>

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
							className="w-full border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							// Ajuste para la selección múltiple
							value={awardOptions.filter((option) => field.value.includes(option.value))}
							onChange={(vals) => field.onChange(vals.map((val) => val.value))}
						/>
					)}
				/>

				<div className="mb-4 md:col-span-1">
					<label className="block text-gray-700 text-sm font-bold mb-2">Curso académico</label>
					<Select
						options={academicCourseOptions}
						value={academicCourseValue ? academicCourseOptions.find(({ value }) => value === academicCourseValue) : academicCourseValue}
						onChange={(option) => academicCourseOnChange(option ? option.value : option)}
						{...restAcademicCourseField}
						className="w-full  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					{errors.academicCourse && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.academicCourse.message}</p>}
				</div>

				<div className="mb-4 md:col-span-2">
					<label className="block text-gray-700 text-sm font-bold mb-2">Enlaces a recursos externos</label>
					{linkFields.map((field, index) => (
						<div key={field.id} className="flex items-center gap-2">
							<input type="url" {...register(`externalLinks.${index}.link`)} placeholder="URL" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
							<button
								type="button"
								onClick={() => {
									removeLink(index);
								}}
								className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
							>
								Eliminar
							</button>
						</div>
					))}
					<div className="flex justify-center mt-4">
						<button type="button" onClick={() => appendLink({ link: "" })} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Añadir recurso externo
						</button>
					</div>
				</div>
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
