import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const InitialRegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // Pongo registerUser para evitar colisiones con el hook register
    const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate])

    const onSubmit = handleSubmit(async (data) => {
        await registerUser(data);
    });

    return (
        <div>
            <div>
                {
                    registerErrors.map((error, index) =>
                    (
                        <div key={index}>{error.message}</div>

                    )
                    )}
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <input
                        className="w-5/12 p-4 rounded-2xl"
                        type="text" {
                        ...register("username", {
                            required: true,
                            minLength: 3,
                            maxLength: 20
                        })}
                        placeholder="Nombre"
                    />
                    {
                        errors.username && (
                            <p className="mb-2">Hace falta un nombre de usuario</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <input 
                        className="w-5/12 p-4 rounded-2xl"
                        type="email" {
                        ...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i
                        })}
                        placeholder="Correo de la Utad"
                    />
                    {
                        errors.email && (
                            <p className="mb-2">Hace falta un email</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <p className="text-xs">Creando una cuenta aceptas los Términos de Uso y la Política de Privacidad.</p>
                </div>
                <div className="mb-4">
                    <button  className="w-5/12 p-4 rounded-xl bg-[#333333] text-white" type="submit">
                        Registrarse
                    </button>
                </div>


            </form>

        </div>
    )
}

export default InitialRegisterForm;