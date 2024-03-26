import React from "react";

// TODO Funcionalidad de guardar borrador
const ProjectFormStep1 = ({ advanceStep }) => {
	return (
		<>
			<div>
				<h1>Step 1</h1>
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
