import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useController, useFieldArray, FormProvider } from "react-hook-form";
import Select from "react-select";
import { useAreas } from "../../context/AreasContext";
import { useProjects } from "../../context/ProjectsContext";
import DropzoneInput from "../DropzoneInput";
import { getFile } from "../../api/files";

const defaultProjectFormValues = {
	title: "",
	description: "",
	keywords: [],
	awards: [],
	personalProject: false,
	academicCourse: "",
	course: "",
	letter: "",
	thumbnail: [],
	externalLinks: [],
	uploadedContent: [],
	subject: "",
	degree: "",
	impliedStudents: [{ student: "" }],
	impliedProfessors: [],
};

const courseOptions = [
	{ value: "1", label: "1º" },
	{ value: "2", label: "2º" },
	{ value: "3", label: "3º" },
	{ value: "4", label: "4º" },
	{ value: "5", label: "5º" },
];

const letterOptions = [
	{ value: "A", label: "A" },
	{ value: "B", label: "B" },
	{ value: "C", label: "C" },
	{ value: "D", label: "D" },
	{ value: "E", label: "E" },
];

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

const ProjectForm = ({ closePopup }) => {
	const { getProject, createProject, updateProject, errors: projectsContextErrors } = useProjects();

	const { getDegrees, getSubjects, getSubjectsByDegree, getAwards, errors: areasContextErrors } = useAreas();

	const { id: projectId } = useParams();

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

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		getValues,
	} = methods;

	// Lógica de los arrayFields (grupos de campos que se almacenan en un array)
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

	// Lógica de los select
	// Controladores de react-hook-form para los select
	const {
		field: { value: degreeValue, onChange: degreeOnChange, ...restDegreeField },
	} = useController({
		name: "degree",
		control,
		rules: {
			required: "Se requiere un grado",
		},
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

	const {
		field: { value: courseValue, onChange: courseOnChange, ...restCourseField },
	} = useController({
		name: "course",
		control,
		rules: {
			required: "Se requiere un curso",
		},
	});

	const {
		field: { value: letterValue, onChange: letterOnChange, ...restLetterField },
	} = useController({
		name: "letter",
		control,
		rules: {
			required: "Se requiere una clase",
		},
	});

	const {
		field: { value: subjectValue, onChange: subjectOnChange, ...restsubjectField },
	} = useController({
		name: "subject",
		control,
		rules: {
			required: "Se requiere una asignatura",
		},
	});

	const {
		field: { value: awardsValue, onChange: awardsOnChange, ...restAwardsField },
	} = useController({
		name: "awards",
		control,
	});

	// Funciones de carga de las opciones de los select
	const [degreeOptions, setDegreeOptions] = useState([]);
	useEffect(() => {
		const getDegreeOptions = async () => {
			try {
				const degreesList = await getDegrees();
				const options = degreesList.map(({ id, name }) => ({
					value: id,
					label: name,
				}));
				setDegreeOptions(options);
			} catch {
				console.log("Error fetching options");
			}
		};

		getDegreeOptions();
	}, []);

	const [academicCourseOptions, setAcademicCourseOptions] = useState([]);
	useEffect(() => {
		setAcademicCourseOptions(generateAcademicCourseOptions(2010));
	}, []);

	const [subjectOptions, setSubjectOptions] = useState([]);
	const currentDegree = watch("degree");
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

	const [awardOptions, setAwardOptions] = useState([]);
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

	const onSubmit = (data) => {
		const formData = new FormData();

		// Agrega los datos simples del proyecto a FormData
		formData.append("title", data.title);
		formData.append("description", data.description);
		// formData.append("personalProject", data.personalProject);
		formData.append("subject", data.subject); // Aquí adjunta el ID del sujeto
		formData.append("academicCourse", data.academicCourse);
		formData.append("course", data.course);
		formData.append("letter", data.letter);
		formData.append("degree", data.degree);

		// Agrega los datos de tipo array del proyecto a FormData

		//const externalLinks = data.externalLinks ? data.externalLinks.map(({ link }) => link).filter((value) => value.trim().length !== 0) : [];
		//formData.append("externalLinks", JSON.stringify(externalLinks));

		const impliedStudents = data.impliedStudents ? data.impliedStudents.map(({ student }) => student).filter((value) => value.trim().length !== 0) : [];
		formData.append("impliedStudents", JSON.stringify(impliedStudents));

		const impliedProfessors = data.impliedTeachers ? data.impliedProfessors.map(({ professor }) => professor).filter((value) => value.trim().length !== 0) : [];
		formData.append("impliedTeachers", JSON.stringify(impliedProfessors));

		formData.append("awards", JSON.stringify(data.awards));

		// const keywords = data.keywords ? data.keywords.filter((value) => value.trim().length !== 0) : [];
		// formData.append("keywords", JSON.stringify(keywords));

		// Agrega los archivos del proyecto a FormData
		const files = data.uploadedContent ? [...data.uploadedContent] : [];
		// Cambio de nombre del archivo del thumbnail
		if (data.thumbnail[0]) {
			const type = data.thumbnail[0].name.split(".").pop();
			const thumbnail = new File([data.thumbnail[0]], `thumbnail.${type}`, { type });
			files.push(thumbnail);
		}
		// Se juntan todos los archivos en un array

		files.forEach((file) => formData.append("files", file));

		console.log(data, Object.fromEntries(formData.entries()));

		// TODO NO VALE ESTA LOGICA YA AL HACER UN POPUP
		if (projectId) {
			updateProject(projectId, formData);
		} else {
			createProject(formData);
		}

		closePopup();
		// Ya no tenemos que navegar
		// navigate("/home");
	};

	return (
		<div className="flex items-center justify-center min-h-screen my-8 max-w-4xl">
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white  rounded px-8 pt-6 pb-8 mb-4 grid gap-4 md:grid-cols-2">
					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
						<input
							type="text"
							{...register("title", {
								required: "Se requiere un título",
							})}
							placeholder="Título del proyecto"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.title && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.title.message}</p>}
					</div>

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Descripción del proyrcto</label>
						<textarea
							{...register("description", {
								required: "Se requiere una descripción del proyecto",
							})}
							placeholder="Descripción del proyecto"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						></textarea>
						{errors.description && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.description.message}</p>}
					</div>

					<div className="mb-4 md:col-span-1">
						<label className="block text-gray-700 text-sm font-bold mb-2">Grado</label>
						<Select
							options={degreeOptions}
							value={degreeValue ? degreeOptions.find(({ value }) => value === degreeValue) : degreeValue}
							onChange={(option) => degreeOnChange(option ? option.value : option)}
							{...restDegreeField}
							className="w-full  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.degree && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.degree.message}</p>}
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

					<div className="mb-4 md:col-span-1">
						<label className="block text-gray-700 text-sm font-bold mb-2">Curso</label>
						<Select
							options={courseOptions}
							value={courseValue ? courseOptions.find(({ value }) => value === courseValue) : courseValue}
							onChange={(option) => courseOnChange(option ? option.value : option)}
							{...restCourseField}
							className="w-full border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.course && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.course.message}</p>}
					</div>

					<div className="mb-4 md:col-span-1">
						<label className="block text-gray-700 text-sm font-bold mb-2">Clase</label>
						<Select
							options={letterOptions}
							value={letterValue ? letterOptions.find(({ value }) => value === letterValue) : letterValue}
							onChange={(option) => letterOnChange(option ? option.value : option)}
							{...restLetterField}
							className="w-full border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.letter && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.letter.message}</p>}
					</div>

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Asignatura</label>
						<Select
							options={subjectOptions}
							value={subjectValue ? subjectOptions.find(({ value }) => value === subjectValue) : subjectValue}
							onChange={(option) => subjectOnChange(option ? option.value : option)}
							{...restsubjectField}
							className="w-full border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.subject && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.subject.message}</p>}
					</div>

					{/* Esto no tiene sentido, tiene que estar bien implementado  */}
					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Proyecto personal</label>
						<input type="checkbox" {...register("personalProject")} />
					</div>

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Archivos del proyecto</label>
						<DropzoneInput name="uploadedContent" />
						{errors.uploadedContent && (
							<p className="mb-2 mt-4 text-red-500 font-semibold">
								{errors.uploadedContent.message}
								{console.log(errors.uploadedContent)}
							</p>
						)}
					</div>

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail</label>
						<DropzoneInput name="thumbnail" maxFiles="1" accept={{ "image/jpeg": [], "image/png": [] }} />
						{errors.thumbnail && (
							<p className="mb-2 mt-4 text-red-500 font-semibold">
								{errors.thumbnail.message}
								{console.log(errors.thumbnail)}
							</p>
						)}
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

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Premios</label>
						<Select
							options={awardOptions}
							isMulti
							value={awardsValue ? awardsValue.map((award) => awardOptions.find(({ value }) => value === award)) : awardsValue}
							onChange={(options) => awardsOnChange(options ? options.map(({ value }) => value) : options)}
							{...restAwardsField}
							className="w-full  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="mt-6 md:col-span-2 w-full">
						<button type="submit" className="w-full bg-[#2d2d2d] hover:bg-[#3f3f3f] text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
							Enviar
						</button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default ProjectForm;
