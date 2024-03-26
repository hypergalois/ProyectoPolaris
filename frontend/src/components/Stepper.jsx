const Stepper = ({ steps, currentStepNumber }) => {
	const generateStepState = (stepNumber) =>
		steps.map((step, index) => ({
			description: step,
			completed: index < stepNumber,
			highlighted: index === stepNumber,
			selected: index <= stepNumber,
		}));

	const stepperSteps = generateStepState(currentStepNumber - 1);

	return (
		<div className="stepper-container mx-4 p-4 flex justify-between items-center">
			{stepperSteps.map((step, index) => (
				<div key={index} className="step-container text-center">
					{index !== 0 && <div className={`step-line ${step.selected ? "active" : ""}`} style={{ left: index === 0 ? "50%" : "0", right: index === steps.length - 1 ? "50%" : "0" }}></div>}
					<div className={`rounded-full step-number ${step.selected ? "selected" : ""} ${step.completed ? "completed" : ""}`}>{step.completed ? <span>✓</span> : index + 1}</div>
					<div className="step-description mt-2 text-xs font-medium uppercase">{step.description}</div>
				</div>
			))}
		</div>
	);
};

export default Stepper;
