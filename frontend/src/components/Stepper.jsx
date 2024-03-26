import React from "react";
import "../styles/stepper.css";
import { TiTick } from "react-icons/ti";

const Stepper = ({ currentStep, isComplete }) => {
	const steps = ["Detalles", "Usuarios", "Elementos", "Resumen"];
	// const [isComplete, setIsComplete] = React.useState(isComplete);
	// const [complete, setComplete] = React.useState(isComplete);

	return (
		<div className="flex justify-between">
			{steps.map((step, index) => (
				<div key={index} className={`step-item ${currentStep === index + 1 && "active"} ${(index + 1 < currentStep || isComplete) && "complete"}`}>
					<div className="step">{index + 1 < currentStep || isComplete ? <TiTick size={24} /> : index + 1}</div>
					<p className="text-blue-500">{step}</p>
				</div>
			))}
		</div>
	);
};

export default Stepper;
