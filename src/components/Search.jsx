import React from "react";
import { IoSearch } from "react-icons/io5";

const Search = ({onSearch}) => {
  return (
    <div className="relative">
      <label
        htmlFor="search"
        className="absolute top-1/2 -translate-y-1/2 left-4"
      >
        <IoSearch className="text-xl" />
      </label>
      <input
      onChange={(e)=> onSearch(e.target.value)}
        id="search"
        placeholder="Search"
        className="w-full p-2 pl-14 border-2 rounded-xl"
      />
    </div>
  );
};

export default Search;
