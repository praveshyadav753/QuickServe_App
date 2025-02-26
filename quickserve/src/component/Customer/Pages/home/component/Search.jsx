import React, { useState } from "react";
import { Search } from "lucide-react"; // Lucide icon for search

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="flex items-center w-full max-w-md mx-auto border border-gray-300 rounded-full overflow-hidden shadow-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you need help with?"
        className="w-full px-4 py-2 text-gray-700 outline-none"
      />
      <button 
        onClick={handleSearch}
        className="bg-green-700 text-white p-3 rounded-r-full hover:bg-green-800 transition"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
