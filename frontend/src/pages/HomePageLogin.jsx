import LoginForm from "../components/LoginForm";
import HomePageBar from "../components/HomePageBar";
import { Link } from "react-router-dom";

//class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"

const HomePage = () => {
    return (
        <div class="bg-[#858585] text-white">  
            
            <HomePageBar />
            <div class="flex justify-center h-screen">
                <form class="mx-auto text-center">
                    <div class="text-4xl">
                        <h1>BIENVENIDO</h1>
                    </div>
                    <div class="text-2xl">
                        <h2>Descubre y conecta con los proyectos que están dando forma al futuro digital en U-Tad</h2>
                    </div>    
                    <LoginForm />
                    <footer class="text-xl">
                        <p>¿Olvidaste tu contraseña? <a class="underline decoration-solid decoration-1" href="/forgot-password">Recupérala</a></p>
                        <p>¿Eres nuevo en U-Tad? <Link class="underline decoration-solid decoration-1" to="/register">Registrate</Link></p>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default HomePage;