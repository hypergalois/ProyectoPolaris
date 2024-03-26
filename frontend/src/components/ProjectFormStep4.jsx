import React from "react";

const ProjectFormStep3 = ({ returnStep, currentStep }) => {
	const current_step = 4;

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
		</>
	);
};

export default ProjectFormStep3;
