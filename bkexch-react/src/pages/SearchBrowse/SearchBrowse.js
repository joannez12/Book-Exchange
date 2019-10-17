import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import TextbookList from '../../components/TextbookList/TextbookList';

//Textbooks will be received from a server but is harded coded for part 1
import textbooks from '../../textbooks';

class SearchBrowse extends React.Component {
    state = {
        textbooks: textbooks,
        searchfield: ''
    }

    handleSearch = (e) => {
        this.setState({searchfield: e.target.value})
    }

    render() {
        const {textbooks, searchfield} = this.state;
        const filteredTextbooks = textbooks.filter(textbook => {
            return textbook.title.toLowerCase().includes(searchfield.toLowerCase())
        })
        return(
            <div className='page'>
                <SearchBar handleSearch={this.handleSearch} placeholder='Search textbook titles'/>
                <TextbookList textbooks={filteredTextbooks}/>
            </div>
        )
    }
}

export default SearchBrowse;