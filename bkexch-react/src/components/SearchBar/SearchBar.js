import React from 'react';
import './SearchBar.css';

function SearchBar({handleSearch, placeholder}) {
    return(
        <div>
            <input className='searchbar' type='search' placeholder={placeholder} onChange={handleSearch}/>
        </div>
    )
}

export default SearchBar;