import React from "react";
import { useEffect } from "react";

import Stepper from "../Helpers/Stepper.jsx";

const ProjectFormStep4 = ({ returnStep, currentStep }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowLeft") {
				returnStep();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [returnStep]);

	// No se si pasandole asi el estado si cambia se renderiza de nuevo
	const [isComplete, setIsComplete] = React.useState(false);

	return (
		<>
			<Stepper currentStep={currentStep} isComplete={isComplete} />
			<div>Previsualización</div>

			<div className="flex justify-end gap-4">
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						console.log("Guardar borrador");
					}}
				>
					GUARDAR BORRADOR
				</button>
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						returnStep();
					}}
				>
					ANTERIOR
				</button>
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						console.log("Subir proyecto");
						// Una vez que se suba, hay que poner el estilo del ultimo boton en complete y mostrar la animacion de tick
						setIsComplete(true);
					}}
				>
					SUBIR PROYECTO
				</button>
			</div>
		</>
	);
};

export default ProjectFormStep4;
