import { createContext, useState, useContext, useEffect } from "react";
import { getAreasRequest } from "../api/areas.js";
import { getDegreesRequest, getDegreesByAreaRequest } from "../api/degrees.js";
import { getAwardsRequest } from "../api/awards.js";
import { getSubjectsRequest, getSubjectsByDegreeRequest } from "../api/subjects.js";

export const AreasContext = createContext();

export const useAreas = () => {
	const context = useContext(AreasContext);
	if (!context) {
		throw new Error("useAreas must be used within an AreasProvider");
	}
	return context;
};

export const AreasProvider = ({ children }) => {
	const [areas, setAreas] = useState(null);
	const [degrees, setDegrees] = useState(null);
	const [degreesByArea, setDegreesByArea] = useState(null);
    const [awards, setAwards] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const [subjectsByDegree, setSubjectsByDegree] = useState(null);
	const [errors, setErrors] = useState([]);

	const getAreas = async () => {
		try {
			const response = await getAreasRequest();
			setAreas(response.data);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

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
	};

	const getDegreesByArea = async (areaId) => {
		try {
			const response = await getDegreesByAreaRequest(areaId);
			setDegreesByArea(response.data);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

    const getAwards = async () => {
        try {
            const response = await getAwardsRequest();
            setAwards(response.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data]);
            }
        }
    }

    const getSubjects = async () => {
        try {
            const response = await getSubjectsRequest();
            setSubjects(response.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data]);
            }
        }
    }

    const getSubjectsByDegree = async (degreeId) => {
        try {
            console.log("getSubjectsByDegree", degreeId)
            const response = await getSubjectsByDegreeRequest(degreeId);
            setSubjectsByDegree(response.data);
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

	return <AreasContext.Provider value={{ areas, getAreas, degrees, getDegrees, degreesByArea, getDegreesByArea, awards, getAwards, subjects, getSubjects, subjectsByDegree, getSubjectsByDegree, errors }}>{children}</AreasContext.Provider>;
};
