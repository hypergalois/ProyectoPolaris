import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm, useController, useFieldArray, FormProvider } from "react-hook-form";

import Stepper from "../Helpers/Stepper.jsx";
// import { customStyles } from "../HomeSearchComponents/SearchForms.jsx";
import { selectStylesCustom } from "../../config/util.js";
import { useAreas } from "../../context/AreasContext.jsx";

// LO QUE TENIA JOSE
// <div>Titulacion, Asignatura, Proyecto Personal, Curso Academico, Premios, Miniatura, Archivos del Proyecto, Enlaces, Palabras Clave, Memoria del Proyecto</div>
// TODO Que cuando se seleccione un grado, se carguen las asignaturas de ese grado y viceversa

const ProjectFormStep3 = ({ returnStep, advanceStep, currentStep }) => {
	const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const {
		fields: linkFields,
		append: appendLink,
		remove: removeLink,
		update: updateLink,
	} = useFieldArray({
		control,
		name: "externalLinks",
	});

	// Lógica del useForm y valores por defecto
	const methods = useForm({
		defaultValues: async () => {
			if (projectId) {
				try {
					const defaultProject = await getProject(projectId);
					console.log(defaultProject);
					//const defaultThumbnail = defaultProject.thumbnail ? getFile(defaultProject.thumbnail) : null;
					const defProjVals = {
						title: defaultProject.title ? defaultProject.title : "",
						description: defaultProject.description ? defaultProject.description : "",
						keywords: defaultProject.keywords ? defaultProject.keywords : [],
						awards: defaultProject.awards ? defaultProject.awards : [],
						personalProject: defaultProject.personalProject ? defaultProject.personalProject : false,
						academicCourse: defaultProject.academicCourse ? defaultProject.academicCourse : "",
						course: defaultProject.course ? defaultProject.course : "",
						letter: defaultProject.letter ? defaultProject.letter : "",
						//thumbnail: defaultThumbnail ? [defaultThumbnail] : [],
						externalLinks: defaultProject.externalLinks ? defaultProject.externalLinks.map((item) => ({ link: item })) : [],
						//uploadedContent: defaultProject.uploadedContent ? defaultProject.uploadedContent.map(filePath => getFile(filePath)) : [],
						subject: defaultProject.subject ? defaultProject.subject : "",
						degree: defaultProject.degree ? defaultProject.degree : "",
						impliedStudents: defaultProject.impliedStudents ? defaultProject.impliedStudents.map((item) => ({ student: item })) : [{ student: "" }],
						impliedProfessors: defaultProject.impliedProfessors ? defaultProject.impliedProfessors.map((item) => ({ professor: item })) : [],
					};
					console.log(defProjVals);
					return defProjVals;
				} catch {
					console.log("Error fetching project");
				}
			}
			return defaultProjectFormValues;
		},
	});

	const { register, watch, setValue, getValues } = methods;

	const createDegreeOptions = (degrees) => {
		if (!degrees) return [];

		const allDegreesOption = { label: "Todos los Grados", value: "All" };
		const degreeOptions = degrees.map((degree) => ({
			label: degree.name,
			value: degree.id,
		}));

		return [allDegreesOption, ...degreeOptions];
	};

	const createSubjectOptions = (subjects) => {
		if (!subjects) return [];

		const allSubjectsOption = { label: "Todas las Asignaturas", value: "All" };
		const subjectOptions = subjects.map((subject) => ({
			label: subject.name,
			value: subject.id,
		}));

		return [allSubjectsOption, ...subjectOptions];
	};

	const createAwardOptions = (awards) => {
		if (!awards) return [];

		const allAwardsOption = { label: "Todos los Premios", value: "All" };
		const awardOptions = awards.map((award) => ({
			label: award.name,
			value: award.id,
		}));

		return [allAwardsOption, ...awardOptions];
	};

	const {
		field: { value: academicCourseValue, onChange: academicCourseOnChange, ...restAcademicCourseField },
	} = useController({
		name: "academicCourse",
		control,
		rules: {
			required: "Se requiere un curso académico",
		},
	});

	const [academicCourseOptions, setAcademicCourseOptions] = useState([]);
	useEffect(() => {
		setAcademicCourseOptions(generateAcademicCourseOptions(2010));
	}, []);
	const generateAcademicCourseOptions = (startYear) => {
		const currentMonth = new Date().getMonth(); // Obtener el mes actual (0-11, donde 0 es enero)
		const currentYear = new Date().getFullYear();
		const academicCourseOptions = [];

		// Si estamos antes de septiembre, retrocedemos un año
		const currentStartAcademicCourse = currentMonth < 8 ? currentYear - 1 : currentYear;

		// Genera opciones para los cursos académicos
		for (let year = startYear; year <= currentStartAcademicCourse; year++) {
			const nextYear = year + 1;
			const academicCourse = `${year}/${nextYear}`;
			academicCourseOptions.unshift({ value: academicCourse, label: academicCourse });
		}

		return academicCourseOptions;
	};

	const awardOptions = createAwardOptions(awards);
	const subjectOptions = createSubjectOptions(subjects);
	const degreeOptions = createDegreeOptions(degrees);

	const {
		field: { value: awardsValue, onChange: awardsOnChange, ...restAwardsField },
	} = useController({
		name: "awards",
		control,
	});

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

				<div className="mb-4 md:col-span-2">
					<Select
						options={awardOptions}
						isMulti
						placeholder="Selecciona los premios"
						value={awardsValue ? awardsValue.map((award) => awardOptions.find(({ value }) => value === award)) : awardsValue}
						onChange={(options) => awardsOnChange(options ? options.map(({ value }) => value) : options)}
						{...restAwardsField}
						className="w-full border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					{errors.award && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.award.message}</p>}
				</div>

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

export default ProjectFormStep3;
