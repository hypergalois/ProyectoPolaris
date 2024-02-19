import { createContext, useState, useContext, useEffect } from 'react';
import { getDegreesRequest } from '../api/projects';

// TODO Crear el contexto para los proyectos

export const ProjectsContext = createContext();

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within an ProjectsProvider');
    }
    return context;
}

export const ProjectsProvider = ({ children }) => {
    const [degrees, setDegrees] = useState(null);
    const [errors, setErrors] = useState([]);

    const getDegrees = async () => {
        try {
            const response = await getDegreesRequest();
            setDegrees(response.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data]);
            }
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <ProjectsContext.Provider value={{ degrees, getDegrees, errors }}>
            {children}
        </ProjectsContext.Provider>
    )
}
