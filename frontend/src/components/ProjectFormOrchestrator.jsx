import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const ProjectFormOrchestrator = () => {
	return (
		<div>
			<h1>ProjectFormOrchestrator</h1>
		</div>
	);
};

export default ProjectFormOrchestrator;

// BORRADOR
const Popup = ({ openPopup, closePopup }) => {
	const [step, setStep] = useState(1);

	const goToNext = () => setStep((prevStep) => prevStep + 1);
	const goToPrevious = () => setStep((prevStep) => prevStep - 1);

	const renderStep = () => {
		switch (step) {
			case 1:
				return <Step1 goToNext={goToNext} />;
			case 2:
				return <Step2 goToNext={goToNext} goToPrevious={goToPrevious} />;
			case 3:
				return <Step3 goToPrevious={goToPrevious} />;
			default:
				return null;
		}
	};

	return (
		<Dialog open={openPopup} onClose={closePopup} maxWidth="md">
			<DialogTitle>
				<div className="flex justify-between items-center w-full">
					<h1 className="flex-1 text-4xl font-bold text-center">Fase {step} / 3</h1>
					<IconButton onClick={closePopup} className="flex-1 justify-end">
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>{renderStep()}</DialogContent>
		</Dialog>
	);
};
