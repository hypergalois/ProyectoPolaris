import React from "react";
// import ProgressSteps from "./ProgressSteps.jsx";
// import ProgressBar from "./ProgressBar.jsx";
import Stepper from "./Stepper";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep, currentStep }) => {
	const stepNames = ["Step 1", "Step 2", "Step 3", "Complete"];

	return (
		<>
			<Stepper steps={stepNames} currentStepNumber={currentStep} />
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
