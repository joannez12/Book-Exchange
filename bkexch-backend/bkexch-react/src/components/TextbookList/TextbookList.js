import React from 'react';
import TextbookListing from '../TextbookListing/TextbookListing';
import './TextbookList.css';


function TextbookList({textbooks, updatePosts, user}) {
    let isAdmin = false
    if (user !== null) {
        isAdmin = user.isAdmin
    }

    return(
        <div className="bookList">
            {
                textbooks.map(textbook => (
                    <TextbookListing key={textbook._id} textbook={textbook} isAdmin={isAdmin} updatePosts={updatePosts}/>
                ))
            }
        </div>
    )
}

export default TextbookList;