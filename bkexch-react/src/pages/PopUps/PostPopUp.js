import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './PostPopUp.css';
import textbooks from '../../textbooks';
import posts from "../../post";

class PostPopUp extends React.Component {
    state = {
    	textbooks: textbooks,
    	posts: posts,
        title: "",
        author: "",
        price: "",
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
            textbooks.push({id: textbooks[this.state.textbooks.length - 1].id + 1, title: this.state.title, author: this.state.author, seller: this.props.user.name, price: this.state.price})
            console.log(textbooks)
            posts.push({id: posts[this.state.posts.length - 1].id + 1, title: this.state.title, author: this.state.author, seller: this.props.user.name, price: this.state.price})

            this.setState({
            	textbooks: textbooks,
            	posts: posts,
                title: "",
                author: "",
                price: "",
                titleMsg: "",
                authorMsg: "",
                priceMsg: ""
            })

            this.props.addPost();
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