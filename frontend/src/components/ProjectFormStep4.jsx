import React from "react";
// import ProgressSteps from "./ProgressSteps.jsx";
import Stepper from "./Stepper.jsx";

const ProjectFormStep3 = ({ returnStep, currentStep }) => {
	const stepNames = ["Step 1", "Step 2", "Step 3", "Complete"];
	return (
		<>
			{/* <ProgressSteps currentStep={currentStep} /> */}
			<Stepper steps={stepNames} currentStepNumber={currentStep} />
			<div>Previsualización</div>
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
					console.log("Subir proyecto");
				}}
			>
				SUBIR PROYECTO
			</button>
		</>
	);
};

export default ProjectFormStep3;
