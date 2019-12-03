import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './SearchBar.css';

function SearchBar({handleSearch, placeholder}) {
    const [searchfield, setsearchfield] = useState('')
    return(
        <div className='search'>
                <input className='searchbar' onChange={(e) => setsearchfield(e.target.value)} placeholder={placeholder}/>
                <Button className='searchButton' variant="info" onClick={() => handleSearch(searchfield)}>Search</Button>
                <Button className='searchButton' variant="outline-secondary" onClick={() => handleSearch('')}>View All</Button>
        </div>
    )
}

export default SearchBar;