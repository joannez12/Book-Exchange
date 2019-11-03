import React from 'react';
import {useParams} from 'react-router-dom';
import textbooks from '../../textbooks';
import './ViewTextbook.css';
import {Button} from "react-bootstrap";

function ViewTextbook(props) {
    let { id } = useParams();
    //Get textbook from server
    const textbook = textbooks.filter((book) => {return parseInt(book.id) === parseInt(id)})
    if ((typeof textbook[0]) !== 'undefined') {
        const imageUrl = textbook[0].imgUrl ? textbook[0].imgUrl : "https://media.istockphoto.com/photos/question-mark-from-books-searching-information-or-faq-edication-picture-id508545844?k=6&m=508545844&s=612x612&w=0&h=vfR4s5xYZvUhxQQ8ltQo2afviE0dvMqmeQoFoKFNBuk="
        return(
            <div className="page">
                <h1>{textbook[0].title}</h1>
                <h3>{textbook[0].author}</h3>
                <div className="bookdisplay">
                    <div className="imgcontainer">
                        <img className="textbookimage" src={imageUrl} alt="Book"/>
                    </div>
                    <div className="infocontainer">
                        <h5>Price: <span className="red">${textbook[0].price}</span></h5>
                        <h5>Seller: <em>{textbook[0].seller}</em></h5>
                        <div className="description">{textbook[0].description}</div>
                    </div>
                </div>
                <Button onClick={()=>{props.handleSendMessage(textbook[0], props.user)}}>Contact</Button>
            </div>
        )
    } else {
        return(
            <div className="page">
                <h1 style={{marginTop: "20vh"}}>Sorry</h1>
                <h2>The listing you are looking for doesn't exist.</h2>
            </div>
        )
    }

}

export default ViewTextbook;
