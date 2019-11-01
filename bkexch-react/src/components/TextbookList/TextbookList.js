import React from 'react';
import TextbookListing from '../TextbookListing/TextbookListing';
import './TextbookList.css';

function TextbookList({textbooks}) {
    return(
        <div className="bookList">
            {
                textbooks.map(textbook => (
                    <TextbookListing key={textbook.id} textbook={textbook}/>
                ))
            }
        </div>
    )
}

export default TextbookList;