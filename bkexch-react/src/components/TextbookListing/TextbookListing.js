import React from 'react';
import Card from 'react-bootstrap/Card';
import './TextbookListing.css';

function TextbookListing({textbook}) {
    const {title, author, seller, price} = textbook;
    return(
        <Card className='listing'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
            </Card.Body>
            <Card.Footer className="text-muted">${price} - {seller}</Card.Footer>
        </Card> 
    )
}

export default TextbookListing;