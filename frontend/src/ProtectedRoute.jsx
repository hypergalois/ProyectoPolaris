import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// Voy a meter la navbar aqui, solo se renderiza cuando esta logeado
import NavBarAuth from "./components/NavBarAuth";
import NavBarNoAuth from "./components/NavBarNoAuth";

function ProtectedRoute() {
	const { loading, isAuthenticated } = useAuth();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!loading && !isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			{isAuthenticated ? <NavBarAuth /> : <NavBarNoAuth />}
			<Outlet />
		</>
	);
}

export default ProtectedRoute;
