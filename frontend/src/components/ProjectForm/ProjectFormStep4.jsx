import React from "react";
import { useEffect } from "react";

import Stepper from "../Helpers/Stepper.jsx";
import { useProjects } from "../../context/ProjectsContext.jsx";

const ProjectFormStep4 = ({ returnStep, currentStep, editing, projectData, closePopup }) => {

	// No se si pasandole asi el estado si cambia se renderiza de nuevo
	const [isComplete, setIsComplete] = React.useState(false);
    const { project, createProject } = useProjects();

	// const onSubmit = (data) => {
	// 	console.log("Mnadando proyecto");
	// 	console.log(projectData);
	// };

    const prepareFormData = (projectData) => {
        const formData = new FormData();

        const flattenedData = Object.values(projectData).reduce((acc, step) => ({ ...acc, ...step }), {});
    
        for (const key in flattenedData) {
            if (Object.hasOwnProperty.call(flattenedData, key)) {
                const value = flattenedData[key];

                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach((item) => {
                            if (typeof item === 'object') {
                                formData.append(key, JSON.stringify(item));
                            } else {
                                formData.append(key, item);
                            }
                        });
                    } else if (typeof value === 'object') {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, value);
                    }
                }
            }
        }
    
        return formData;
    };

	const handleSubmit = async () => {
		const formData = prepareFormData(projectData);

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });

		try {
			const response = createProject(formData);

            console.log(response)

			if (response.ok) {
				setIsComplete(true);
				// Aquí, manejar el cierre automático y la animación de éxito
				setTimeout(() => closePopup(), 2000); // Ajusta el tiempo según sea necesario
			} else {
				throw new Error('Error al subir el proyecto');
			}
		} catch (error) {
			console.error('Error al enviar el formulario', error);
			// Manejar el feedback de error al usuario
		}
	};

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
						handleSubmit()
						returnStep();
					}}
				>
					ANTERIOR
				</button>
				{/* Este boton debe ir dentro de un form y que sea de tipo submit o quizas simplemente podemos hacerlo sin el form */}
				<button
					className="h-8 px-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-sm"
					onClick={() => {
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
