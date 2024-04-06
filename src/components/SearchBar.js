import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="my-4">
            <input
                type="text"
                placeholder="Search notes..."
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
        </div>
    );
};

export default SearchBar;
