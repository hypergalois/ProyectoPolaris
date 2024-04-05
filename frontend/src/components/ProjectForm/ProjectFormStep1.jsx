import React from "react";
import { useEffect } from "react";

import Stepper from "../Stepper.jsx";
import TagsInputComponent from "../TagsInputComponent.jsx";

import { useForm, useController, useFieldArray, FormProvider } from "react-hook-form";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep, currentStep }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowRight") {
				advanceStep();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [advanceStep]);

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
				<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-1">
					<div className="mb-2 w-full mx-auto">
						<div className="pt-2 border flex flex-col outline outline-blue-400">
							<label htmlFor="title" className="text-blue-400 text-xs text-left ml-3 font-semibold">
								Título
							</label>
							<input
								id="title"
								type="text"
								{...register("title", {
									required: "Se requiere un título",
								})}
								placeholder="Título del proyecto"
								className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
								autoComplete="off"
							/>
						</div>
						{errors.title && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.title.message}</p>}
					</div>

					<div className="mb-2 w-full mx-auto">
						<div className="pt-2 border flex flex-col outline outline-blue-400">
							<label htmlFor="description" className="text-blue-400 text-xs text-left ml-3 font-semibold">
								Descripción del proyecto
							</label>
							<textarea
								id="description"
								{...register("description", {
									required: "Se requiere una descripción del proyecto",
								})}
								placeholder="Descripción del proyecto"
								className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent h-32 resize-none"
								autoComplete="off"
							></textarea>
						</div>
						{errors.description && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.description.message}</p>}
					</div>

					<div className="mb-2 w-full mx-auto">
						<div className="pt-2 border flex flex-col outline outline-blue-400">
							<label htmlFor="differential_factor" className="text-blue-400 text-xs text-left ml-3 font-semibold">
								Factor diferenciador de la propuesta
							</label>
							<input
								id="differential_factor"
								type="text"
								{...register("differential_factor", {
									required: "Se requiere un factor diferencial",
								})}
								placeholder="Factor diferencial del proyecto"
								className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
								autoComplete="off"
							/>
						</div>
						{errors.differential_factor && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.differential_factor.message}</p>}
					</div>

					<div className="mb-4 w-full mx-auto">
						<div className="pt-2 border-[2.5px] border-blue-400 ">
							<label htmlFor="keywords" className="text-blue-400 text-xs text-left ml-3 font-semibold block">
								Keywords
							</label>
							<TagsInputComponent
								control={control}
								name="keywords"
								placeholder="Agregar keywords..."
								classNames={{
									tags: "flex flex-wrap gap-2 p-2",
									tagInput: "flex-1 min-w-0",
									tagInputField: "outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold w-full",
									selected: "flex flex-wrap gap-2",
									tag: "bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-semibold",
									remove: "ml-2 cursor-pointer text-blue-500",
									suggestions: "absolute z-10 bg-white shadow-lg mt-1",
									activeSuggestion: "bg-blue-100",
								}}
							/>
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
						advanceStep();
					}}
				>
					SIGUIENTE
				</button>
			</div>
		</>
	);
};

export default ProjectFormStep1;
