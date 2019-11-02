import React from 'react';
import {useParams} from 'react-router-dom';
import textbooks from '../../textbooks';
import './ViewTextbook.css';

function ViewTextbook(props) {
    let { id } = useParams();
    //Get textbook from server
    const textbook = textbooks.filter((textbook) => {return parseInt(textbook.id) === parseInt(id)})
    return(
        <div className="page">
            <h1>{textbook[0].title}</h1>
            <h3>{textbook[0].author}</h3>
            <div className="bookdisplay">
                <div className="imgcontainer">
                    <img src={textbook[0].imgUrl}/>
                </div>
                <div className="infocontainer">
                    <h5>Price: <span className="red">${textbook[0].price}</span></h5>
                    <h5>Seller: <em>{textbook[0].seller}</em></h5>
                    <div className="description">{textbook[0].description}</div>
                </div>

            </div>
        </div>
    )
}

export default ViewTextbook;