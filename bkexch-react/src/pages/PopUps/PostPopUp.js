import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './PostPopUp.css';
import textbooks from '../../textbooks';

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
        priceMsg: ""
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({[name]: value})
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
        

        if (this.state.title !== "" && this.state.author !== "" && this.state.price !== "" && (this.state.price === parseInt(this.state.price).toString() || this.state.price === parseFloat(this.state.price).toString())) {
            textbooks.push({id: textbooks[this.state.textbooks.length - 1].id + 1, title: this.state.title, author: this.state.author, seller: this.props.user.name, price: this.state.price, description: this.state.description, imgUrl: this.state.imgUrl})
            console.log(textbooks)

            this.setState({
            	textbooks: textbooks,
                title: "",
                author: "",
                price: "",
                imgUrl: "",
                description: "",
                titleMsg: "",
                authorMsg: "",
                priceMsg: ""
            })
            this.props.onHide();
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

                    <label>Description:</label>
                    <input className="input" type="text"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        name="description"
                        placeholder = "" />
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
