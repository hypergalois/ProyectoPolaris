// SearchForms.js
import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import Select from "react-select";

import { selectStyles } from "../../config/util";

function SearchForms(props) {
	const { degreeOptions, subjectOptions, courseOptions, awardOptions, degreeFilter, subjectFilter, courseFilter, awardFilter, setDegreeFilter, setSubjectFilter, setCourseFilter, setAwardFilter, searchQuery, setSearchQuery } = props;

	return (
		<div className="filter-container flex space-x-4 mx-20 m-8 text-blue-500">
			<Select
				className="w-3/5 placeholder-blue-500 border-blue-500"
				options={degreeOptions}
				value={degreeFilter}
				onChange={setDegreeFilter}
				placeholder="Titulación"
				menuPortalTarget={document.body}
				styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
			/>
			<Select
				className="w-3/5 placeholder-blue-500 border-blue-500"
				options={subjectOptions}
				value={subjectFilter}
				onChange={setSubjectFilter}
				placeholder="Asignatura"
				menuPortalTarget={document.body}
				styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
			/>
			<Select
				className="w-1/5 placeholder-blue-500 border-blue-500"
				options={courseOptions}
				value={courseFilter}
				onChange={setCourseFilter}
				placeholder="Curso"
				menuPortalTarget={document.body}
				styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
			/>
			<Select
				className="w-2/5 placeholder-blue-500 border-blue-500"
				options={awardOptions}
				value={awardFilter}
				onChange={setAwardFilter}
				placeholder="Premio"
				menuPortalTarget={document.body}
				styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
			/>
			<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar" className="rounded w-4/5 placeholder-blue-500 border-blue-500 " />
		</div>
	);
}

export default SearchForms;
