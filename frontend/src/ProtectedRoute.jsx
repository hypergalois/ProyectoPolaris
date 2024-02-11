import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return <p>Loading...</p>
    }

    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet />
}

export default ProtectedRoute;