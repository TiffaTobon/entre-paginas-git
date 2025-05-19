import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/SearchBar.css"; // Asegúrate de importar el CSS

function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", search);
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Buscar libros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="searchbar-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
