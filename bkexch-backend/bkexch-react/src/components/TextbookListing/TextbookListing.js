import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {deletePost} from '../../helper';
import {useHistory} from 'react-router-dom';
import './TextbookListing.css';

function TextbookListing({ textbook, isAdmin }) {
    const { _id, title, author, seller, price} = textbook;
    let history = useHistory();

    return (
            <Card className='listing' onClick={() => history.push(`/textbooks/${_id}`)}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                </Card.Body>
                <Card.Footer className="text-muted footer">
                    <small>${price} - {seller}</small>
                    {isAdmin ? <Button variant="danger" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        deletePost(_id);
                        window.location.reload()
                        }}>Delete</Button> : null}
                </Card.Footer>
            </Card>
    )
}

export default TextbookListing;
