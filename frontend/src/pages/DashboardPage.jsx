import { useState, useEffect } from "react";
import { useRequests } from "../context/RequestsContext";
import RequestCard from "../components/RequestCard";
import { getRequests } from "../api/requests";

function DashboardPage() {
	const { requests, getRequestsData, requestState } = useRequests();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRequestsData().then(() => setLoading(false));
		console.log(requests);
	}, [requestState]);

	if (requests.length === 0) {
		return <p>No hay peticiones para mostrar</p>;
	}

	return (
		<>
			<div className="container mx-auto px-4">
				<div className="flex justify-center mt-8">
					<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Accepted</button>
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Rejected</button>
					<button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Pending</button>
				</div>
			</div>

			<h1>Estas serían las peticiones más destacadas</h1>
			{loading ? (
				<p>Cargando peticiones...</p>
			) : (
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{requests.map((request) => (
							<RequestCard key={request.id} request={request} />
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default DashboardPage;
