import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useAreas } from "../context/AreasContext";
import Select from "react-select";
import ProjectForm from "../components/ProjectForm";
import Popup from "../components/Popup";
import ProjectCard from "../components/ProjectCardTest";

function HomePage() {
	const { projects, getProjectsHome } = useProjects();
	const { areas, getAreas,
            degrees, getDegrees,
            degreesByArea, getDegreesByArea,
            awards, getAwards,
            subjects, getSubjects,
            subjectsByDegree, getSubjectsByDegree,
            errors } = useAreas();
	const [loading, setLoading] = useState(true);
	const [degreeFilter, setDegreeFilter] = useState("All");
	const [subjectFilter, setsubjectFilter] = useState("All");
	const [courseFilter, setCourseFilter] = useState("All");
	const [awardFilter, setAwardFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        Promise.all([getProjectsHome(), getDegrees(), getAwards(), getSubjects()])
        .then(() => setLoading(false));
    }, []); // Empty dependency array ensures this effect runs only once on component mount    

    console.log(projects);
    console.log(degrees);
    console.log(awards);
    console.log(subjects);

	if (projects.length === 0) {
		return <p>No hay proyectos para mostrar</p>;
	}

	const filteredProjects = projects.filter((project) => {
		const degreeMatch = degreeFilter.value === "All" || project.degreeId === degreeFilter.value;
		const subjetcMatch = subjectFilter.value === "All" || project.subjectId === subjectFilter.value;
		const courseMatch = courseFilter.value === "All" || project.course === courseFilter.value;
		const awardMatch = awardFilter.value === "All" || project.awardsId === awardFilter.value;
        const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());

		return degreeMatch && subjetcMatch && courseMatch && awardMatch && searchMatch;
	});

	const degreeOptions = degrees ? [
		{ label: "Todos los Grados", value: "All" },
		...degrees.map((degree) => ({
			label: degree.name,
			value: degree.id,
		})),
	] : [];

	const subjetcOptions = subjects ?  [
        { label: "Todas las Asignaturas", value: "All" },
        ...subjects.map((subject) => ({
            label: subject.name,
            value: subject.id,
        }))
    ] : [];

	const courseOptions = [
		{ label: "Todos los Cursos", value: "All" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
	];

	const awardOptions = awards ? [
		{ label: "Todos los Premios", value: "All" },
		...awards.map((award) => ({
			label: award.name,
			value: award.id,
		})),
	] : [];

	return (
		<>
			<div className="filter-container flex space-x-4 mx-12 m-8 text-blue-500">
				<Select className="w-3/5 placeholder-blue-500 border-blue-500" options={degreeOptions} value={degreeFilter} onChange={setDegreeFilter} placeholder="Titulación"/>
                <Select className="w-3/5 placeholder-blue-500 border-blue-500" options={subjetcOptions} value={subjectFilter} onChange={setsubjectFilter} placeholder="Asignatura" />
				<Select className="w-1/5 placeholder-blue-500 border-blue-500" options={courseOptions} value={courseFilter} onChange={setCourseFilter} placeholder="Curso" />
				<Select className="w-2/5 placeholder-blue-500 border-blue-500" options={awardOptions} value={awardFilter} onChange={setAwardFilter} placeholder="Premio" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar"
                    className="rounded w-4/5 placeholder-blue-500 border-blue-500 "
                />
			</div>
			{loading ? (
				<p>Cargando proyectos...</p>
			) : (
				<div className="container mx-auto mx-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{filteredProjects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default HomePage;