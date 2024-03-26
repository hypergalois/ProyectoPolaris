import React from "react";
import ProgressSteps from "./ProgressSteps.jsx";

const ProjectFormStep3 = ({ returnStep, currentStep }) => {
	return (
		<>
			<ProgressSteps currentStep={currentStep} />
			<div>
				<h1>Step {currentStep}</h1>
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
