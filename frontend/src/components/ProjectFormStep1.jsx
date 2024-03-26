import React from "react";
// import ProgressSteps from "./ProgressSteps.jsx";
import ProgressBar from "./ProgressBar.jsx";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep, currentStep }) => {
	return (
		<>
			<div className="">
				{/* <ProgressSteps currentStep={currentStep} /> */}
				<ProgressBar />
			</div>
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
					advanceStep();
				}}
			>
				SIGUIENTE
			</button>
		</>
	);
};

export default ProjectFormStep1;
