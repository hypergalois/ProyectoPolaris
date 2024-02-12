import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const SecondaryRegisterForm = () => {

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
            <h1>Registrarse</h1>
            <form onSubmit={onSubmit}>
                <p>Username</p>
                <input type="text" {
                    ...register("username", {
                        required: true,
                        minLength: 3,
                        maxLength: 20
                    })
                }
                />
                {
                    errors.username && (
                        <p>Hace falta un nombre de usuario</p>
                    )
                }

                <p>Email</p>
                <input type="email" {
                    ...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })
                }
                />
                {
                    errors.email && (
                        <p>Hace falta un email</p>
                    )
                }

                <p>Password</p>
                <input type="password" {
                    ...register("password", {
                        required: true,
                        minLength: 6
                    })
                }
                />
                {
                    errors.password && (
                        <p>Hace falta una contraseña</p>
                    )
                }

                <button type="submit">
                    Registrarse
                </button>


            </form>

        </div>
    )
}

export default SecondaryRegisterForm;