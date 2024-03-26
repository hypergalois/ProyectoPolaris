import React from "react";
import "../stepper.css";

const Stepper = ({ currentStep }) => {
	const steps = ["Detalles", "Usuarios", "Elementos", "Resumen"];

	return (
		<div className="flex justify-between">
			{steps.map((step, index) => (
				<div key={index} className="step-item">
					<div className="step">{index + 1}</div>
					<p className="text-blue-500">{step}</p>
				</div>
			))}
		</div>
	);
};

export default Stepper;
