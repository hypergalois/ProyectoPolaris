import React from "react";

const ProjectFormStep3 = ({ returnStep }) => {
	return (
		<>
			<div>
				<h1>Step 3</h1>
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
