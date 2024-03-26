import React from "react";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep, currentStep }) => {
	return (
		<>
			<div>
				<h1>Step {currentStep}</h1>
			</div>
			<button
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
