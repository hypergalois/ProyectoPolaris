// TODO Mejorar Navbar
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function NavBar() {
	// Yago, Aitor, dependiendo de si el usuario esta logeado o no, haremos conditional rendering
	// y mostraremos unos botones u otros
	// Para acceder al estado de autenticacion, usamos el hook useAuth

	const { logout: logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleClickImage = () => {
		navigate(`/home`);
	};
	const handleClickLogout = async () => {
		await logout();
		navigate(`/`);
	};

	return (
		<nav className="flex justify-between items-center p-8">
			<div className="flex items-center">
				<img
					src="/logo-projects.png" // Reemplaza 'url_de_tu_imagen.jpg' con la URL de tu imagen
					alt="Logo Izquierda"
					className="h-16 w-auto cursor-pointer"
					onClick={handleClickImage}
				/>
			</div>
			<div className="flex items-center w-auto">
				{isAuthenticated ? (
					<React.Fragment>
						<div className="w-auto p-4">
							<Link to="/projects">Home</Link>
						</div>
						<div className="w-auto p-4">
							<Link to="/projects/new">Añadir proyecto</Link>
						</div>
						<div className="w-auto p-4">
							<a>
								Notificaciones
							</a>
						</div>
						<div className="w-auto p-4">
							<Link to="/profile">Profile</Link>
						</div>
						<div className="w-auto p-4">
							<a className="cursor-pointer" onClick={handleClickLogout}>
								Logout
							</a>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="w-auto p-4">
							<Link to="/">Login</Link>
						</div>
						<div className="w-auto p-4">
							<Link to="/register">Register</Link>
						</div>
					</React.Fragment>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
