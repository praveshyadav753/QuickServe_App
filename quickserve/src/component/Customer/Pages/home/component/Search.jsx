import React, { useState } from "react";
import { Search } from "lucide-react"; // Lucide icon for search

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="sm:mt-9 h-15 flex items-center w-full max-w-xl mx-auto border border-gray-300 sm:rounded-full round-xl overflow-hidden shadow-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you need help with?"
        className="w-full  px-4 py-2 text-gray-700 outline-none"
      />
      <button 
        onClick={handleSearch}
        className="bg-green-700 h-full md:w-30 m-auto flex justify-center items-center  text-white p-3 sm:rounded-r-full rounded-r-xl hover:bg-green-800 transition"
      >
        <Search size={25} />
      </button>
    </div>
  );
};

export default SearchBar;
