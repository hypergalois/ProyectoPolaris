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
    
        // Flatten the projectData object
        const flattenedData = Object.values(projectData).reduce((acc, step) => ({ ...acc, ...step }), {});
    
        Object.entries(flattenedData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (key === 'keywords' || key === 'impliedStudents' || key === 'impliedProfessors' || key === 'awards' || key === 'externalLinks') {
                    value.forEach((item, index) => {
                        formData.append(`${key}[${index}]`, item);
                    });
                } else {
                    formData.append(key, JSON.stringify(value));
                }
            } else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
                formData.append(key, value, value.name);
            } else {
                formData.append(key, value);
            }
        });
    
        return formData;
    };

	const handleSubmit = async () => {
		const formData = prepareFormData(projectData);


        for (const pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
          }

		try {
			const response = createProject(formData);
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
