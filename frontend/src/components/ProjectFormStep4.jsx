import React from "react";
import Stepper from "./Stepper.jsx";

const ProjectFormStep4 = ({ returnStep, currentStep }) => {
	// No se si pasandole asi el estado si cambia se renderiza de nuevo
	const [isComplete, setIsComplete] = React.useState(false);

	return (
		<>
			<Stepper currentStep={currentStep} isComplete={isComplete} />
			<div>Previsualización</div>
			<button
				className="h-12 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold"
				onClick={() => {
					console.log("Guardar borrador");
				}}
			>
				GUARDAR BORRADOR
			</button>
			<button
				className="h-12 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold"
				onClick={() => {
					returnStep();
				}}
			>
				ANTERIOR
			</button>
			<button
				className="h-12 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold"
				onClick={() => {
					console.log("Subir proyecto");
					// Una vez que se suba, hay que poner el estilo del ultimo boton en complete y mostrar la animacion de tick
					setIsComplete(true);
				}}
			>
				SUBIR PROYECTO
			</button>
		</>
	);
};

export default ProjectFormStep4;
