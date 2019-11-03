import React from 'react';
import TextbookListing from '../TextbookListing/TextbookListing';
import './TextbookList.css';

function TextbookList({textbooks, updatePosts, user}) {
    let isAdmin;
    if (user) {
        isAdmin = user.isAdmin
    } else {
        isAdmin = false
    }
    return(
        <div className="bookList">
            {
            	/* gets textbooks from server, requires server call */
                textbooks.map(textbook => (
                    <TextbookListing key={textbook.id} textbook={textbook} updatePosts={updatePosts} isAdmin={isAdmin}/>
                ))
            }
        </div>
    )
}

export default TextbookList;