import React from 'react';
import {useHistory} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {deleteTextbook} from '../../actions/textbook';
import './TextbookListing.css';

function TextbookListing({ textbook, isAdmin, updatePosts }) {
    const { _id, title, author, seller, price} = textbook;
    let history = useHistory();

    return (
            <Card className='listing' onClick={() => history.push(`/viewtextbook/${_id}`)}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                </Card.Body>
                <Card.Footer className="text-muted footer">
                    <small>${price} - {seller}</small>
                    {isAdmin ? <Button variant="danger" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        deleteTextbook(_id);
                        updatePosts()
                        }}>Delete</Button> : null}
                </Card.Footer>
            </Card>
    )
}

export default TextbookListing;
