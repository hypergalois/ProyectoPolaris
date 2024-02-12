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
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Email</p>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i
          })}
        />
        {errors.email && <p>Hace falta un email</p>}

        <p>Password</p>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6
          })}
        />
        {errors.password && <p>Hace falta una contraseña</p>}

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
