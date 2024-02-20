import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAreas } from "../context/AreasContext";
import { useState, useEffect } from "react";

const SecondaryRegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // Pongo registerUser para evitar colisiones con el hook register
    const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
    const { degrees, getDegrees, errors: areasErrors } = useAreas();
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state || {};
    const isUdEmailUtad = email.endsWith('@u-tad.com');
    const isUdEmailLive = email.endsWith('@live.u-tad.com');

    const [academicRole, setAcademicRole] = useState("1"); // Define academicRole state

    const departments = [];
    const [degreeOptions, setDegreeOptions] = useState([]);
    const years = [];
    for (let year = 2012; year <= 2022; year++) {
      years.push(year+"/"+(year+1));
    }

    // Handler for select change event
    const handleAcademicRoleChange = (event) => {
        setAcademicRole(event.target.value); // Update academicRole state
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
        getDegrees()
    }, [])

    useEffect(() => {
        if (degrees) {
            const newDegreeOptions = degrees.map((degree) => ({
              value: degree.id,
              label: degree.name,
            }));
            setDegreeOptions(newDegreeOptions);
          }
    }, [degrees])

    const onSubmit = handleSubmit(async (data) => {
        data.username = data.username + " " + data.usersecondname
        delete data.usersecondname;
        data.user = !data.user ? data.email.split('@')[0] : data.user;
        await registerUser(data);
    });

    return (
        <div className="text-black">
            <div>
                {
                    registerErrors.map((error, index) =>
                    (
                        <div key={index}>{error.message}</div>

                    ))
                }

            </div>
            <div>
                {
                    areasErrors.map((error, index) =>
                    (
                        <div key={index}>{error.message}</div>

                    ))
                }
            </div>
            <form onSubmit={onSubmit}>
                <input
                    type="hidden"
                    value={email} {
                        ...register("email")}
                />
                <div className="mb-4">
                    <input
                        className="w-full p-4 rounded-2xl"
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
                        className="w-full p-4 rounded-2xl"
                        type="text" {
                        ...register("usersecondname", {
                            required: true,
                            minLength: 3,
                            maxLength: 20
                        })}
                        placeholder="Apellidos"
                    />
                    {
                        errors.usersecondname && (
                            <p className="mb-2">Hace falta los apellidos</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <input 
                        className="w-full p-4 rounded-2xl"
                        type="text" {
                        ...register("user", {
                            required: false,
                            minLength: 3,
                            maxLength: 20
                        })}
                        placeholder="Usuario (opcional)"
                    />
                    {
                        errors.user && (
                            <p className="mb-2">Tiene que tener entre 3 y 20 caracteres</p>
                        )
                    }
                </div>
                {isUdEmailLive && (
                    <div className="mb-4 flex">
                        <div className="w-full">
                            <select 
                                className="w3-select w-full p-4 rounded-2xl" 
                                {...register("academicRole", {
                                    required: true,
                                    minLength: 3,
                                })}
                                name="academicRole" 
                                defaultValue="1" 
                                onChange={handleAcademicRoleChange}
                            >
                                <option value="1" disabled hidden>Cargo</option>
                                <option value="STUDENT">Alumno</option>
                                <option value="EXSTUDENT">Exalumno</option>
                            </select>
                            {
                                errors.academicRole && (
                                    <p className="mb-2">Hace falta un cargo</p>
                                )
                            }
                        </div>
                        {academicRole=="EXSTUDENT" && (
                            <div className="flex-none w-1/2">
                                <select 
                                    className="w-full p-4 rounded-2xl" 
                                    {...register("promocion", {
                                        required: true,
                                        minLength: 3,
                                    })}
                                    name="promocion" 
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>Promocion</option>
                                    {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                    ))}
                                </select>
                                {
                                    errors.promocion && (
                                        <p className="mb-2">Hace falta un cargo</p>
                                    )
                                }
                            </div>
                        )}
                    </div>
                )}
                {isUdEmailUtad && (
                    <div className="mb-4 flex">
                        <div className="w-full">
                            <select 
                                className="w3-select w-full p-4 rounded-2xl" 
                                {...register("academicRole", {
                                    required: true,
                                    minLength: 3,
                                })}
                                name="academicRole" 
                                defaultValue="1" 
                                onChange={handleAcademicRoleChange}
                            >
                                <option value="1" disabled hidden>Cargo</option>
                                <option value="TEACHER">Profesor</option>
                                <option value="COORDINATOR">Coordinador</option>
                                <option value="DEPARTAMENT">Departamento</option>
                            </select>
                            {
                                errors.academicRole && (
                                    <p className="mb-2">Hace falta un cargo</p>
                                )
                            }
                        </div>
                        {academicRole=="DEPARTAMENT" && (
                            <div className="flex-none w-1/2">
                                <select 
                                    className="w-full p-4 rounded-2xl" 
                                    {...register("departamento", {
                                        required: true,
                                        minLength: 3,
                                    })}
                                    name="departamento" 
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>Que departamento?</option>
                                    {departments.map(departments => (
                                    <option key={departments} value={departments}>
                                        {departments}
                                    </option>
                                    ))}
                                </select>
                                {
                                    errors.departamento && (
                                        <p className="mb-2">Hace falta un cargo</p>
                                    )
                                }
                            </div>
                        )}
                    </div>
                )}
                <div className="mb-4">
                    <select 
                        className="w3-select text-black w-full p-4 rounded-2xl overflow-hidden" 
                        {...register("grade", {
                            required: true,
                            minLength: 3,
                        })}
                        name="grade" 
                        defaultValue="">
                        <option value="" disabled hidden>Grados</option>
                        {degreeOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                            {label}
                            </option>
                        ))}
                    </select>
                    {
                        errors.grade && (
                            <p className="mb-2">Hace falta un cargo</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <button  className="w-full p-4 rounded-xl bg-[#333333] text-white" type="submit">
                        Registrarse
                    </button>
                </div>
            </form>

        </div>
    )
}

export default SecondaryRegisterForm;