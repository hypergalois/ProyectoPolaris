// LoginComponent.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login: loginUser, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await loginUser(data);
  };

  return (
    <div>
      <div>
        {loginErrors.map((error, index) => <div key={index}>{error.message}</div>)}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="mb-4"> 
          <input
            className="w-5/12 h-10 px-6 rounded-xl text-black"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i
            })}
            placeholder="Usuario o correo"
          />
          {errors.email && <p>Hace falta un email</p>}
        </div>
        <div className="mb-4">
          <input
            className="w-5/12 h-10 px-6 rounded-xl text-black"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6
            })}
            placeholder="Contraseña"
          />
          {errors.password && <p>Hace falta una contraseña</p>}
        </div>
        <div className="mb-4">
          <button className="w-5/12 h-10 px-6 rounded-xl bg-[#333333] text-white" type="submit">INICIAR SESIÓN</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
