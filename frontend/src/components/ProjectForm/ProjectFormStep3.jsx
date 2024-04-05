import React from "react";

import Stepper from "../Stepper.jsx";

const ProjectFormStep3 = ({ returnStep, advanceStep, currentStep }) => {
	return (
		<>
			<Stepper currentStep={currentStep} />
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
