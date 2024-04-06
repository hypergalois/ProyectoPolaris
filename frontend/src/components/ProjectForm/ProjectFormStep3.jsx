import React from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Controller } from 'react-hook-form';
import { useForm } from "react-hook-form";

import Stepper from "../Helpers/Stepper.jsx";
import { customStyles } from "../HomeSearchComponents/SearchForms.jsx";
import { useAreas } from "../../context/AreasContext.jsx";

// LO QUE TENIA JOSE
// <div>Titulacion, Asignatura, Proyecto Personal, Curso Academico, Premios, Miniatura, Archivos del Proyecto, Enlaces, Palabras Clave, Memoria del Proyecto</div>
// TODO Que cuando se seleccione un grado, se carguen las asignaturas de ese grado y viceversa 

const ProjectFormStep3 = ({ returnStep, advanceStep, currentStep }) => {

    const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();
    const { handleSubmit, control, formState: { errors } } = useForm(); 

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
    
    const awardOptions = createAwardOptions(awards);
    const subjectOptions = createSubjectOptions(subjects);
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

            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded px-8 pt-6 mb-2 grid gap-4 md:grid-cols-1">
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
                                    styles={customStyles}
                                />
                            )}
                        />
                    </div>
                    {errors.degree && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.degree.message}</p>}
                </div>

                <div className="mb-2 w-full mx-auto">
                    <div className="pt-2 flex flex-col">
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
                            styles={customStyles}
                        />
                        )}
                    />
                    </div>
                    {errors.subject && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.subject.message}</p>}
                </div>

                <div className="mb-2 w-full mx-auto">
                    <div className="pt-2 justify-between items-center ">
                        <label htmlFor="personalProject" className="text-blue-400 text-xs text-left ml-3 font-semibold">
                        Proyecto personal
                        </label>
                        <Controller
                        name="personalProject"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <input
                            {...field}
                            type="checkbox"
                            className="mt-2 mr-3 ml-6"
                            />
                        )}
                        />
                    </div>
                </div>

                <div className="mb-2 w-full mx-auto">
                    <div className="pt-2 flex flex-col">
                        <Controller
                        name="award"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Se requiere un premio" }}
                        render={({ field }) => (
                            <Select
                            {...field}
                            options={awardOptions}
                            placeholder="Selecciona un premio"
                            className="outline-none border-none bg-transparent pt-2 text-blue-500 placeholder-blue-500 text-xs font-bold focus:outline-none focus:border-none focus:ring-0 focus:border-transparent"
                            menuPortalTarget={document.body}
                            styles={customStyles}
                            />
                        )}
                        />
                    </div>
                    {errors.award && <p className="mb-2 mt-4 text-red-500 font-semibold">{errors.award.message}</p>}
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
