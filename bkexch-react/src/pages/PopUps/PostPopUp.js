import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './PostPopUp.css';
import textbooks from '../../textbooks';

import {postTextbook} from '../../actions/textbook'

class PostPopUp extends React.Component {
    state = {
    	textbooks: textbooks,
        title: "",
        author: "",
        price: "",
        description: "",
        imgUrl: "",
        titleMsg: "",
        authorMsg: "",
        priceMsg: "",
        descriptionMsg: "",
        imgUrlMsg: ""
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({[name]: value})
        this.setState({[name.concat("Msg")]: ""})
    }


    submitChange = (event) => {
        if (this.state.title === "") {
            this.setState({ titleMsg: "title required" })
        }
        if (this.state.author === "") {
            this.setState({ authorMsg: "author required" })
        }
        if (this.state.price === "") {
            this.setState({ priceMsg: "price required" })
        } else if (this.state.price !== parseInt(this.state.price).toString() || this.state.price !== parseFloat(this.state.price).toString()) {
        	this.setState({ priceMsg: "invalid price"})
        }
        if (this.state.description === "") {
            this.setState({ descriptionMsg: "description required" })
        }
        if (this.state.imgUrl === "") {
            this.setState({ imgUrlMsg: "image url required" })
        }
        
        if (this.state.title !== "" && this.state.author !== "" && this.state.price !== "" && (this.state.price === parseInt(this.state.price).toString() || this.state.price === parseFloat(this.state.price).toString()) 
            && this.state.description !== "" && this.state.imgUrl) {
            const textbook = {title: this.state.title, author: this.state.author, seller: this.props.user.username, description: this.state.description, imgUrl: this.state.imgUrl, price: this.state.price }
            postTextbook(textbook, this)
        }

    }

    render() {
        const { addPost, ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        New Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title:</label>
                    <input className="input" type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder = "Enter Title" />
                    <p id="titleMsg">{this.state.titleMsg}</p>

                    <label>Author:</label>
                    <input className="input" type="text"
                        value={this.state.author}
                        onChange={this.handleInputChange}
                        name="author"
                        placeholder = "Enter Author" />
                    <p id="authorMsg">{this.state.authorMsg}</p>

                    <label>Price:</label>
                    <input className="input" type="text"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                        name="price"
                        placeholder = "Enter Price" />
                    <p id="priceMsg">{this.state.priceMsg}</p>

                    <label>Picture url:</label>
                    <input className="input" type="text"
                        value={this.state.imgUrl}
                        onChange={this.handleInputChange}
                        name="imgUrl"
                        placeholder = "" />
                    <p id="imgUrlMsg">{this.state.imgUrlMsg}</p>

                    <label>Description:</label>
                    <input className="input" type="text"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        name="description"
                        placeholder = "" />
                    <p id="descriptionMsg">{this.state.descriptionMsg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button variant="primary" onClick={this.submitChange}>Post</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PostPopUp;
