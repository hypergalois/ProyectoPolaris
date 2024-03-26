import React from "react";

import Stepper from "./Stepper";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep, currentStep }) => {
	return (
		<>
			<Stepper currentStep={currentStep} />
			<div>Titulo, Descripcion, Factor Diferencial</div>
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
					advanceStep();
				}}
			>
				SIGUIENTE
			</button>
		</>
	);
};

export default ProjectFormStep1;
