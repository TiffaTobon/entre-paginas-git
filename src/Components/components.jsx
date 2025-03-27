import React, { useState } from "react";
// Ejemplo usando el ícono FaSearch
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // Lógica para buscar lo que necesites.
    console.log("Buscando:", search);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
