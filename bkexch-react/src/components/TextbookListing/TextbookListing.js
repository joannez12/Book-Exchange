import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {deletePost} from '../../helper';
import {useHistory} from 'react-router-dom';
import './TextbookListing.css';

function TextbookListing({ textbook, updatePosts, isAdmin }) {
    // const { id, title, author, seller, price} = textbook;
    const { _id, title, author, seller, price} = textbook;
    const id = _id;
    let history = useHistory();
    return (
            <Card className='listing' onClick={() => history.push(`/textbooks/${id}`)}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                </Card.Body>
                <Card.Footer className="text-muted footer">
                    <small>${price} - {seller}</small>
                    {isAdmin ? <Button variant="danger" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        deletePost(id);
                        updatePosts();
                        }}>Delete</Button> : null}
                </Card.Footer>
            </Card>
    )
}

export default TextbookListing;
