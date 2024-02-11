// TODO Mejorar Navbar
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {

    // Yago, Aitor, dependiendo de si el usuario esta logeado o no, haremos conditional rendering
    // y mostraremos unos botones u otros
    // Para acceder al estado de autenticacion, usamos el hook useAuth

    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <div>
                <Link to="/">UTAD PROYECTOS</Link>
            </div>
            <ul>
                {isAuthenticated ? (
                    <React.Fragment>
                        <li>
                            <Link to="/projects/add">Añadir proyecto</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </React.Fragment>
                ) :
                    (
                        <React.Fragment>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </React.Fragment>
                    )}
            </ul>
        </nav>
    )
}

export default NavBar;