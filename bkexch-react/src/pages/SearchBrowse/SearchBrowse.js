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

    render() {
        return(
            <div className='page'>
                <SearchBar/>
                <TextbookList textbooks={this.state.textbooks}/>
            </div>
        )
    }
}

export default SearchBrowse;