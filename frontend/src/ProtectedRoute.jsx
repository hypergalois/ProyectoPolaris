import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

// Voy a meter la navbar aqui, solo se renderiza cuando esta logeado
import NavBarAuth from "./components/NavBarAuth";
import NavBarNoAuth from "./components/NavBarNoAuth";

function ProtectedRoute() {
	const { loading, isAuthenticated, isEmailVerified } = useAuth();
	const location = useLocation();

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (!loading && !isAuthenticated) {
		console.log("Redirecting to login");
		return <Navigate to="/" replace />;
	}

	// if (!loading && isAuthenticated && !isEmailVerified) {
	// 	console.log("Redirecting to verify email");
	// 	console.log(isEmailVerified, isAuthenticated, loading, location.pathname);
	// 	return <Navigate to="/verify-email" replace />;
	// }

	return (
		<>
			{isAuthenticated ? <NavBarAuth /> : <NavBarNoAuth />}
			<Outlet />
		</>
	);
}

export default ProtectedRoute;
