import React from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Controller } from 'react-hook-form';
import { useForm } from "react-hook-form";

import Stepper from "../Helpers/Stepper.jsx";
import { customStyles } from "../HomeSearchComponents/SearchForms.jsx";
import { useAreas } from "../../context/AreasContext.jsx";

const ProjectFormStep3 = ({ returnStep, advanceStep, currentStep }) => {

    const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();

    const createDegreeOptions = (degrees) => {
        if (!degrees) return [];
      
        const allDegreesOption = { label: "Todos los Grados", value: "All" };
        const degreeOptions = degrees.map((degree) => ({
          label: degree.name,
          value: degree.id,
        }));
      
        return [allDegreesOption, ...degreeOptions];
      };
      
    const degreeOptions = createDegreeOptions(degrees);

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
			degree: "",
			subjects: "",
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

            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-1">
                <div className="mb-2 w-full mx-auto">
                    <div className="pt-2 border flex flex-col outline outline-blue-400">
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
                            styles={customStyles}
                        />
                        )}
                    />
                    </div>
                    {errors.degree && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.degree.message}</p>}
                </div>
            </form>

			<div>Titulacion, Asignatura, Proyecto Personal, Curso Academico, Premios, Miniatura, Archivos del Proyecto, Enlaces, Palabras Clave, Memoria del Proyecto</div>
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
