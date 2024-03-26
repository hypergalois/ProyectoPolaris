import React from "react";

import Stepper from "./Stepper";
import TagsInputComponent from "./TagsInputComponent.jsx";

import { useForm, useController, useFieldArray, FormProvider } from "react-hook-form";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep, currentStep }) => {
	const methods = useForm({
		defaultValues: {
			title: "",
			description: "",
			differentialFactor: "",
			keywords: [],
		},
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit = (data) => {
		const formData = new FormData();

		// Agrega los datos simples del proyecto a FormData
		formData.append("title", data.title);
		formData.append("description", data.description);
		// formData.append("personalProject", data.personalProject);
	};

	return (
		<>
			<Stepper currentStep={currentStep} />
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white  rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-2">
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

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Factor diferenciador de la propuesta</label>
						<input
							type="text"
							{...register("differential_factor", {
								required: "Se requiere un factor diferencial",
							})}
							placeholder="Factor diferencial del proyecto"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.title && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.title.message}</p>}
					</div>

					<div className="mb-4 md:col-span-2">
						<label className="block text-gray-700 text-sm font-bold mb-2">Keywords</label>
						{/* Integra el componente TagsInputComponent */}
						<TagsInputComponent
							control={control}
							name="keywords"
							placeholder="Agregar keywords..."
							classNames={{
								tags: "react-tags",
								tagInput: "react-tags-input",
								tagInputField: "react-tags-input-field",
								selected: "react-tags-selected",
								tag: "react-tags-tag",
								remove: "react-tags-remove",
								suggestions: "react-tags-suggestions",
								activeSuggestion: "react-tags-active-suggestion",
							}}
						/>
					</div>
				</form>
			</div>
			<button
				className="h-12 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold"
				onClick={() => {
					console.log("Guardar borrador");
				}}
			>
				GUARDAR BORRADOR
			</button>
			<button
				className="h-12 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold"
				onClick={() => {
					// Ahora cuando hagamos click no hay que avanzar hasta que hayamos comprobado que los datos son correctos TODO
					// y por supuesto hay que guardarlo en el estado
					advanceStep();
				}}
			>
				SIGUIENTE
			</button>
		</>
	);
};

export default ProjectFormStep1;
