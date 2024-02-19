import LoginForm from "../components/LoginForm";
import HomePageBar from "../components/HomePageBar";
import HomePageAnimation from "../components/HomePageAnimation";
import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <div className="bg-[#858585] text-white  items-center h-screen">
            <HomePageAnimation/>  
            <HomePageBar />
            <div className="flex justify-center">
                <div className="mx-auto text-center">
                    <div className="text-4xl">
                        <h1>BIENVENIDO</h1>
                    </div>
                    <div className="text-2xl">
                        <h2>Descubre y conecta con los proyectos que están dando forma al futuro digital en U-Tad</h2>
                    </div>    
                    <LoginForm />
                    <footer className="text-xl">
                        <p>¿Olvidaste tu contraseña? <a className="underline decoration-solid decoration-1" href="/forgot-password">Recupérala</a></p>
                        <p>¿Eres nuevo en U-Tad? <Link className="underline decoration-solid decoration-1" to="/register">Registrate</Link></p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default HomePage;