import React from "react";

function Search({ setSearch, search }) {
  return (
    <div className="flex justify-center w-full items-center ">
      <input
        className="w-full py-1 px-4 text-lg rounded-3xl mt-3 mb-3 border-2 border-slate-700"
        type="text"
        value={search}
        placeholder="Search Notes"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
