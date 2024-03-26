import React from "react";

import { useState } from "react";
import ProjectFormStep1 from "./ProjectFormStep1.jsx";
import ProjectFormStep2 from "./ProjectFormStep2.jsx";
import ProjectFormStep3 from "./ProjectFormStep3.jsx";
import ProjectFormStep4 from "./ProjectFormStep4.jsx";
import PopupUploadProject from "./PopupUploadProject.jsx";

// El problema esta, guardo los estados de los componentes hijos en estados individuales o en un estado global?
// Voy a optar por la segunda opcion, ya que me parece mas limpio y ordenado
const ProjectFormOrchestrator = ({ openPopup, closePopup }) => {
	const [step, setStep] = useState(1);
	const [projectData, setProjectData] = useState({
		step1: {},
		step2: {},
		step3: {},
	});

	const updateProjectData = (step, data) => {
		setProjectData((prev) => ({ ...prev, [step]: data }));
	};

	const goToNext = () => setStep((prevStep) => prevStep + 1);
	const goToPrevious = () => setStep((prevStep) => prevStep - 1);

	const renderStep = () => {
		switch (step) {
			case 1:
				return <ProjectFormStep1 advanceStep={goToNext} currentStep={step} updateProjectData={updateProjectData} />;
			case 2:
				return <ProjectFormStep2 advanceStep={goToNext} returnStep={goToPrevious} currentStep={step} updateProjectData={updateProjectData} />;
			case 3:
				return <ProjectFormStep3 advanceStep={goToNext} returnStep={goToPrevious} currentStep={step} updateProjectData={updateProjectData} />;
			case 4:
				return <ProjectFormStep4 returnStep={goToPrevious} currentStep={step} />;
			default:
				return null;
		}
	};

	return <PopupUploadProject title="Subir Proyecto" openPopup={openPopup} closePopup={closePopup} renderStep={renderStep} />;
};

export default ProjectFormOrchestrator;
