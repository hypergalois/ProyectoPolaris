import React from "react";

const ProjectFormStep3 = ({ returnStep, advanceStep, currentStep }) => {
	const current_step = 3;

	return (
		<>
			<div>
				<h1>Step {currentStep}</h1>
			</div>
			<button
				onClick={() => {
					returnStep();
				}}
			>
				ANTERIOR
			</button>
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

export default ProjectFormStep3;
