// HomePage.js
import React, { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useAreas } from "../context/AreasContext";
import SearchForms from "../components/homeComponents/SearchForms";
import SearchResults from "../components/homeComponents/SearchResults";

function HomePage() {
	const { projects, getProjectsHome } = useProjects();
	const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();
	const [loading, setLoading] = useState(true);
	const [degreeFilter, setDegreeFilter] = useState("All");
	const [subjectFilter, setSubjectFilter] = useState("All");
	const [courseFilter, setCourseFilter] = useState("All");
	const [awardFilter, setAwardFilter] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		Promise.all([getProjectsHome(), getDegrees(), getAwards(), getSubjects()]).then(() => setLoading(false));
	}, []);

	if (projects.length === 0) {
		return <p>No hay proyectos para mostrar</p>;
	}

	const filteredProjects = projects.filter((project) => {
		const degreeMatch = degreeFilter === "All" || project.degreeId === degreeFilter;
		const subjectMatch = subjectFilter === "All" || project.subjectId === subjectFilter;
		const courseMatch = courseFilter === "All" || project.course === courseFilter;
		const awardMatch = awardFilter === "All" || project.awardsId === awardFilter;
		const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());

		return degreeMatch && subjectMatch && courseMatch && awardMatch && searchMatch;
	});

	const degreeOptions = degrees
		? [
				{ label: "Todos los Grados", value: "All" },
				...degrees.map((degree) => ({
					label: degree.name,
					value: degree.id,
				})),
		  ]
		: [];

	const subjectOptions = subjects
		? [
				{ label: "Todas las Asignaturas", value: "All" },
				...subjects.map((subject) => ({
					label: subject.name,
					value: subject.id,
				})),
		  ]
		: [];

	const courseOptions = [
		{ label: "Todos los Cursos", value: "All" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
	];

	const awardOptions = awards
		? [
				{ label: "Todos los Premios", value: "All" },
				...awards.map((award) => ({
					label: award.name,
					value: award.id,
				})),
		  ]
		: [];

	return (
		<>
			<SearchForms
				degreeOptions={degreeOptions}
				subjectOptions={subjectOptions}
				courseOptions={courseOptions}
				awardOptions={awardOptions}
				degreeFilter={degreeFilter}
				subjectFilter={subjectFilter}
				courseFilter={courseFilter}
				awardFilter={awardFilter}
				setDegreeFilter={setDegreeFilter}
				setSubjectFilter={setSubjectFilter}
				setCourseFilter={setCourseFilter}
				setAwardFilter={setAwardFilter}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			{loading ? <p>Cargando proyectos...</p> : <SearchResults filteredProjects={filteredProjects} />}
		</>
	);
}

export default HomePage;
