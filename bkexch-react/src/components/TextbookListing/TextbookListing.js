import React from 'react';
import './TextbookListing.css';

function TextbookListing({textbook}) {
    const {title, author, seller, price} = textbook;
    return(
        <div className='listing'>
            <p>Title: {title}</p>
            <p>Author: {author}</p>
            <p>Seller: {seller}</p>
            <p>Price: ${price}</p>
        </div>
    )
}

export default TextbookListing;