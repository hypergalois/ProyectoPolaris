import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useProjects } from "../context/ProjectsContext";
import { useAreas } from "../context/AreasContext";

const classNumberOptions = [
    {value : 1, label : "1º"},
    {value : 2, label : "2º"},
    {value : 3, label : "3º"},
    {value : 4, label : "4º"},
    {value : 5, label : "5º"}
];
const classLetterOptions = [
    {value : "A", label : "A"},
    {value : "B", label : "B"},
    {value : "C", label : "C"}
];

const ProjectForm = () => {
    const { register, control, handleSubmit, formState: { errors }, setValue } = useForm();
    const { fields : studentFields, append : appendStudent } = useFieldArray({
        control,
        name: "students"
    });
    const { fields : teacherFields, append : appendTeacher } = useFieldArray({
        control,
        name: "teachers"
    });
    const { fields : awardFields, append : appendAward } = useFieldArray({
        control,
        name: "awards"
    });
    const { degrees, getDegrees, errors : areasContextErrors } = useAreas()

    const degreeOptions = Array();
    
    useEffect(() => {
        getDegrees()

        appendStudent({ student : "" });
        appendTeacher({ teacher : "" });
        appendAward({ award : "" });
    }, []);

    useEffect(() => {
        if(degrees) {
            degrees.map((degree) => {
                degreeOptions.push({ value : degree.id, label : degree.name });
            })
        }
    }, [degrees])

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>Título</h3>
                <input
                    type="text"
                    {...register("projectTitle", {
                        required : true,
                    })}
                    placeholder="Título del proyecto"
                />
            </div>
            <div>
                <h3>Grado</h3>
                <Select
                    options={degreeOptions}
                    onChange={(selectedDgree) => { setValue("degree", selectedDgree) }}
                />
            </div>
            <div>
                <h3>Curso</h3>
                <Select
                    options={classNumberOptions}
                    onChange={(selectedClassNumber) => { setValue("classNumber", selectedClassNumber) }}
                />
            </div>
            <div>
                <h3>Clase</h3>
                <Select
                    options={classLetterOptions}
                    onChange={(selectedClassLetter) => { setValue("classLetter", selectedClassLetter) }}
                />
            </div>
            <div>
                <h3>Curso académico</h3>
                <input
                    type="text"
                    {...register("academicYear", {
                        required : true,
                        pattern: {
                            value: /\d{4}\/\d{4}/,
                            message: 'Formato no válido. Utiliza el formato: XXXX/XXXX',
                        }
                    })}
                    placeholder="XXXX/XXXX"
                />
            </div>
            <div>
                <h3>Asignatura</h3>
                <input
                    type="text"
                    {...register("subject", {
                        required : true,
                    })}
                    placeholder="Asignatura"
                />
            </div>
            <div>
                <h3>Archivo del proyecto</h3>
                <input
                    type="file"
                    {...register("projectFile", {
                        required : true
                    })}
                />
            </div>
            <div>
                <h3>Memoria del proyecto</h3>
                <input
                    type="file"
                    {...register("projectMemory", {
                        required : false
                    })}
                />
            </div>
            <div>
                <h3>Enlace a recursos externos</h3>
                <input
                    type="url"
                    {...register("projectLink", {
                        required : false
                    })}
                    placeholder="URL"
                />
            </div>
            <div>
                <h3>Estudiantes implicados</h3>
                {studentFields.map((field, index) => (
                    <div key={field.id}>
                    <input
                        type="text"
                        {...register(`student.${index}`, {
                            required : (index === 0)
                        })}
                        placeholder="Estudiante implicado"
                    />
                    </div>
                ))}
                <button type="button" onClick={() => appendStudent({ student : "" })}>
                    Añadir estudiante
                </button>
            </div>
            <div>
                <h3>Profesores implicados</h3>
                {teacherFields.map((field, index) => (
                    <div key={field.id}>
                    <input
                        type="text"
                        {...register(`teacher.${index}`)}
                        placeholder="Profesor implicado"
                    />
                    </div>
                ))}
                <button type="button" onClick={() => appendTeacher({ teacher : "" })}>
                    Añadir profesor
                </button>
            </div>
            <div>
                <h3>Premios</h3>
                {awardFields.map((field, index) => (
                    <div key={field.id}>
                    <input
                        type="text"
                        {...register(`award.${index}`)}
                        placeholder="Premio"
                    />
                    </div>
                ))}
                <button type="button" onClick={() => appendAward({ award : "" })}>
                    Añadir premio
                </button>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    );
}

export default ProjectForm;
