import React from "react";

import { useState } from "react";
import ProjectFormStep1 from "./ProjectFormStep1.jsx";
import ProjectFormStep2 from "./ProjectFormStep2.jsx";
import ProjectFormStep3 from "./ProjectFormStep3.jsx";
import PopupUploadProject from "./PopupUploadProject.jsx";

const ProjectFormOrchestrator = ({ openPopup, closePopup }) => {
	const [step, setStep] = useState(1);

	const goToNext = () => setStep((prevStep) => prevStep + 1);
	const goToPrevious = () => setStep((prevStep) => prevStep - 1);

	const renderStep = () => {
		switch (step) {
			case 1:
				return <ProjectFormStep1 goToNext={goToNext} />;
			case 2:
				return <ProjectFormStep2 goToNext={goToNext} goToPrevious={goToPrevious} />;
			case 3:
				return <ProjectFormStep3 goToPrevious={goToPrevious} />;
			default:
				return null;
		}
	};

	return <PopupUploadProject title="Subir Proyecto" openPopup={openPopup} closePopup={closePopup} renderStep={renderStep} />;
};

export default ProjectFormOrchestrator;
