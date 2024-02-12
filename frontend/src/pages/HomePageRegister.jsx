import HomePageBar from "../components/HomePageBar";
import InitialRegisterForm from "../components/InitialRegisterForm";
import HomePageLanding from "../components/HomePageLanding";

import { Link } from "react-router-dom";

const HomePageRegister = () => {
    return (
        <>
            <HomePageBar />
            <div className="flex">
                <div className="flex-1">
                    <HomePageLanding />
                </div>
                <div className="flex-1">
                    <h1>CREA TU CUENTA</h1>
                    <h2>Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></h2>
                    <InitialRegisterForm />
                </div>
            </div>
        </>
    )
}

export default HomePageRegister;