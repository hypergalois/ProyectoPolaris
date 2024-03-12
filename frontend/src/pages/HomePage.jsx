import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useAreas } from "../context/AreasContext";
import ProjectCardHome from "../components/projectCardHome";
import Select from "react-select";
import ProjectForm from "../components/ProjectForm";
import Popup from "../components/Popup";

function HomePage() {
	const { projects, getProjectsHome } = useProjects();
	const { areas, getAreas, degrees, getDegrees, degreesByArea, getDegreesByArea, awards, getAwards, errors } = useAreas();
	const [loading, setLoading] = useState(true);
	const [degreeFilter, setDegreeFilter] = useState("All");
	//const [subjetcFilter, setSubjetcFilter] = useState("All");
	const [courseFilter, setCourseFilter] = useState("All");
	const [awardFilter, setAwardFilter] = useState("All");

	// useEffect(() => {
	// 	Promise.all([getProjectsHome(), getDegrees(), getAwards()]).then(() => setLoading(false));
	// }, [getProjectsHome, getDegrees, getAwards]);

	// if (projects.length === 0) {
	// 	return <p>No hay proyectos para mostrar</p>;
	// }

	// const filteredProjects = projects.filter((project) => {
	// 	const degreeMatch = degreeFilter.value === "All" || project.degreeId === degreeFilter.value;
	// 	//const subjetcMatch = subjetcFilter.value === "All" || project.subjetc === subjetcFilter.value;
	// 	const courseMatch = courseFilter.value === "All" || project.course === courseFilter.value;
	// 	const awardMatch = awardFilter.value === "All" || project.awardsId === awardFilter.value;

	// 	return degreeMatch /* && subjetcMatch */ && courseMatch && awardMatch;
	// });

	// const degreeOptions = [
	// 	{ label: "Todos", value: "All" },
	// 	...degrees.map((degree) => ({
	// 		label: degree.name,
	// 		value: degree.id,
	// 	})),
	// ];

	/*
	const subjetcOptions = subjects.map((subject) => ({
		label: subject,
		value: subject,
	}));
    */

	// const courseOptions = [
	// 	{ label: "Todos", value: "All" },
	// 	{ label: "1", value: "1" },
	// 	{ label: "2", value: "2" },
	// 	{ label: "3", value: "3" },
	// 	{ label: "4", value: "4" },
	// 	{ label: "5", value: "5" },
	// ];

	// const awardOptions = [
	// 	{ label: "Todos", value: "All" },
	// 	...awards.map((award) => ({
	// 		label: award.name,
	// 		value: award.id,
	// 	})),
	// ];

	// <Select options={subjetcOptions} value={subjetcFilter} onChange={setSubjetcFilter} />

	const [openPopup, setOpenPopup] = useState(false);

	const handleOpenPopup = () => {
		setOpenPopup(true);
	};

	const handleClosePopup = () => {
		setOpenPopup(false);
	};

	return (
		<>
			Homepage
			{/* <div className="filter-container">
				<Select options={degreeOptions} value={degreeFilter} onChange={setDegreeFilter} />

				<Select options={courseOptions} value={courseFilter} onChange={setCourseFilter} />
				<Select options={awardOptions} value={awardFilter} onChange={setAwardFilter} />
			</div>
			{loading ? (
				<p>Cargando proyectos...</p>
			) : (
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{filteredProjects.map((project) => (
							<ProjectCardHome key={project.id} project={project} />
						))}
					</div>
				</div>
			)} */}
			{/* HACK TEMPORAL, ESTE POPUP LO ABRIRA EL BOTON DE LA NAVBAR */}
			<button type="button" onClick={handleOpenPopup} className="rounded-md bg-black/20 px-4 py-24 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
				Open dialog
			</button>
			<Popup title="SUBE EL PROYECTO" openPopup={openPopup} closePopup={handleClosePopup}>
				<ProjectForm closePopup={handleClosePopup} />
			</Popup>
		</>
	);
}

export default HomePage;
