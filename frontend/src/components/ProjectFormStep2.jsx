import React from "react";

const ProjectFormStep2 = ({ returnStep, advanceStep }) => {
	return (
		<>
			<div>
				<h1>Step 2</h1>
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

export default ProjectFormStep2;
