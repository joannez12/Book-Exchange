import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import TextbookList from '../../components/TextbookList/TextbookList';
import './SearchBrowse.css';

//Textbooks will be received from a server but is harded coded for part 1
import textbooks from '../../textbooks';

class SearchBrowse extends React.Component {
    state = {
        textbooks: textbooks,
        searchfield: ''
    }

    handleSearch = (searchfield) => {
        this.setState({searchfield: searchfield})
    }

    render() {
        const {textbooks, searchfield} = this.state;
        const filteredTextbooks = textbooks.filter(textbook => {
            return textbook.title.toLowerCase().includes(searchfield.toLowerCase())
        })
        return(
            <div className='page'>
                <h1 className="title"> - Textbooks For Sale - </h1>
                <SearchBar handleSearch={this.handleSearch} placeholder='Search textbook titles'/>
                {filteredTextbooks.length !== 0 ? <TextbookList textbooks={filteredTextbooks}/> : <h3>No textbooks found.</h3> }
            </div>
        )
    }
}

export default SearchBrowse;