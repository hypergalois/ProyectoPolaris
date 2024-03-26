import React from "react";

import Stepper from "./Stepper.jsx";

const ProjectFormStep2 = ({ returnStep, advanceStep, currentStep }) => {
	return (
		<>
			<Stepper currentStep={currentStep} />
			<div>Usuarios, Profesores y Alumnos Implicados</div>
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
					returnStep();
				}}
			>
				ANTERIOR
			</button>
			<button
				className="h-12 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold"
				onClick={() => {
					advanceStep();
				}}
			>
				SIGUIENTE
			</button>
		</>
	);
};

export default ProjectFormStep2;
