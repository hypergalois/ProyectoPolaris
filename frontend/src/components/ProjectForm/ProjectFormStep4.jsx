import React from "react";
import { useEffect } from "react";

import Stepper from "../Helpers/Stepper.jsx";

const ProjectFormStep4 = ({ returnStep, currentStep, editing, projectData }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowLeft") {
				handleSubmit(onSubmit)();
				returnStep();
			}
			// Si es derecha, ya lo mandamos supongo
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [returnStep]);

	// No se si pasandole asi el estado si cambia se renderiza de nuevo
	const [isComplete, setIsComplete] = React.useState(false);

	// const onSubmit = (data) => {
	// 	console.log("Mnadando proyecto");
	// 	console.log(projectData);
	// };

	// const handleSubmit = async () => {
	// 	const formData = prepareFormData(projectData);
	// 	try {
	// 		// Aquí reemplazar con tu endpoint real y configuración
	// 		const response = await fetch('tu_endpoint', {
	// 			method: 'POST',
	// 			body: formData,
	// 		});
	// 		if (response.ok) {
	// 			setIsComplete(true);
	// 			// Aquí, manejar el cierre automático y la animación de éxito
	// 			setTimeout(() => closePopup(), 2000); // Ajusta el tiempo según sea necesario
	// 		} else {
	// 			throw new Error('Error al subir el proyecto');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error al enviar el formulario', error);
	// 		// Manejar el feedback de error al usuario
	// 	}
	// };

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
						handleSubmit(onSubmit)();
						returnStep();
					}}
				>
					ANTERIOR
				</button>
				{/* Este boton debe ir dentro de un form y que sea de tipo submit o quizas simplemente podemos hacerlo sin el form */}
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
						console.log("Subir proyecto");
						console.log(projectData);
						// handleSubmit(onSubmit)();
						handleSubmit();
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
