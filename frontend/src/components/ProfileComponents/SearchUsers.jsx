// SearchUsers.js
import React from "react";
import Select from "react-select";

function SearchUsers(props) {
    const {
        searchQuery,
        setSearchQuery
    } = props;

    return (
        <div className="filter-container flex space-x-4 mx-12 m-8 text-blue-500">
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

export default SearchUsers;