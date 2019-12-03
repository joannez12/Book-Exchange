import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import TextbookList from '../../components/TextbookList/TextbookList';
import './SearchBrowse.css';
import {getTextbooks} from '../../actions/textbook'

class SearchBrowse extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            textbooks: [],
            searchfield: ''
        };
      }

    handleSearch = (searchfield) => {
        this.setState({searchfield: searchfield})
    }

    updatePosts = () => {
        getTextbooks()
        .then(response => {
          if (response.data.length > 0) {
              this.setState({textbooks: response.data})
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    componentDidMount() {
        this.updatePosts()
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
                {filteredTextbooks.length !== 0 ? <TextbookList textbooks={filteredTextbooks} updatePosts={this.updatePosts}/> : <h3>No textbooks found.</h3> }
            </div>
        )
    }
}

export default SearchBrowse;