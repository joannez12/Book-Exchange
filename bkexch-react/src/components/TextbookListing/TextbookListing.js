import React from 'react';
import Card from 'react-bootstrap/Card';
import { useHistory} from 'react-router-dom';
import './TextbookListing.css';
import {Col, Row} from "react-bootstrap";

function TextbookListing({ textbook }) {
    const { id, title, author, seller, price} = textbook;
    let history = useHistory();
    return (
            <Card className='listing' onClick={() => history.push(`/textbooks/${id}`)}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row>
                        <Col xs={8}><small>${price} - {seller}</small></Col>
                        <Col><Card.Link href="#">Contact</Card.Link></Col>
                    </Row>
                </Card.Footer>
            </Card>
    )
}

export default TextbookListing;
