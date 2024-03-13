// SearchForms.js
import React from "react";
import Select from "react-select";

function SearchForms(props) {
    const {
        degreeOptions,
        subjectOptions,
        courseOptions,
        awardOptions,
        degreeFilter,
        subjectFilter,
        courseFilter,
        awardFilter,
        setDegreeFilter,
        setSubjectFilter,
        setCourseFilter,
        setAwardFilter,
        searchQuery,
        setSearchQuery
    } = props;

    return (
        <div className="filter-container flex space-x-4 mx-12 m-8 text-blue-500">
            <Select className="w-3/5 placeholder-blue-500 border-blue-500" options={degreeOptions} value={degreeFilter} onChange={setDegreeFilter} placeholder="Titulación"/>
            <Select className="w-3/5 placeholder-blue-500 border-blue-500" options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} placeholder="Asignatura" />
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
    );
}

export default SearchForms;