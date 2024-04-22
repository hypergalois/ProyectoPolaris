// SearchForms.js
import React from "react";
import Select from "react-select";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// import { selectStyles } from "../../config/util";
import { selectStylesCustom } from "../../config/util.js";

function SearchForms({ degreeOptions, subjectOptions, courseOptions, awardOptions, degreeFilter, subjectFilter, courseFilter, awardFilter, setDegreeFilter, setSubjectFilter, setCourseFilter, setAwardFilter, searchQuery, setSearchQuery }) {
	const resetFilters = () => {
		setDegreeFilter({ label: "Todos los Grados", value: "All" });
		setSubjectFilter({ label: "Todas las Asignaturas", value: "All" });
		setCourseFilter({ label: "Cursos (Todos)", value: "All" });
		setAwardFilter({ label: "Todos los Premios", value: "All" });
		setSearchQuery("");
	};

	return (
		<div className="filter-container flex space-x-4 mx-20 m-8 text-blue-500">
			<Select className="w-3/5" options={degreeOptions} value={degreeFilter} onChange={setDegreeFilter} placeholder="Titulación" menuPortalTarget={document.body} styles={selectStylesCustom} />
			<Select className="w-3/5 placeholder-blue-500 border-blue-500" options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} placeholder="Asignatura" menuPortalTarget={document.body} styles={selectStylesCustom} />
			<Select className="w-1/5 placeholder-blue-500 border-blue-500" options={courseOptions} value={courseFilter} onChange={setCourseFilter} placeholder="Curso" menuPortalTarget={document.body} styles={selectStylesCustom} />
			<Select className="w-2/5 placeholder-blue-500 border-blue-500" options={awardOptions} value={awardFilter} onChange={setAwardFilter} placeholder="Premio" menuPortalTarget={document.body} styles={selectStylesCustom} />

			<div className="relative w-4/5">
				<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar" className="rounded border-2 border-blue-500 placeholder-blue-500 pr-10 pl-3 py-1.5 w-full font-semibold" />
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<svg className="w-5 h-5 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
			</div>

			<button onClick={resetFilters} className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md">
				<ArrowPathIcon className="block h-6 w-6 text-white" />
			</button>
		</div>
	);
}

export default SearchForms;
