import React, {useState} from 'react';
import TextbookListing from '../TextbookListing/TextbookListing';
import './TextbookList.css';

import {currentUser} from '../../actions/user';

function TextbookList({textbooks, updatePosts}) {
    const [isAdmin, setisAdmin] = useState(false)

    currentUser().then(response => {
        setisAdmin(response.data.isAdmin)
    }).catch(() => setisAdmin(false))

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