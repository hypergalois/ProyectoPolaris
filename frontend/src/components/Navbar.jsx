// TODO Mejorar Navbar
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import React from "react";


function NavBar() {
	// Yago, Aitor, dependiendo de si el usuario esta logeado o no, haremos conditional rendering
	// y mostraremos unos botones u otros
	// Para acceder al estado de autenticacion, usamos el hook useAuth

	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/home`);
	};

	return (
		<nav className="flex justify-between items-center p-8">
			<div className="flex items-center">
				<img
					src="/logo-projects.png" // Reemplaza 'url_de_tu_imagen.jpg' con la URL de tu imagen
					alt="Logo Izquierda"
					className="h-16 w-auto cursor-pointer"
					onClick={handleClick}
				/>
			</div>
			<div className="flex items-center">
				{isAuthenticated ? (
					<React.Fragment>
						<div>
							<Link to="/projects">UTAD PROYECTOS</Link>
						</div>
						<div>
							<Link to="/projects/new">Añadir proyecto</Link>
						</div>
						<div>
							<Link to="/logout">Logout</Link>
						</div>
						<div>
							<Link to="/profile">Profile</Link>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div>
							<Link to="/login">Login</Link>
						</div>
						<div>
							<Link to="/register">Register</Link>
						</div>
					</React.Fragment>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
