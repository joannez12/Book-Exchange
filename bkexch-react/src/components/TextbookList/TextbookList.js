import React from 'react';
import TextbookListing from '../TextbookListing/TextbookListing';

function TextbookList({textbooks}) {
    return(
        <div>
            {
                textbooks.map(textbook => (
                    <TextbookListing textbook={textbook}/>
                ))
            }
        </div>
    )
}

export default TextbookList;