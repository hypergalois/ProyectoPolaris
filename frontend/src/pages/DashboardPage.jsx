import { useState, useEffect }  from "react";
import { useRequests } from "../context/RequestsContext";
import RequestCard from "../components/RequestCard";

function DashboardPage() {
    const { requests, getRequestsData } = useRequests();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRequestsData().then(() => setLoading(false));
        console.log(requests);
    }, []);

    if (requests.length === 0) {
        return <p>No hay peticiones para mostrar</p>;
    }

    return (
        <>
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