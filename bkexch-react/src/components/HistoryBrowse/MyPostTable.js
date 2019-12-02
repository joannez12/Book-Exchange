import React from 'react';
import '../../pages/HistoryBrowse/HistoryBrowse.css';
import {Table, ButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";
import exchanges from "../../pages/HistoryBrowse/exchange";
import {updateTextbook, deleteTextbook} from "../../actions/textbook"
import {postExchange} from "../../actions/exchange";
import textbooks from '../../textbooks';

function MyPostTableHepler(post,deletePost, onEditButtonPress, onSoldButtonPress){
    return(
        <tr key={post._id} >
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.price}</td>
            <td>{post.description}</td>
            <td>
                <DropdownButton as={ButtonGroup} title="Actions" id="bg-vertical-dropdown-1">
                    <Dropdown.Item eventKey="1" onClick={() => {deletePost(post)}}>Delete</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => onEditButtonPress(post)}>Edit</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => onSoldButtonPress(post)}>Sold</Dropdown.Item>
                </DropdownButton>

            </td>
        </tr>
    )
}

class EditingPost extends React.Component{

    state = {
        post: this.props.post,
        title: this.props.post.title,
        author: this.props.post.author,
        price: this.props.post.price,
        description: this.props.post.description,

    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({[name]: value})
    }

    submitEditedPost = () => {
        const newPost = this.state.post;
        newPost.title = this.state.title;
        newPost.author = this.state.author;
        newPost.price = this.state.price;
        newPost.description = this.state.description;

        this.props.onSubmitButtonPress(newPost);
    }


    render(){
        const {post, onEditCancelButtonPress} = this.props;
        return(
            <tr key={post.id} >
                <td><input
                    className="input"
                    type="text"
                    placeholder={post.title}
                    value={this.state.title}
                    name="title"
                    onChange={this.handleInputChange}

                /></td>
                <td><input
                    className="input"
                    type="text"
                    placeholder={post.author}
                    value={this.state.author}
                    name="author"
                    onChange={this.handleInputChange}

                /></td>
                <td><input
                    className="input"
                    type="text"
                    placeholder={post.price}
                    value={this.state.price}
                    name="price"
                    onChange={this.handleInputChange}

                /></td>
                <td><input
                    className="input"
                    type="text"
                    placeholder={post.description}
                    value={this.state.description}
                    name="description"
                    onChange={this.handleInputChange}
                /></td>

                <td>
                    <DropdownButton as={ButtonGroup} title="Actions" id="bg-vertical-dropdown-1">
                        <Dropdown.Item eventKey="1" onClick={() => {this.submitEditedPost()}}>Submit</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => {onEditCancelButtonPress()}}>Cancel</Dropdown.Item>
                    </DropdownButton>

                </td>
            </tr>
        )
    }
}

class MyPostTable extends React.Component {
    state = {
        posts: this.props.posts,
        editingPost: null,
    };

    onEditButtonPress = (post) => {
        this.setState({editingPost: post});
    };

    onSubmitButtonPress = (newPost) => {
        updateTextbook(newPost).then(res=>{
            if(res.status === 200){
                console.log("updating textbook done")
                this.setState({editingPost: null});
            }else{
                console.log("fail to update textbook")
            }
        })
        // this.setState({editingPost: null});
    };

    onEditCancelButtonPress = () => {
        this.setState({editingPost: null});
    };

    onSoldButtonPress = (textbook) => {
        const d = new Date();
        this.props.deletePost(textbook);
        // const newExchange = {
        //     // id: d.getTime(),
        //     title: textbook.title,
        //     author: textbook.author,
        //     seller: this.props.user.name,
        //     date: d.toLocaleTimeString(),
        //     price: textbook.price,
        // };
        const newExchange = {
            from: textbook.seller,
            to: "unknown",
            textbookID: textbook._id,
        }
        postExchange(newExchange).then(res=>{
            if(res.status === 200){
                console.log("posting exchange done")
            }else{
                console.log("fail to post exchange")
            }
        })
        // exchanges.push(newExchange);
    };

    handlePost = (post, editingPost, deletePost, onEditButtonPress, onSubmitButtonPress, onEditCancelButtonPress, onSoldButtonPress) => {
        if(editingPost && post === editingPost){
            return <EditingPost key={post._id} post={post} onSubmitButtonPress={onSubmitButtonPress} onEditCancelButtonPress={onEditCancelButtonPress} />;
        }else{
            return MyPostTableHepler(post, deletePost, onEditButtonPress, onSoldButtonPress);
        }
    };

    render(){
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr key={0}>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Option</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.posts.map( post =>
                                this.handlePost(post,
                                    this.state.editingPost,
                                    this.props.deletePost,
                                    this.onEditButtonPress.bind(this),
                                    this.onSubmitButtonPress.bind(this),
                                    this.onEditCancelButtonPress.bind(this),
                                    this.onSoldButtonPress.bind(this)
                                )
                            )
                        }

                    </tbody>


                </Table>
            </div>
        )
    }
}

export default MyPostTable;
