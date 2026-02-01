import React, { useState } from 'react';

const SearchList = () => {
  const names = ["Vasundhara", "React Developer", "Javascript", "Html", "Tailwind", "NodeJS", "Google Gemini", "Web Intern", "Coding", "Software Engineer"];
  const [query, setQuery] = useState("");

  const filteredNames = names.filter(name => 
    name.toLowerCase().includes(query.toLowerCase())
  );

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? 
          <b key={i} className="text-blue-600 bg-yellow-200">{part}</b> : part
        )}
      </span>
    );
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-2xl rounded-xl">
      <h2 className="text-center font-bold text-xl mb-4 text-purple-700">Task 5: Live Search</h2>
      
      <input 
        type="text" 
        placeholder="Search names..." 
        className="w-full p-2 border-2 rounded mb-4 outline-none focus:border-purple-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p className="mb-2 font-semibold">Found {filteredNames.length} results</p>
      
      <ul className="border rounded divide-y overflow-hidden">
        {filteredNames.length > 0 ? (
          filteredNames.map((name, index) => (
            <li key={index} className="p-2 hover:bg-gray-50 uppercase text-sm tracking-wider">
              {highlightText(name, query)}
            </li>
          ))
        ) : (
          <li className="p-2 text-red-500 text-center">No matches found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchList;