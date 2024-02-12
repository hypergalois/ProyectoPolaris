import LoginForm from "../components/LoginForm";
import HomePageBar from "../components/HomePageBar";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <HomePageBar />
            <h1>BIENVENIDO</h1>
            <h2>Descubre y conecta con los proyectos que están dando forma al futuro digital en U-Tad</h2>
            <LoginForm />
            <footer>
                <p>¿Olvidaste tu contraseña? <a href="/forgot-password">Recupérala</a></p>
                <p>¿Eres nuevo en U-Tad? <Link to="/register">Registrate</Link></p>
            </footer>
        </>
    )
}

export default HomePage;