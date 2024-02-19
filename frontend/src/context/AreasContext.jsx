import { createContext, useState, useContext, useEffect } from 'react';
import { getDegreesRequest } from '../api/areas-degrees.js';

export const AreasContext = createContext();

export const useAreas = () => {
    const context = useContext(AreasContext);
    if (!context) {
        throw new Error('useAreas must be used within an AreasProvider');
    }
    return context;
}

export const AreasProvider = ({ children }) => {
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
        <AreasContext.Provider value={{ degrees, getDegrees, errors }}>
            {children}
        </AreasContext.Provider>
    )
}
