import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getRequests, getRequestsByStatus, acceptRequest, rejectRequest } from "../api/requests";
import { useAuth } from "./AuthContext";

const RequestsContext = createContext();

export const useRequests = () => {
	const context = useContext(RequestsContext);
	if (!context) {
		throw new Error("useRequests must be used within an RequestsProvider");
	}
	return context;
};

export const RequestsProvider = ({ children }) => {
	const [requests, setRequests] = useState([]);
	const [requestState, setRequestState] = useState("");
	const [requestedRequest, setRequestedRequest] = useState({});

	const { isAuthenticated } = useAuth();

	const getRequestsData = async () => {
		try {
			const res = await getRequests();
			setRequests(res.data);
			setRequestState(res.data.status);
		} catch (error) {
			console.log(error);
		}
	};

	const acceptRequestData = async (id) => {
		try {
			const res = await acceptRequest(id);
			console.log(res.data);
			setRequestState(res.data.status);
		} catch (error) {
			console.log(error);
		}
	};

	const rejectRequestData = async (id) => {
		try {
			const res = await rejectRequest(id);
			setRequestState(res.data.status);
		} catch (error) {
			console.log(error);
		}
	};

	const getRequestsByStatusData = async (status) => {
		try {
			const res = await getRequestsByStatus(status);
			console.log(res.data);
			setRequests(res.data);
			setRequestState(res.data.status);
		} catch (error) {
			console.log(error);
		}
	};

	// Cambiado para que solo haga la peticion si esta autenticado
	useEffect(() => {
		if (isAuthenticated) {
			//getRequestsByStatusData("pending");
			console.log("User authenticated, getting requests");
		} else {
			console.log("User not authenticated, not getting requests");
		}
	}, [isAuthenticated]);

	const requestsData = { requests, setRequests, requestedRequest, setRequestedRequest, getRequestsData, getRequestsByStatusData, acceptRequestData, rejectRequestData, requestState };

	return <RequestsContext.Provider value={requestsData}>{children}</RequestsContext.Provider>;
};
